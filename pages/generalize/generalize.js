// pages/generalize/generalize.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    income:"0.00",
    extract:"0.00",
    navData:[
      {id:1,icon:'/assets/images/tg_icon1.png',title:"推广订单",link:"promoteOrder"},
      {id:2,icon:'/assets/images/tg_icon2.png',title:"我的邀请",link:"myInvite"},
      {id:3,icon:'/assets/images/tg_icon3.png',title:"收支明细",link:"budget"},
      {id:4,icon:'/assets/images/tg_icon4.png',title:"提现通知",link:"withdrawNotice"}
    ]
  },
  generalizeCenter(){
    wx.redirectTo({
      url: `../generalizeCenter/generalizeCenter`
    })
  },
  withdraw(){
    wx.navigateTo({
      url: `../withdraw/withdraw`
    })
  },
  centerListClick(o) {
    let link = o.currentTarget.dataset.link;
    wx.navigateTo({
      url: `../${link}/${link}`
    })
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
    let vm = this;
    app.$prot.getMemberBalance({
      success(res) {
        vm.setData({
          income:res.data.moneyTotal,
          extract:res.data.money
        })
      }
    });
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