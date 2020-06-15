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
    ],
    userTotal:0,
    articleListData:[]
  },
  //活动点击
  applyClick(o) {
    let id = o.currentTarget.dataset.id;
    let time = o.currentTarget.dataset.time;
    let type = o.currentTarget.dataset.type;
    wx.navigateTo({
      url: `../applyDetails/applyDetails?id=${id}&type=${type}&grade=${this.data.picid}&time=${time}`
    })
  },
  getArticleListData() {
    let vm = this;
    app.$prot.getArticleListData({
      data: {
        pageNum: 0,
        pageSize: 10
      },
      success: data => {
        data.data.activitys = data.data.activitys.map(value => {
          value.img_url = app.$prot.api + value.img_url;
          let start_time_arr = value.start_time.split(':');
          value.start_time = start_time_arr[0] + ':' + start_time_arr[1];
          return value;
        })
        vm.setData({
          articleListData: data.data.activitys
        });
      }
    });
  },
  goShopping(){
    wx.navigateToMiniProgram({
      appId: 'wx2353300279e49f5c',//要打开的小程序 appId
      path: '/promote/pages/promoteindex/promoteindex',//打开的页面路径，如果为空则打开首页
      extraData: {
        foo: 'bar'//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      },
      envVersion: 'release',//要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
      success(res) {
        // 打开成功
      }
    })
  },
  goTotal(){
    wx.navigateTo({
      url: `../userTotal/userTotal`
    })
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
    app.$prot.getMyCustomerCount({
      success(res) {
        vm.setData({
          userTotal:res.data,
        })
      }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})