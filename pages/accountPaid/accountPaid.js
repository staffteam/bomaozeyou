// pages/accountPaid/accountPaid.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notData:false,
    isfooter:false,
    isGetData:false,
    pageNum:0,
    pageSize:8,
    orderData:[],
    istips:true
  },
  tipsClose(){
    this.setData({
      istips:false
    })
  },
  getOrdersData() {
    let vm = this;
    if (this.data.notData || !this.data.isfooter) {
      return false;
    }
    if (!this.data.isGetData) {
      this.setData({
        isGetData: true
      });
      vm.setData({
        pageNum: vm.data.pageNum + 1
      })
      app.$prot.getOrdersData({
        data: {
          status: 1,
          pageNum: vm.data.pageNum,
          pageSize: vm.data.pageSize
        },
        success(data) {
          console.log(data);
          data.data.orders = data.data.orders.map(value => {
            value.img_url = app.$prot.api + value.img_url;
            value.x = 0;
            return value;
          })
          vm.data.orderData.push(...data.data.orders);
          vm.setData({
            isfooter: false,
            isGetData: false,
            orderData: vm.data.orderData,
            articleTotal: data.data.total
          });
          if (data.data.total != 0 && (vm.data.pageNum) * vm.data.pageSize >= data.data.total) {
            vm.setData({
              notData: true,
              isfooter: true
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isfooter: true
    })
    this.getOrdersData();
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
    this.setData({
      isfooter: true
    })
    this.getOrdersData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})