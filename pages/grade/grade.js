// pages/grade/grade.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CreatorText: "获取验证码",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    form: {
      identity: '',
      code: '',
      phone: '',
      name: ''
    },
    checkCode: '',
    authCode: ""
  },
  //获取验证码
  getCode() {
    let vm = this;
    if (this.data.CreatorText != '获取验证码' && this.data.CreatorText != '重新获取验证码') return;
    let phone = this.data.form.phone;
    if (phone == '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
        duration: 2000
      })
    } else if (!/^1[3456789]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '联系电话格式错误',
        icon: 'none',
        duration: 2000
      })
    } else {
      app.$prot.getAuthCode({
        data: {
          phone
        },
        success(res) {
          wx.showToast({
            title: '发送成功',
          });
          vm.setData({
            CreatorText: '60s后重新获取',
            authCode: res.data
          });
          let i = 59;
          let codeTime = setInterval(_ => {
            if (i == 0) {
              clearInterval(vm.data.codeTime);
              vm.setData({
                CreatorText: '重新获取验证码'
              });
            } else {
              i--;
              vm.setData({
                CreatorText: i + 's后重新获取'
              });
            }
          }, 1000);
          vm.setData({
            codeTime: codeTime
          });
        }
      })
    }

  },
  getUserInfo: function (e) {
    if (!e.detail.userInfo) return;
    var vm = this;
    var userInfo_ = e.detail.userInfo;
    app.loginRequest(userInfo_, function () {
      //登录成功回调
      wx.showToast({
        title: '登录成功！',
        mask: true,
        icon: 'success',
        duration: 1000,
        success: function () {
          vm.setData({
            userInfo: userInfo_,
            hasUserInfo: true
          });
        }
      });
    });
  },
  checkClick() {
    this.createCode(4);
  },
  //生成验证码的方法
  createCode(length) {
    var code = "";
    var codeLength = parseInt(length); //验证码的长度
    ////所有候选组成验证码的字符，当然也可以用中文的
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //循环组成验证码的字符串
    for (var i = 0; i < codeLength; i++) {
      //获取随机验证码下标
      var charNum = Math.floor(Math.random() * 62);
      //组合成指定字符验证码
      code += codeChars[charNum];
    }
    this.setData({
      checkCode: code
    })
  },
  onsubmit() {
    if (this.data.form.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.form.identity == '' && this.data.form.phone == '') {
      wx.showToast({
        title: '请输入手机号或身份证',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.form.identity != '' && !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.data.form.identity) && !/^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(this.data.form.identity) && !/^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/.test(this.data.form.identity)) {
      wx.showToast({
        title: '身份证格式有误',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.form.phone != '' && !/^1[3456789]\d{9}$/.test(this.data.form.phone)) {
      wx.showToast({
        title: '手机号格式有误',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.authCode != this.data.form.code) {
      wx.showToast({
        title: '短信验证码错误',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: `../gradeDetails/gradeDetails?id=${this.data.form.phone || this.data.form.identity}&name=${this.data.form.name}`
      })
    }
  },
  //检查验证码是否正确
  validateCode() {
    //获取显示区生成的验证码
    var checkCode = this.data.checkCode;
    //获取输入的验证码
    var inputCode = this.data.form.code;
    if (inputCode.length <= 0) {
      wx.showToast({
        title: '请输入验证码！',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (inputCode.toUpperCase() != checkCode.toUpperCase()) {
      wx.showToast({
        title: '验证码输入有误！',
        icon: 'none',
        duration: 2000
      })
      this.createCode(4);
      return false;
    } else {
      return true;
    }
  },
  oninput(o) {
    let val = o.detail.value;
    this.setData({
      [o.currentTarget.dataset.id]: val
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createCode(4);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var vm = this;
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      vm.setData({
        hasUserInfo: true
      });
    }
    app.loginSuccess = () => {
      // 获取订单数量  待付款
      app.$prot.getOrdersCount({
        data: {
          status: 0
        },
        success(data) {
          let num = data.data;
          vm.setData({
            nums: num
          })
        }
      })
    }
    setTimeout(() => {
      // 获取订单数量  待付款
      app.$prot.getOrdersCount({
        data: {
          status: 0
        },
        success(data) {
          let num = data.data;
          vm.setData({
            nums: num
          })
        }
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})