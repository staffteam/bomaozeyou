import $prot from '/utils/prot.js';
//app.js
App({
  $prot,
  onLaunch() {
    let vm = this;
    //获取所有地址
    $prot.getRegios({
      success(data) {
        wx.setStorage({
          key: 'regiosData',
          data: data.data
        });
      }
    });
    //获取活动分类
    $prot.getActivity({
      success: data => {
        let kindids = {};
        data.data.forEach(value => {
          kindids[value.name] = value.id;
        })
        wx.setStorage({
          key: 'kindids',
          data: kindids
        });
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        $prot.logins({
          data: {
            code: res.code
          },
          success(data) {
            wx.setStorage({
              key: 'sessionCode',
              data: res.code
            });
            wx.setStorage({
              key: 'sessionKey',
              data: data.data,
              success() {
                vm.getInfo();
                vm.loginSuccess();
              }
            });
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     this.loginRequest(res.userInfo);
          //   }
          // })
        }
      }
    })
  },
  loginSuccess(){

  },
  initend() {

  },
  getInfo() {
    this.initend();
    $prot.getMemberInfo({
      success(data) {
        wx.setStorage({
          key: 'userData',
          data: data.data
        });
      }
    })
  },
  globalData: {
    userInfo: null
  },
  loginRequest(info, fn) {
    debugger;
    wx.setStorage({
      key: 'userInfo',
      data: info,
      success: function() {
        $prot.getMemberInfoSave({
          data: {
            Nickname: wx.getStorageSync('userInfo').nickName
          },
          success(data) {
            console.log(data);
          }
        })
        if (fn) fn();
      }
    });
  }
})