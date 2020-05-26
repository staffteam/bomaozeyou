// pages/article/article.js
const app = getApp()
import util from '../../utils/util.js'
import locate from '../../utils/location.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [],
    articleListData: [],
    articleType: {
      "Activity": "报名",
      "News": "资讯"
    },
    notData: false,
    isGetData: false,
    isScroll: false,
    istop: false,
    isfooter: false,
    pageNum: -1,
    pageSize: 4,
    articleTotal:0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    searchValue:'',
    articleTag:1,
    userInfo:{}
  },
  tagClick(e){
    let tag = e.target.dataset.id;
    this.setData({
      articleTag:tag,
      pageNum:-1,
      notData:false,
      isfooter:true,
      articleListData:[]
    });
    this.getArticleListData();
  },
  cityInit(options) {
    let vm = this;
    vm.setData({
      citySite: '地区'
    });
    let data = wx.getStorageSync("locations")
    if (data) {
      vm.setData({
        province: data.province,
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude
      });
    } else {
      locate.init();
      locate.getUserLocation(data => {
        vm.setData({
          province: data.province,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude
        });
      });
    }
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
  //搜索点击
  searchClick() {
    wx.navigateTo({
      url: `../search/search`
    })
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
  onShareAppMessage: function() {
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
          if(vm.data.articleTag == 1){
            app.$prot.getActivityUnionNewsList({
              data: {
                pageNum: vm.data.pageNum,
                pageSize: vm.data.pageSize
              },
              success: data => {
                data.data.articles = data.data.articles.map(value=>{
                  value.img_url = app.$prot.api + value.img_url;
                  value.end_time = util.endTime(value.end_time) == null ? '已过期' : '报名倒计时：'+util.endTime(value.end_time);
                  let publisher_time_arr = value.publisher_time.split(':');
                  value.publisher_time = publisher_time_arr[0] + ':' + publisher_time_arr[1];
                  return value;
                })
                vm.data.articleListData.push(...data.data.articles);
                vm.setData({
                  isfooter: false,
                  isGetData: false,
                  articleListData: vm.data.articleListData,
                  articleTotal: data.data.total
                });
                if (data.data.total != 0 && (vm.data.pageNum+1) * vm.data.pageSize >= data.data.total) {
                  vm.setData({
                    notData: true,
                    isfooter: true
                  })
                }
              }
            });
          }else{
            app.$prot.getActivityWorksList({
              data: {
                page: vm.data.pageNum
              },
              success: data => {
                data.data = data.data.map(value=>{
                  value.img = app.$prot.api + value.img;
                  return value;
                })
                vm.data.articleListData.push(...data.data);
                vm.setData({
                  isfooter: false,
                  isGetData: false,
                  articleListData: vm.data.articleListData
                });
                if (data.data.total != 0 && (vm.data.pageNum+1) * vm.data.pageSize >= data.data.total) {
                  vm.setData({
                    notData: true,
                    isfooter: true
                  })
                }
              }
            });
          }
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
  onLoad: function(options) {
    let vm = this;
    this.cityInit();
    this.setData({
      searchValue: options.value || ''
    })
    this.setData({
      isfooter: true,
    }, () => this.getArticleListData())
    app.$prot.getBanners({
      success(data){
        data.data = data.data.map(value=>{
          value = app.$prot.api + value;
          return value;
        })
        vm.setData({
          bannerData:data.data
        })
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
    let vm = this;
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      vm.setData({
        hasUserInfo: true,
        userInfo:userInfo
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
    this.footerScroll();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(o) {
    let id = o.target.dataset.id;
    let keycode = o.target.dataset.keycode;
    let title = o.target.dataset.title;
    let imgUrl = o.target.dataset.imgurl;
    let userData = wx.getStorageSync('userData');
    let _page = "";
    if (keycode == "Activity") {
      _page = `/pages/applyDetails/applyDetails?id=${id}&userid=${userData.id}`;
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