// pages/feedback/feedback.js
let app = new getApp();
import WxParse from '../../wxParse/wxParse.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendData: []
  },
  recommendClick(o){
    let id = o.currentTarget.dataset.id;
    this.data.recommendData = this.data.recommendData.map(value=>{
      if (value.id == id){
        value.on = !value.on;
      }else{
        value.on = false;
      }
      return value;
    })
    console.log(this.data.recommendData);
    this.setData({
      recommendData: this.data.recommendData
    })
  },
  feedbackClick(){
    wx.navigateTo({
      url: `../feedbackForm/feedbackForm`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let vm = this;
    app.$prot.getArticlesFaq({
      success(data) {
        data.data.faqs = data.data.faqs.map(value => {
          var srcTop = new RegExp('src="\\/', "g");
          value.content = value.content.replace(
            srcTop,
            'src="' + app.$prot.api
          );
          value.content = WxParse.wxParse('content', 'html', value.content, vm, 5);
          return value;
        })
        vm.setData({
          recommendData: data.data.faqs
        })
      }
    })
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