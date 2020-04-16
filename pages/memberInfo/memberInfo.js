// pages/aboutus/aboutus.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
  },
  onShow: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    console.log('dialog', e.detail)
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
  makePhone() {
    let vm = this;
    if (this.data.phone != ''){
      wx.showModal({
        title: '提示',
        content: '是否更换绑定手机号？',
        success(res) {
          if (res.confirm) {
            vm.setData({
              dialogShow: true
            })
          }
        }
      })
    }else{
      vm.setData({
        dialogShow: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    app.$prot.getCustomerService({
      success(data) {
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