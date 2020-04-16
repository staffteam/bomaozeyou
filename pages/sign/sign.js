// pages/paySuccess/paySuccess.js
let app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issuccess: false
  },
  nextform() {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  showpermit() {
    wx.redirectTo({
      url: '../center/center'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let vm = this;
    let userData = wx.getStorageSync("userData");
    wx.showToast({
      title: options.applyCode,
      mask: true,
      image: '/assets/images/tip.png',
      duration: 2000,
      success: function () {
        wx.redirectTo({
          url: '../index/index'
        })
      }
    });
    if (userData.is_super) {
      let signPath = wx.getStorageSync('signPath');
      if (signPath){
        let scene = decodeURIComponent(signPath.path);
        let arr = scene.split('&');
        let applyCode = arr[0].split('=')[2];

        app.$prot.getScanQRCode({
          data: {
            applyCode: applyCode
          },
          success(data) {
            vm.setData({
              issuccess: true
            })
          }
        })
      }else{
        wx.showToast({
          title: '您的设备不支持该操作！',
          mask: true,
          image: '/assets/images/tip.png',
          duration: 2000,
          success: function () {
            wx.redirectTo({
              url: '../index/index'
            })
          }
        });
      }
    }else{
      wx.showToast({
        title: '您无权限扫码！',
        mask: true,
        image: '/assets/images/tip.png',
        duration: 2000,
        success: function () {
          wx.redirectTo({
            url: '../index/index'
          })
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})