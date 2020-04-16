// pages/protocol/protocol.js
const app = new getApp();
import WxParse from '../../wxParse/wxParse.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    app.$prot.getProtocol({
      success(data) {
        var srcTop = new RegExp('src="\\/', "g");
        data.data = data.data.replace(
          srcTop,
          'src="' + app.$prot.api
        );
        data.data = WxParse.wxParse('content', 'html', data.data, vm, 5);
        vm.setData({
          contents:data.data
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