// pages/search/search.js
let app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyData: [],
    hotData:[],
    searchValue:''
  },
  //搜索事件
  searchInput(o){
    this.setData({
      searchValue: o.detail.value
    })
  },
  //搜索事件
  searchClick() {
    let vm = this;
    if (vm.data.searchValue == '') {
      wx.showToast({
        title: '请输入关键字',
        mask: true,
        image: '/assets/images/tip.png',
      });
      return false;
    }
    
    let _data = wx.getStorageSync('historyData')
    _data = _data || [];
    if (_data.length < 10) {
      _data = _data.filter(value => {
        return value != vm.data.searchValue;
      })
    } else {
      _data = _data.filter((value, index) => {
        return value != vm.data.searchValue && index < 9;
      })
    }
    wx.setStorage({
      key: 'historyData',
      data: [vm.data.searchValue, ..._data]
    });
    wx.navigateTo({
      url: `../searchDetails/searchDetails?value=${this.data.searchValue}`
    })
  },
  //清空搜索记录
  historyClose(){
    this.setData({
      historyData:[]
    })
    wx.setStorage({
      key: 'historyData',
      data: [],
    });
  },
  //点击搜索记录
  historyClick(o){
    this.setData({
      searchValue: o.currentTarget.dataset.title,
    });
    let vm = this;
    let _data = wx.getStorageSync('historyData')
    _data = _data || [];
    if (_data.length < 10) {
      _data = _data.filter(value => {
        return value != vm.data.searchValue;
      })
    } else {
      _data = _data.filter((value, index) => {
        return value != vm.data.searchValue && index < 9;
      })
    }
    wx.setStorage({
      key: 'historyData',
      data: [vm.data.searchValue, ..._data]
    });
    wx.navigateTo({
      url: `../searchDetails/searchDetails?value=${this.data.searchValue}`
    })
  },
  //点击热门搜索字段
  hotClick(o){
    this.setData({
      searchValue: o.currentTarget.dataset.title,
    });
    let vm = this;
    let _data = wx.getStorageSync('historyData')
    _data = _data || [];
    if (_data.length < 10) {
      _data = _data.filter(value => {
        return value != vm.data.searchValue;
      })
    } else {
      _data = _data.filter((value, index) => {
        return value != vm.data.searchValue && index < 9;
      })
    }
    wx.setStorage({
      key: 'historyData',
      data: [vm.data.searchValue, ..._data]
    });
    wx.navigateTo({
      url: `../searchDetails/searchDetails?value=${this.data.searchValue}`
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
    app.$prot.getHotKeywords({
      data: {
        pageNum: 0,
        pageSize: 10
      },
      success(data) {
        vm.setData({
          hotData: data.data
        })
      }
    })
    let _data = wx.getStorageSync('historyData')
    if (_data) {
      this.setData({
        historyData: _data
      })
    }
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