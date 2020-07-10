// pages/center/center.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waitnum: 0,
    paidnum: 0,
    papersnum: 0,
    hasUserInfo: false,
    issuper: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {
      nickName: "登录/注册"
    },
    articleType: {
      "Activity": "报名",
      "News": "资讯"
    },
    centerList: [{
        id: "collect",
        title: "我的收藏",
        icon: "iconicon-test4"
      },

      {
        id: "myWorks",
        title: "上传作品",
        icon: "iconzu"
      },
      {
        id: "message",
        title: "消息通知",
        icon: "iconicon-test"
      },
      {
        id: "aboutus",
        title: "联系我们",
        icon: "iconicon-test3"
      },
      {
        id: "feedback",
        title: "意见反馈",
        icon: "iconicon-test1"
      }
    ],
    income: "",
    extract: "",
    userTotal: ""
  },
  scanCode() {
    let vm = this;
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        wx.setStorage({
          key: 'signPath',
          data: res,
          success() {
            wx.navigateTo({
              url: `/${res.path}`
            })
          }
        });
      }
    })
  },
  generalizeCenter() {
    wx.navigateTo({
      url: `../generalizeCenter/generalizeCenter`
    })
  },
  memberInfo() {
    wx.navigateTo({
      url: `../memberInfo/memberInfo`
    })
  },
  yetClick() {
    wx.navigateTo({
      url: `../accountPaid/accountPaid`
    })
  },
  entryClick() {
    wx.navigateTo({
      url: `../entryPermit/entryPermit`
    })
  },
  waitClick() {
    wx.navigateTo({
      url: `../delayPayment/delayPayment`
    })
  },
  //活动点击
  applyClick(o) {
    let id = o.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../applyDetails/applyDetails?id=${id}`
    })
  },
  centerListClick(o) {
    let id = o.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../${id}/${id}`
    })
  },
  getUserInfo: function (e) {
    if (!e.detail.userInfo) return;
    var vm = this;
    var userInfo_ = e.detail.userInfo;
    app.loginRequest(userInfo_, function () {
      vm.getArticleListData();
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1CB0F6',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
    let ordersCount = wx.getStorageSync("ordersCount");
    // 已付款
    app.$prot.getOrdersCount({
      data: {
        status: 1
      },
      success(data) {
        vm.setData({
          waitnum: ordersCount || 0,
          paidnum: data.data
        })
      }
    })

  },
  getArticleListData() {
    let vm = this;
    app.$prot.getArticleListData({
      data: {
        pageNum: 0,
        pageSize: 10
      },
      success: data => {
        data.data.activitys = data.data.activitys.map(value => {
          value.img_url = app.$prot.api + value.img_url;
          let start_time_arr = value.start_time.split(':');
          value.start_time = start_time_arr[0] + ':' + start_time_arr[1];
          return value;
        })
        vm.setData({
          articleListData: data.data.activitys
        });
      }
    });
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
    let vm = this;
    let userInfo = wx.getStorageSync("userInfo");
    let userData = wx.getStorageSync("userData");
    if (userInfo) {
      vm.setData({
        userInfo: userInfo,
        hasUserInfo: true,
      });
      this.getArticleListData();
    }
    if (userData) {
      vm.setData({
        issuper: userData.is_super
      })
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
    app.$prot.getMemberBalance({
      success(res) {
        vm.setData({
          income: res.data.moneyTotal,
          extract: res.data.money
        })
      }
    });
    app.$prot.getMyCustomerCount({
      success(res) {
        vm.setData({
          userTotal: res.data,
        })
      }
    })
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
    return {
      title: '博茂择优',
      path: '/pages/index/index',
      imageUrl: '/assets/images/banner.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})