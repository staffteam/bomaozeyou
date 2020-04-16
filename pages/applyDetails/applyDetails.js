// pages/applyDetails/applyDetails.js
import WxParse from '../../wxParse/wxParse.js';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cangotop: false,
    iscollect: false,
    applytype: '',
    applyid: '',
    kindData: [],
    applyListType: {},
    detail: {},
    isoutTime: false,
    istime: ''
  },
  //service
  onservice() {
    wx.navigateTo({
      url: `../aboutus/aboutus`
    })
  },
  //选择作品类别
  worksChange(o) {
    debugger;
  },
  //立即报名
  nowApply() {
    wx.navigateTo({
      url: `../applyForm/applyForm?id=${this.data.applyid}${this.data.grade ? '&grade=' + this.data.grade:''}`
    })
  },
  //收藏
  collect() {
    let vm = this;
    if (!vm.data.detail.IsFavorite) {
      app.$prot.getAddFavorite({
        data: {
          id: this.data.applyid,
          type: 0
        },
        success(data) {
          wx.showToast({
            title: '收藏成功！',
            mask: true,
            icon: 'success',
            duration: 1000,
          });
          vm.setData({
            ['detail.IsFavorite']: !vm.data.detail.IsFavorite
          })
        }
      })
    } else {
      app.$prot.getDelFavorite({
        data: {
          id: this.data.applyid,
          type: 0
        },
        success(data) {
          wx.showToast({
            title: '已取消收藏',
            mask: true,
            icon: 'success',
            duration: 1000,
          });
          vm.setData({
            ['detail.IsFavorite']: !vm.data.detail.IsFavorite
          })
        }
      })
    }
  },
  //置顶
  goTops() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，暂无法使用该功能，请升级后重试。'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    options.grade = options.grade || false;
    if (options.time == '已过期') {
      this.setData({
        isoutTime: true
      })
    }
    let vm = this;
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

        console.log(this.data.applyListType);
        app.$prot.getActivityDetail({
          data: {
            id: options.id
          },
          success(data) {
            var srcTop = new RegExp('src="\\/', "g");
            if (data.data) {
              data.data.content = data.data.content.replace(
                srcTop,
                'src="' + app.$prot.api
              );
              data.data.content = WxParse.wxParse('content', 'html', data.data.content, vm, 5);
              let end_time_arr = data.data.end_time.split(':');
              data.data.end_time = end_time_arr[0] + ':' + end_time_arr[1];
              let start_time_arr = data.data.start_time.split(':');
              data.data.start_time = start_time_arr[0] + ':' + start_time_arr[1];
              data.data.img_url = app.$prot.api + data.data.img_url;
              vm.setData({
                applyid: options.id,
                detail: data.data,
                grade: options.grade,
                istime: options.time
              });
            }else{
              wx.showToast({
                title: '网络发生异常，请联系管理员',
                icon: "none"
              })
              setTimeout(_=>{
                wx.navigateBack({
                  delta: 1
                })
              },2000)
            }
          }
        })
      }
    });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: this.data.detail.title,
      path: `/pages/applyDetails/applyDetails?id=${this.data.applyid}&time=${this.data.istime}`,
      imageUrl: this.data.detail.img_url,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onPageScroll(e) {
    if (e.scrollTop > 100) { //页面距离大于100px,则显示回到顶部控件
      this.setData({
        cangotop: true
      });
    } else {
      this.setData({
        cangotop: false
      });
    }
  }
})