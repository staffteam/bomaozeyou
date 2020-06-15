//index.js
//获取应用实例
const app = getApp()
import locate from '../../utils/location.js';
Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bannerData: [{
      id: 0,
      PicUrl: '/assets/images/banner.jpg'
    }],
    homeTips: '/assets/images/home_ts.png',
    bmData: [],
    classfyImg: {
      16: "/assets/images/home_list_yr.png",
      17: "/assets/images/home_list_xx.png",
      18: "/assets/images/home_list_cz.png",
      19: "/assets/images/home_list_gz.png",
      20: "/assets/images/home_list_dx.png",
      21: "/assets/images/home_list_qt.png"
    },
    bmTypeData: [],
    footerSelShow: false,
    searchValue: '',
    footerSelBottom: 0,
    footerSelTime: 0,
    selId: '16',
    hintText:"",
    hintImg:""
  },
  goShopping(){
    wx.navigateToMiniProgram({
      appId: 'wx2353300279e49f5c',//要打开的小程序 appId
      path: '',//打开的页面路径，如果为空则打开首页
      extraData: {
        foo: 'bar'//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      },
      envVersion: 'release',//要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
      success(res) {
        // 打开成功
      }
    })
  },
  accountLoad(res){
  },
  accountErr(res){
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
  //搜索点击
  searchClick() {
    wx.navigateTo({
      url: `../search/search`
    })
  },
  //轮播图点击
  bannerClick() {

  },
  //隐藏报名类型选择框
  bmTypeHide() {
    var query = wx.createSelectorQuery();
    query.select('.main').boundingClientRect((rect) => {
      this.setData({
        footerSelBottom: `-${rect.height}`,
        footerSelTime: 0.3
      });
      setTimeout(() => {
        this.setData({
          footerSelShow: false,
          footerSelTime: 0
        });
        wx.showTabBar();
      }, 300)
    }).exec();
  },
  //报名点击
  bmClick(o) {
    var id = o.currentTarget.dataset.id;
    wx.hideTabBar();
    var query = wx.createSelectorQuery();
    query.select('.main').boundingClientRect((rect) => {
      this.setData({
        footerSelBottom: `-${rect.height}`,
        footerSelTime: 0,
        selId: id
      });
      this.data.bmData.forEach(value=>{
        if (value.id == id){
          this.setData({
            footerSelShow: true,
            footerSelBottom: 0,
            footerSelTime: 0.3,
            bmTypeData: value.childrens
          })
        }
      })
      
    }).exec();
  },
  //报名年级选择
  bmTypeClick(o) {
    var id = o.currentTarget.dataset.id;
    this.bmTypeHide();
    wx.navigateTo({
      url: `../applyList/applyList?id=${id}&typeid=${this.data.selId}`
    })
  },
  onShow() {
    wx.showTabBar();
    app.$prot.getClassfy({
      success: data => {
        this.setData({
          bmData: data.data
        })
      }
    });
    var vm = this;
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      vm.setData({
        hasUserInfo: true
      });
      app.$prot.getMemberInfoSave({
        data: {
          Nickname: userInfo.nickName
        },
        success(data) {
          console.log(data);
        }
      })
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
    setTimeout(()=>{
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
  onLoad(options){
    let vm = this;
    if(options.code){
      wx.setStorage({
        key: 'wecwhatCode',
        data: options.code
      });
      let userData = wx.getStorageSync('userData');
      if(userData){
        app.$prot.wecwhatAuthorization({
          data:{
            code:options.code,
            userid:userData.id
          },
          success(res){
            console.log(res.data);
          }
        })
      }
    }
    this.cityInit();
    app.$prot.getHomeHint({
      success(data){
        data.data.img_url = app.$prot.api + data.data.img_url;
        vm.setData({
          hintText: data.data.hint,
          hintImg: data.data.img_url
        })
      }
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
  onShareAppMessage(){
    
  }
})