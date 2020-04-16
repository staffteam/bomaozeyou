// pages/articleDetails/articleDetails.js
const app = new getApp();
import WxParse from '../../wxParse/wxParse.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscollect:false,
    recommendData:[],
    articleData:[]
  },
  recommendClick(o){
    let id = o.currentTarget.dataset.id;
    wx.redirectTo({
      url: `../articleDetails/articleDetails?id=${id}`
    })
  },
  picError(o){
    var _index = o.currentTarget.dataset.index;
    this.data.recommendData = this.data.recommendData.map((value,index)=>{
      if (_index == index){
        value.img_url = "/assets/images/list_img.png"
      }
      return value;
    })
    this.setData({
      recommendData:this.data.recommendData
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    if(!options.type){
      app.$prot.getArticleDetail({
        data:{
          id:options.id
        },
        success(data){
          var srcTop = new RegExp('src="\\/', "g");
          data.data.news.content = data.data.news.content.replace(
            srcTop,
            'src="' + app.$prot.api
          );
          data.data.news.content = WxParse.wxParse('content', 'html', data.data.news.content, vm, 5);
          data.data.recommend_list = data.data.recommend_list.map(value => {
            value.img_url = app.$prot.api + value.img_url;
            let publisher_time_arr = value.publisher_time.split(':');
            value.publisher_time = publisher_time_arr[0] + ':' + publisher_time_arr[1];
            return value;
          })
          vm.setData({
            articleData: data.data.news,
            recommendData: data.data.recommend_list
          })
        }
      })
    }else{
      app.$prot.getActivityWorksDetail({
        data:{
          id:options.id
        },
        success(data){
          var srcTop = new RegExp('src="\\/', "g");
          data.data.content = data.data.content.replace(
            srcTop,
            'src="' + app.$prot.api
          );
          data.data.content = WxParse.wxParse('content', 'html', data.data.content, vm, 5);
          data.data.recommends = data.data.recommends.map(value => {
            value.img_url = app.$prot.api + value.img_url;
            let publisher_time_arr = value.publisher_time.split(':');
            value.publisher_time = publisher_time_arr[0] + ':' + publisher_time_arr[1];
            return value;
          })
          vm.setData({
            articleData: data.data,
            recommendData: data.data.recommends
          })
        }
      })
    }
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
  //收藏
  collect() {
    let vm = this;
    if (!vm.data.articleData.IsFavorite) {
      app.$prot.getAddFavorite({
        data: {
          id: this.data.articleData.id,
          type: 1
        },
        success(data) {
          wx.showToast({
            title: '收藏成功！',
            mask: true,
            icon: 'success',
            duration: 1000,
          });
          vm.setData({
            ['articleData.IsFavorite']: !vm.data.articleData.IsFavorite
          })
        }
      })
    } else {
      app.$prot.getDelFavorite({
        data: {
          id: this.data.articleData.id,
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
            ['articleData.IsFavorite']: !vm.data.articleData.IsFavorite
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.articleData.title,
      path: `/pages/articleDetails/articleDetails?id=${this.data.articleData.id}`,
      imageUrl: this.data.articleData.img_url,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})