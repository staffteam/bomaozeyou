// pages/gradeDetails/gradeDetails.js
import WxParse from '../../wxParse/wxParse.js';
import util from '../../utils/util.js'
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
      Class: "大学四级别", // 班级
      Phone: "17512840813", // 电话
      Address: "北京清华大学", //地址
      Group: "单人组",
      Coding: "123123",
      Performance: '100'
    },
    searchValue: "",
    isShowInfo: false,
    canvasHidden: false
  },
  goShop(e){
    let dataset = e.currentTarget.dataset;
    wx.navigateToMiniProgram({
      appId: 'wx2353300279e49f5c', //要打开的小程序 appId
      path: dataset.url, //打开的页面路径，如果为空则打开首页
      extraData: {
        foo: 'bar' //需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据
      },
      envVersion: 'release', //要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
      success(res) {
        // 打开成功
      }
    })
  },
  searchClick(e) {
    let vm = this;
    if (vm.data.searchValue == '') {
      wx.showToast({
        title: '请输入关键字',
        mask: true,
        image: '/assets/images/tip.png',
      });
      return false;
    }

    let data = this.data.form.map(item => {
      if (item.activity_title && item.activity_title.indexOf(vm.data.searchValue) >= 0) {
        item.hidden = false;
      } else {
        item.hidden = true;
      }
      return item;
    });
    this.setData({
      form: data,
      isShowInfo: true
    })
  },
  closeSearch() {
    this.setData({
      searchValue: "",
      isShowInfo: false
    })
    let data = this.data.form.map(item => {
      item.hidden = false;
      return item;
    });
    this.setData({
      form: data
    })
  },
  searchInput(e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.data[dataset.obj] = value;
    //obj是我们使用data-传递过来的键值对的键
    this.setData({
      obj: this.data[dataset.obj]
    })
    console.log(this.data);

  },
  goActivity(e) {
    let vm = this;
    let id = e.currentTarget.dataset.id;
    let time = e.currentTarget.dataset.time;
    wx.navigateTo({
      url: `../applyDetails/applyDetails?id=${id}&time=${time}`
    })
  },
  saveImageToPhotosAlbum(e) {
    let vm = this;
    let id = e.currentTarget.dataset.id;
    var imgSrc = ""; //base64编码
    vm.data.form.forEach(item => {
      if (id == item.id) {
        imgSrc += item.certificate;
      }
    });
    wx.showLoading({
      title: '保存中',
    })
    //  一个loading显示
    wx.downloadFile({ //  下载图片到本地
      url: imgSrc, //  下载的图片地址
      success(res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (res) {
              wx.hideLoading();
              wx.showToast({
                title: '保存成功',
              })
            },
            fail: function (err) {
              console.log(err)
            }
          });
        }
      }
    })
    // return;
    // wx.showLoading({
    //   title: '保存中',
    // })
    // let id = e.currentTarget.dataset.id;
    // var imgSrc = "data:image/png;base64,"; //base64编码
    // vm.data.form.forEach(item => {
    //   if (id == item.id) {
    //     imgSrc += item.certificate;
    //   }
    // });
    // var save = wx.getFileSystemManager();
    // var number = Math.random();
    // const basepath = `${wx.env.USER_DATA_PATH}`
    // save.readdir({
    //   dirPath: basepath, /// 获取文件列表
    //   success(res) {
    //     res.files.forEach((val) => { // 遍历文件列表里的数据
    //       save.unlink({
    //         filePath: basepath + '/' + val
    //       });
    //     });
    //     wx.hideLoading();
    //     save.writeFile({
    //       filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
    //       data: imgSrc.slice(22),
    //       encoding: 'base64',
    //       success: res => {

    //         console.log(res)
    //       },
    //       fail: err => {
    //         console.log(err)
    //       }
    //     })
    //   },
    //   fail(err) {
    //     console.log(err)
    //   },
    //   complete() {
    //     console.log('complete')
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          var srcTop = new RegExp('src="\\/', "g");
          data.data = data.data.map(value => {
            value.img_url = app.$prot.api + value.img_url;
            if (value.activity_content) {
              value.activity_content = value.activity_content.replace(
                srcTop,
                'src="' + app.$prot.api
              );
              value.activity_content = WxParse.wxParse('content', 'html', value.activity_content, vm, 5);
            }
            value.activity_time = util.endTime(value.activity_time) == null ? '已过期' : '报名倒计时：' + util.endTime(value.activity_time);
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