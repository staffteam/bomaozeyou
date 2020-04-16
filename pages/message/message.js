// pages/message/message.js
const app = getApp()
import WxParse from '../../wxParse/wxParse.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleListData:[],
    pageNum:-1,
    isfooter: true,
    notData: false,
    total:0,
    pageSize:999
  },
  msgClick(o){
    let id = o.currentTarget.dataset.id;
    let type = o.currentTarget.dataset.type;
    wx.navigateTo({
      url: `../msgDetails/msgDetails?id=${id}`
    })
  },
  getArticleListData() {
    let vm = this;
    if (this.data.notData || !this.data.isfooter) {
      return false;
    }
    this.setData({
      pageNum: this.data.pageNum+1
    })
    app.$prot.getMessages({
      data: {
        pageNum: this.data.pageNum,
        pageSize: vm.data.pageSize
      },
      success: data => {
        data.data = data.data.map(value=>{
          // var srcTop = new RegExp('src="\\/', "g");
          // value.content = value.content.replace(
          //   srcTop,
          //   'src="' + app.$prot.api
          // );
          // value.content = WxParse.wxParse('content', 'html', value.content, vm, 5);
          let publisher_time_arr = value.time.split(':');
          value.time = publisher_time_arr[0] + ':' + publisher_time_arr[1];
          return value;
        })
        data.data = data.data.filter(value=>{
          return !value.status;
        })
        console.log(data.data);
        vm.setData({
          isfooter:false,
          articleListData: data.data,
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getArticleListData();
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
    this.getArticleListData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})