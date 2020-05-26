// pages/budget/budget.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeData: [],
    page: 0,
    notData: false,
    isfooter: false
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
  getListData() {
    let vm = this;
    app.$prot.getBalanceDetailList({
      data: {
        page: vm.data.page
      },
      success(res) {
        vm.setData({
          isfooter: false
        });
        if (res.code == 0) {
          if (res.data.length == 0) {
            vm.setData({
              notData: true
            });
          } else {
            res.data = res.data.map(item=>{
              if(item.money.indexOf('+') == 0){
                item.type = 1;
              }else{
                item.type = 2;
              }
              return item;
            })
            vm.setData({
              page: vm.data.page + 1,
              noticeData:res.data
            });
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let vm = this;
    vm.setData({
      page: 0,
      noticeData: [],
      notData: false,
      isfooter: true
    });
    this.getListData();
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
    let vm = this;
    if (!vm.data.notData) {
      vm.setData({
        notData: false,
        isfooter: true
      });
      vm.getListData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})