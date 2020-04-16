// pages/myWorks/myWorks.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worksData: [],
    typeJson: {
      '未上传': "1",
      '上传成功': "2",
      '已截止': "3"
    },
    btnJson: {
      '未上传': "上传作品",
      '上传成功': "编辑作品",
      '已截止': "查看作品"
    },
    pageNum: 1,
    pageSize: 10,
    notData: false,
    isfooter: false
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.footerScroll();
  },
  //滚动到底部事件
  footerScroll() {
    if (!this.data.notData) {
      this.setData({
        isfooter: true
      })
      this.getData();
    }
  },
  getData() {
    let vm = this;
    wx.request({
      url: `${app.$prot.api}api/Member/GetUploadOrderList`,
      data: {
        pageNum: vm.data.pageNum,
        pageSize: vm.data.pageSize,
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if(data.statusCode == '200'){
          data = JSON.parse(data.data);
          if(data.data.length==0){
            vm.setData({
              notData: true
            })
          }else{
            data.data = data.data.map(item=>{
              item.activityImg = app.$prot.api + item.activityImg;
              return item;
            })
            let num = vm.data.pageNum+1;
            console.log(num)
            vm.setData({
              isfooter: false,
              pageNum: num,
              worksData:[...vm.data.worksData,...data.data]
            });
          }
        }else{
          vm.setData({
            notData: true
          })
        }
      }
    })
  },
  goUp(e) {
    let {
      type,
      id
    } = e.currentTarget.dataset;
    if (type == '已截止') {
      wx.navigateTo({
        url: `../worksList/worksList?type=${type}&id=${id}`
      })
    } else {
      wx.navigateTo({
        url: `../upWorks/upWorks?type=${type}&id=${id}`
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1CB0F6',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
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
    this.setData({
      worksData:[],
      pageNum:1,
      pageSize:10,
      notData:false
    })
    this.footerScroll();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})