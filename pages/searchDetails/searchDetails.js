// pages/article/article.js
const app = getApp()
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [{
      id: 0,
      img_url: '/assets/images/banner.jpg'
    }],
    articleListData: [],
    articleType: {
      "Activity": "报名",
      "activity": "报名",
      "News": "资讯"
    },
    notData: false,
    isGetData: false,
    isScroll: false,
    istop: false,
    isfooter: false,
    pageNum: -1,
    pageSize: 4,
    articleTotal: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    searchValue: '',
  },
  searchInput(o){
    let val = o.detail.value;
    this.setData({
      searchValue: val
    })
  },
  getUserInfo: function (e) {
    if (!e.detail.userInfo) return;
    var vm = this;
    var userInfo_ = e.detail.userInfo;
    app.loginRequest(userInfo_, function () {
      //登录成功回调
      wx.showToast({
        title: '登录成功！',
        mask: true,
        icon: 'success',
        duration: 1000,
        success: function () {
          vm.setData({
            userInfo: userInfo_,
            hasUserInfo: true
          });
        }
      });
    });
  },
  bmClick(o){
    let id = o.currentTarget.dataset.id;
    let time = o.currentTarget.dataset.time;
    let keycode = o.currentTarget.dataset.keycode;
    let type = o.currentTarget.dataset.type;
    if (keycode =="Activity"){
      wx.navigateTo({
        url: `../applyDetails/applyDetails?id=${id}&time=${time}`
      })
    }else if(keycode == 'News'){
      wx.navigateTo({
        url: `../articleDetails/articleDetails?id=${id}`
      })
    }else if(type == 'work'){
      wx.navigateTo({
        url: `../articleDetails/articleDetails?id=${id}&type=work`
      })
    }
  },
  onShareAppMessage: function () {
    wx.updateShareMenu({
      withShareTicket: true,
      isUpdatableMessage: true,
      activityId: '1006_wX5j8g8X5QSQ+Lzr6L91vUbbcmnFPMYUnzGvYgerVc6C0Y3jB_PjMIdkhe8~', // 活动 ID
      targetState: 0,
      templateInfo: {
        parameterList: [{
          name: 'member_count',
          value: '1'
        }, {
          name: 'room_limit',
          value: '3'
        }]
      }
    });
  },
  //搜索事件
  searchClick() {
    let vm = this;
    console.log(vm.data.searchValue);
    if (vm.data.searchValue==''){
      wx.showToast({
        title: '请输入关键字',
        mask: true,
        image: '/assets/images/tip.png',
      });
      return false;
    }
    let _data = wx.getStorageSync('historyData')
    _data = _data || [];
    if (_data.length<10){
      _data = _data.filter(value => {
        return value != vm.data.searchValue;
      })
    }else{
      _data = _data.filter((value,index) => {
        return value != vm.data.searchValue && index<9;
      })
    }
    wx.setStorage({
      key: 'historyData',
      data: [vm.data.searchValue, ..._data]
    });
    this.setData({
      isfooter: true,
      pageNum: -1,
      pageSize: 4,
      notData: false,
      articleListData:[]
    })
    this.getArticleListData();
  },
  getArticleListData() {
    let vm = this;
    if (this.data.notData || !this.data.isfooter) {
      return false;
    }
    if (!this.data.isGetData) {
      this.setData({
        isGetData: true
      }, () => {
        vm.setData({
          pageNum: vm.data.pageNum + 1,
          pageSize: vm.data.pageSize
        }, () => {
          app.$prot.getSearch({
            data: {
              pageNum: vm.data.pageNum,
              pageSize: vm.data.pageSize,
              keyword:vm.data.searchValue
            },
            success: data => {
              data.data.articles = data.data.articles.map(value => {
                value.img_url = app.$prot.api + value.img_url;
                value.end_time = util.endTime(value.end_time) == null ? '已过期' : '报名倒计时：' + util.endTime(value.end_time);
                let publisher_time_arr = value.time.split(':');
                value.time = publisher_time_arr[0] + ':' + publisher_time_arr[1];
                return value;
              })
              vm.data.articleListData.push(...data.data.articles);
              vm.setData({
                isfooter: false,
                isGetData: false,
                articleListData: vm.data.articleListData,
                articleTotal: data.data.total
              });
              if (data.data.total != 0 && (vm.data.pageNum + 1) * vm.data.pageSize >= data.data.total || data.data.total==0) {
                vm.setData({
                  notData: true,
                  isfooter: true
                })
              }
            }
          });
        });
      })
    }
  },
  //滚动到顶部事件
  spplyTopScroll() {
    this.setData({
      isScroll: false,
      istop: true
    });
  },
  //滚动到底部事件
  footerScroll() {
    this.setData({
      isfooter: true
    })
    this.getArticleListData();
  },
  //监听滚动事件
  applyScroll(o) {
    if (!this.data.istop) {
      this.setData({
        isScroll: true
      })
    }
    if (o.detail.scrollTop > 1) {
      this.setData({
        istop: false
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    this.setData({
      searchValue: options.value || ''
    })
    this.setData({
      isfooter: true,
    }, () => this.getArticleListData())
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
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      vm.setData({
        hasUserInfo: true
      });
    }
    app.loginSuccess = () => {
      // 获取订单数量  待付款
      app.$prot.getOrdersCount({
        data: {
          status: 0
        },
        success(data) {
          let num = data.data;
          vm.setData({
            nums: num
          })
        }
      })
    }
    setTimeout(() => {
      // 获取订单数量  待付款
      app.$prot.getOrdersCount({
        data: {
          status: 0
        },
        success(data) {
          let num = data.data;
          vm.setData({
            nums: num
          })
        }
      })
    }, 1000)
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
    this.footerScroll();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (o) {
    let id = o.target.dataset.id;
    let keycode = o.target.dataset.keycode;
    let title = o.target.dataset.title;
    let imgUrl = o.target.dataset.imgurl;
    let _page = "";
    if (keycode == "Activity" || keycode == "activity") {
      _page = `/pages/applyDetails/applyDetails?id=${id}`;
    } else {
      _page = `/pages/articleDetails/articleDetails?id=${id}`
    }
    return {
      title: title,
      path: _page,
      imageUrl: imgUrl,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})