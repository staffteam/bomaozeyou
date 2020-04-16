// pages/collect/collect.js
const app = getApp()
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData:[
      { id: "Activity", title:"活动报名"},
      { id: "News", title: "活动资讯" }
    ],
    articleType: {
      "Activity": "报名",
      "Article": "资讯",
      "News": "资讯"
    },
    pageNum:-1,
    pageSize:999,
    navon:"Activity",
    articleListData:[]
  },
  navClick(o){
    let id = o.currentTarget.dataset.id;
    this.setData({
      navon:id,
      pageNum:-1,
    })
    this.getArticleListData();
  },
  getArticleListData() {
    let vm = this;
    this.setData({
      pageNum: this.data.pageNum+1,
    })
    app.$prot.getFavorites({
      data:{
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        keycode: this.data.navon == "News" ? "Article" : this.data.navon
      },
      success: data => {
        console.log(data.data);
        data.data = data.data.map(value => {
          value.img_url = app.$prot.api + value.img_url;
          value.end_time = util.endTime(value.end_time) == null ? '已过期' : '报名倒计时：' + util.endTime(value.end_time);
          let start_time_arr = value.publisher_time.split(':');
          value.publisher_time = start_time_arr[0] + ':' + start_time_arr[1];
          return value;
        })
        vm.setData({
          articleListData: data.data
        });
      }
    });
  },
  bmClick(o) {
    let id = o.currentTarget.dataset.id;
    let keycode = o.currentTarget.dataset.keycode;
    if (keycode == "Activity") {
      wx.navigateTo({
        url: `../applyDetails/applyDetails?id=${id}`
      })
    } else {
      wx.navigateTo({
        url: `../articleDetails/articleDetails?id=${id}`
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleListData();
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