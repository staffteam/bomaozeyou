// pages/feedbackForm/feedbackForm.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedbackVal: '',
    phoneVal: ""
  },
  feedbackInput(o) {
    let val = o.detail.value;
    val = val.substring(0, 500);
    this.setData({
      feedbackVal: val
    })
  },
  phoneInput(o) {
    let val = o.detail.value;
    this.setData({
      phoneVal: val
    })
  },
  getPhone() {
    wx.navigateTo({
      url: `../memberInfo/memberInfo`
    })
  },
  getPhoneNumber(e) {
    debugger;
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  onSubmit() {
    if (this.data.feedbackVal.length < 5) {
      wx.showToast({
        title: '请完善您的意见',
        image: '/assets/images/tip.png',
        duration: 2000
      })
    } else if (this.data.phoneVal == '') {
      wx.showToast({
        title: '请完善您的手机号码',
        image: '/assets/images/tip.png',
        duration: 2000
      })
    } else if (!/^1[3456789]\d{9}$/.test(this.data.phoneVal)){
      wx.showToast({
        title: '手机号格式错误',
        image: '/assets/images/tip.png',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '请稍后',
      })
      app.$prot.getSuggestions({
        data: {
          "Phone": this.data.phoneVal,
          "Content": this.data.feedbackVal
        },
        success(data){
          wx.hideLoading();
          wx.showToast({
            title: '提交成功！',
            mask: true,
            icon: 'success',
            duration: 2000
          });
          setTimeout(()=>{
            wx.redirectTo({
              url: `../center/center`
            })
          },2000)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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