// pages/aboutus/aboutus.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    service_time:""
  },
  makeLink(){
    wx.navigateTo({
      url: `../mackHelp/mackHelp`
    })
  },
  makePhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    app.$prot.getCustomerService({
      success(data){
        vm.setData({
          service_time: data.data.service_time,
          phone: data.data.tel
        })
      }
    })
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