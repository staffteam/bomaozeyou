// pages/articleDetails/articleDetails.js
const app = new getApp();
import WxParse from '../../wxParse/wxParse.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscollect: false,
    articleData: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    app.$prot.getMessageDetail({
      data: {
        id: options.id
      },
      success(data) {
        var srcTop = new RegExp('src="\\/', "g");
        data.data.content = data.data.content.replace(
          srcTop,
          'src="' + app.$prot.api
        );
        data.data.content = WxParse.wxParse('content', 'html', data.data.content, vm, 5);
        let publisher_time_arr = data.data.time.split(':');
        data.data.time = publisher_time_arr[0] + ':' + publisher_time_arr[1];
        vm.setData({
          articleData: data.data,
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
    return {
      title: this.data.articleData.title,
      path: `/pages/msgDetails/msgDetails?id=${this.data.articleData.id}`,
      imageUrl: this.data.articleData.img_url,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})