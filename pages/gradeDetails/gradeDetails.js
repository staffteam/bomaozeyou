// pages/gradeDetails/gradeDetails.js
let app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '/assets/images/top.png',
    form: {
      ID: 0,
      Name: "小王", // 姓名
      Sex: '男', // 性别
      Age: "23", // 年龄
      Nation: "汉", // 民族
      School: "清华大学", // 学校
      PicID: "", // 照片
      IDCardNo: "430381199609259190", // 身份证号
      Class: "大学四年级", // 班级
      Phone: "17512840813", // 电话
      Address: "北京清华大学", //地址
      Group: "单人组",
      Coding: "123123",
      Performance: '100'
    },
    canvasHidden: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let vm = this;
    wx.showLoading({
      title: '请稍后',
    })
    app.$prot.getQueryScore({
      data: {
        name: options.name,
        key: options.id
      },
      success(data) {
        wx.hideLoading();
        if (data.data) {
          data.data = data.data.map(value => {
            value.img_url = app.$prot.api + value.img_url;
            return value;
          })
          vm.setData({
            form: data.data
          })
        } else {
          wx.showToast({
            title: '网络异常或未找到学员信息',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})