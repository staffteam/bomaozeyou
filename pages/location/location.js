// pages/demo/demo.js
import City from '../../utils/allcity.js';
import locate from '../../utils/location.js';
var qqmapsdk;
Page({

  data: {
    city: [],
    config: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      suctionTop: false, // 是否开启标题吸顶
      theCity: '',
      history:'',
    },
    stateCode:2,
  },
  onShow: function () {
    let vm = this;
    locate.init();
    vm.setData({
      config: {
        horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
        animation: true, // 过渡动画是否开启
        search: true, // 是否开启搜索
        searchHeight: 45, // 搜索条高度
        suctionTop: true, // 是否开启标题吸顶
        theCity: '获取中...',
        history: '定位中...',
        stateCode: vm.data.stateCode,
      },
      city: City,
    })
  },
  onLoad:function(options) {
    let vm = this;
    this.setData({
      stateCode: options.state || 2
    });
    let _data = wx.getStorageSync("locations");
    locate.getUserLocation(data => {
      vm.setData({
        config: {
          horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
          animation: true, // 过渡动画是否开启
          search: true, // 是否开启搜索
          searchHeight: 45, // 搜索条高度
          suctionTop: true, // 是否开启标题吸顶
          theCity: _data.city || data.city,
          history: data.city,
          stateCode: vm.data.stateCode,
        },
        city: City,
      })
    });
  },
  bindtap(e) {
    console.log(e.detail)
  },

})