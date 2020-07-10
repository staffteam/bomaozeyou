// pages/applyList/applyList.js
//获取应用实例
const app = getApp();
import WxParse from '../../wxParse/wxParse.js';
import locate from '../../utils/location.js';
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyType: '所有',
    bmData: [],
    bmTypeData: [],
    picid: '',
    typeid: '',
    historyData: {
      picid: '',
      typeid: '',
    },
    isSel: false,
    selDown: '',
    applyData: [],
    start: -1,
    limit: 4,
    applyListType: {},
    cityData: [],
    isCity: false,
    cityDown: '',
    provinceid: null,
    cityid: null,
    districtid: 0,
    citySite: '地区',
    historyCity: {
      cityid: ''
    },
    isScroll: false,
    istop: false,
    isfooter: false,
    notData: false,
    isGetData: false,
    kindids: {},
    historyKind: {
      kindids: ''
    },
    kindLeft: '',
    kindData: [],
    searchValue: ""
  },
  searchInput(o) {
    let val = o.detail.value;
    this.setData({
      searchValue: val
    })
  },
  searchClick() {
    this.setData({
      isfooter: true,
      start: -1,
      limit: 4,
      notData: false,
      applyData: []
    })
    this.getApplyData();
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
  //隐藏筛选
  kindClose(o) {
    this.setData({
      kindLeft: ''
    });
    setTimeout(() => {
      this.setData({
        isKind: false,
      });
    }, 300);
    if (o && o.currentTarget.id == 'back') {
      this.setData({
        kindids: this.data.historyKind.kindids
      });
    }
  },
  //清空种类选择
  kindDel() {
    this.setData({
      kindids: {}
    });
  },
  //确定种类选择
  kindSave() {
    this.kindClose();
    this.setData({
      isfooter: true,
      start: -1,
      limit: 4,
      notData: false,
      applyData: []
    })
    this.getApplyData();
  },
  //点击种类
  kindClick(o) {
    let id = o.currentTarget.dataset.id;
    let name = o.currentTarget.dataset.name;
    let data = this.data.kindids;
    if (data[id]) {
      delete data[id];
    } else {
      data[id] = name;
    }
    this.setData({
      kindids: data,
    });
  },
  //种类筛选
  kindShowClick() {
    this.setData({
      isKind: true,
      historyKind: {
        kindids: this.data.kindids
      }
    })
    this.setData({
      kindLeft: 'left'
    })
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
    this.getApplyData();
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
  //地区选择取消
  cityClose(o) {
    this.setData({
      cityDown: ''
    });
    setTimeout(() => {
      this.setData({
        isCity: false,
      });
    }, 300);
    if (o && o.currentTarget.id == 'back') {
      this.setData({
        cityid: this.data.historyCity.cityid,
        citySite: this.data.historyCity.citySite,
        districtid: this.data.historyCity.districtid
      });
    }
  },
  //地区列表点击
  cityClick(o) {
    var id = o.currentTarget.dataset.id;
    var parentid = o.currentTarget.dataset.parentid;
    var name = o.currentTarget.dataset.name;
    this.setData({
      districtid: id,
      cityid: parentid,
      citySite: name,
      cityDown: '',
      isfooter: true,
      start: -1,
      limit: 4,
      notData: false,
      applyData: []
    })
    this.getApplyData();
    setTimeout(() => {
      this.setData({
        isCity: false,
      });
    }, 300);
  },
  //选择地区
  cityShowClick() {
    if (!this.data.isCity) {
      this.setData({
        isCity: true,
        historyCity: {
          districtid: this.data.districtid,
          cityid: this.data.cityid,
          citySite: this.data.citySite,
        }
      });
      this.setData({
        cityDown: 'down'
      })
    } else {
      this.cityClose();
    }
  },
  //关闭选择框
  selClose(o) {
    this.setData({
      selDown: ''
    });
    setTimeout(() => {
      this.setData({
        isSel: false,
      });
    }, 300);
    if (o && o.currentTarget.id == 'back') {
      this.setData({
        typeid: this.data.historyData.typeid,
        picid: this.data.historyData.picid
      });
    }
  },
  //点击切换
  selClick() {
    if (!this.data.isSel) {
      this.setData({
        isSel: true,
        historyData: {
          picid: this.data.picid,
          typeid: this.data.typeid
        }
      });
      this.setData({
        selDown: 'down'
      })
    } else {
      this.selClose();
      this.setData({
        typeid: this.data.historyData.typeid,
        picid: this.data.historyData.picid
      });
    }
  },
  //左侧类型选择
  bmClick(o) {
    var id = o.currentTarget.dataset.id;
    this.data.bmData.forEach(value => {
      if (value.id == id) {
        this.setData({
          typeid: id,
          picid: '',
          bmTypeData: value.childrens
        });
      }
    })
  },
  //右侧级别选择
  bmTypeClick(o) {
    var id = o.currentTarget.dataset.id;
    this.setData({
      picid: id
    });
    this.getString({
      id: id,
      typeid: this.data.typeid
    });
    this.selClose();
  },
  //设置类型
  getString(options) {
    this.data.bmData.forEach((item) => {
      //判断类型
      if (item.id == options.typeid) {
        let _name = item.name;
        //判断级别
        item.childrens.forEach((value) => {
          if (value.id == options.id) {
            this.setData({
              picid: Number(options.id),
              typeid: Number(options.typeid),
              applyType: _name + value.name,
              bmTypeData: item.childrens,
              isfooter: true,
              start: -1,
              limit: 4,
              notData: false,
              applyData: []
            })
            this.getApplyData();
          }

        })
      }

    })
  },
  //获取
  getApplyData() {
    let vm = this;
    if (this.data.notData || !this.data.isfooter) {
      return false;
    }
    if (!this.data.isGetData) {
      this.setData({
        isGetData: true
      }, () => {
        vm.setData({
          start: vm.data.start + 1,
          limit: vm.data.limit
        }, () => {
          let {
            provinceid,
            cityid,
            districtid,
            start,
            limit,
            picid,
            kindids,
          } = this.data;
          let classfy = [];
          for (let item in kindids) {
            classfy.push(item);
          }
          let _data = {
            province: provinceid,
            city: cityid,
            county: districtid,
            start: start,
            limit: limit,
            grade: picid,
            classfy: classfy.join(','),
          };
          if (vm.data.searchValue != '') {
            _data.Title = vm.data.searchValue;
          }
          app.$prot.getArtivitys({
            data: _data,
            success: data => {
              data.data = data.data || {
                activities: [],
                total: 0
              };
              data.data.activities = data.data.activities.map(value => {
                value.img_url = app.$prot.api + value.img_url;
                let end_time_arr = value.end_time.split(':');
                value.end_time = end_time_arr[0] + ':' + end_time_arr[1];
                value.istime = util.endTime(value.end_time) == null ? '已过期' : '报名倒计时：' + util.endTime(value.end_time);
                let start_time_arr = value.start_time.split(':');
                value.start_time = start_time_arr[0] + ':' + start_time_arr[1];
                return value;
              })
              console.log(data.data.activities);
              vm.data.applyData.push(...data.data.activities);
              vm.setData({
                isfooter: false,
                isGetData: false,
                applyData: vm.data.applyData,
                applyTotal: data.data.total
              });
              if ((vm.data.start + 1) * vm.data.limit >= data.data.total) {
                vm.setData({
                  notData: true,
                  isfooter: true,
                })
              }
            }
          });
        });
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.cityInit(options);
  },
  applyInit(options) {
    if (options.id) {
      app.$prot.getClassfy({
        success: data => {
          this.setData({
            bmData: data.data,
          });
          app.$prot.getActivity({
            success: data => {
              let kindids = {};
              data.data.forEach(value => {
                kindids[value.name] = value.id;
              })
              this.setData({
                kindData: data.data,
                applyListType: kindids
              });
              wx.hideLoading();
              this.getString(options);
            }
          });
        }
      });
    } else if (options.value) {
      this.getApplyData();
    }
  },
  getCityData(options, fn) {
    let vm = this;
    let _is = true;
    let regiosData = wx.getStorageSync("regiosData");
    regiosData.forEach(value => {
      if (_is) {
        value.childrens.forEach(item => {
          if (item.Name == vm.data.city && _is) {
            _is = false;
            vm.setData({
              provinceid: item.ParentID,
              cityid: item.ID,
              cityData: [{
                ID: 0,
                Name: "不限",
                ParentID: item.Childrens[0].ParentID
              }, ...item.Childrens]
            });
            if (fn) fn(options);
          } else {
            return;
          }
        })
      }
    })
  },
  cityInit(options) {
    wx.showLoading({
      title: '加载中...',
    })
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
      }, () => this.getCityData(options, this.applyInit));
    } else {
      locate.init();
      locate.getUserLocation(data => {
        vm.setData({
          province: data.province,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude
        }, () => this.getCityData(options, this.applyInit));
      });
    }
  },
  onShow() {
    if (this.data.picid) {
      this.cityInit({
        id: this.data.picid,
        typeid: this.data.typeid
      });
    }
  },
})