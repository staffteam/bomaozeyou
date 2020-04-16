// pages/collect/collect.js
const app = getApp()
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [
      { id: "0", title: "待签到" },
      { id: "1", title: "已签到" },
      { id: "2", title: "已过期" }
    ],
    articleType: {},
    pageNum: -1,
    pageSize: 999,
    articleListData: [
    ],
    status:0,
  },
  showArticle(o){
    let id = o.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../applyDetails/applyDetails?id=${id}`
    })
  },
  showVoucher(o){
    let id = o.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../permitDetails/permitDetails?id=${id}`
    })
  },
  navClick(o) {
    let id = o.currentTarget.dataset.id;
    this.setData({
      status: id,
      pageNum: -1,
    })
    this.getArticleListData();
  },
  getArticleListData() {
    wx.showLoading({
      title: '请稍后...',
    });
    let vm = this;
    this.setData({
      pageNum: this.data.pageNum + 1,
    })
    app.$prot.getStudentCertificates({
      data: {
        status: this.data.status,
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      },
      success: data => {
        wx.hideLoading();
        console.log(data.data.certificates);
        let kindids = wx.getStorageSync('kindids')
        data.data.certificates = data.data.certificates.map(value => {
          value.img_url = app.$prot.api + value.img_url;
          value.classfy_id = kindids[value.classfy_name]
          return value;
        })
        vm.setData({
          articleListData: data.data.certificates
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