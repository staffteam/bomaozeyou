// pages/worksList/worksList.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filelist: [],
    videolist:[],
    navon: '1',
    navData: [{
        id: "1",
        title: "图片作品"
      },
      {
        id: "2",
        title: "视频作品"
      }
    ],
  },
  navClick(o) {
    let id = o.currentTarget.dataset.id;
    this.setData({
      navon: id,
      pageNum: -1,
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  showDetail(e) {
    let vm = this;
    let {
      file
    } = e.currentTarget.dataset;
    wx.previewImage({
      current: file, // 当前显示图片的http链接
      urls: [file]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1CB0F6',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
    wx.showLoading({
      title: '请稍后',
    });
    wx.request({
      url: `${app.$prot.api}api/Member/GetUploadWorksList`,
      data: {
        studentId: options.id
      },
      success(data) {
        wx.hideLoading();
        if (data.statusCode == '200') {
          data = JSON.parse(data.data);
          var arr = [],
            arr2 = [];
          data.data.forEach(item => {
            let _arr = item.url.split('.');
            if (_arr.length > 1 && (_arr[_arr.length - 1] == 'png' || _arr[_arr.length - 1] == 'jpg')) {
              arr.push({
                file: app.$prot.imgApi + item.url,
                id: item.id
              })
            } else {
              arr2.push({
                file: app.$prot.imgApi + item.url,
                id: item.id
              })
            }
          })
          vm.setData({
            filelist: arr,
            videolist: arr2
          });
        }
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