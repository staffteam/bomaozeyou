// pages/delayPayment/delayPayment.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 0,
    pageSize: 8,
    isfooter: false,
    notData: false,
    orderData: [],
    allChecked: false,
    allPrice: 0,
    allLength: 0,
    ids:''
  },
  allClick() {
    this.data.orderData.map(value => {
      value.checked = !this.data.allChecked;
      return value;
    })
    this.setData({
      orderData: this.data.orderData,
      allChecked: !this.data.allChecked
    })
    this.getAll();
  },
  orderClick(o) {
    let id = o.currentTarget.dataset.id || o.currentTarget.id;
    this.data.orderData.map(value => {
      if (value.id == id) {
        value.checked = !value.checked;
      }
      return value;
    })
    this.setData({
      orderData: this.data.orderData,
      allChecked: false
    })
    this.getAll();
  },
  getOrdersData() {
    let vm = this;
    if (this.data.notData || !this.data.isfooter) {
      return false;
    }
    if (!this.data.isGetData) {
      this.setData({
        isGetData: true
      });
      vm.setData({
        pageNum: vm.data.pageNum + 1
      })
      app.$prot.getOrdersData({
        data: {
          status: 0,
          pageNum: vm.data.pageNum,
          pageSize: vm.data.pageSize
        },
        success(data) {
          if(data.data){
              data.data.orders = data.data.orders.map(value => {
                value.img_url = app.$prot.api + value.img_url;
                value.x = 0;
                return value;
              })
              vm.data.orderData.push(...data.data.orders);
              vm.setData({
                isfooter: false,
                isGetData: false,
                orderData: vm.data.orderData,
                articleTotal: data.data.total
              });
              if (data.data.total != 0 && (vm.data.pageNum) * vm.data.pageSize >= data.data.total) {
                vm.setData({
                  notData: true,
                  isfooter: true
                })
              }
          }else{
            vm.setData({
              notData: true,
              isGetData: false,
              isfooter: true
            })
          }
        }
      })
    }
  },
  getAll() {
    let _len = 0;
    let _p = 0;
    let idsarr = [];
    this.data.orderData.forEach(value => {
      if (value.checked) {
        _p = _p + value.total_price;
        _len = _len + 1;
        idsarr.push(value.id);
      }
    })
    this.setData({
      allLength: _len,
      allPrice: _p,
      ids: idsarr.join(',')
    })
  },
  orderDel(o) {
    let vm = this;
    let id = o.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success(res) {
        if (res.confirm) {
          app.$prot.getDelOrder({
            data: {
              id: id
            },
            success(data) {
              wx.showToast({
                title: '删除成功！',
                mask: true,
                icon: 'success',
                duration: 1000,
              });
              vm.data.orderData = vm.data.orderData.filter(value => {
                return value.id != id;
              });
              vm.setData({
                orderData: vm.data.orderData
              })
              console.log(vm.data.orderData.length);
              vm.getAll();
            }
          })
        }
      }
    })
  },
  payments() {
    if (this.data.allLength==0) {
      wx.showToast({
        title: '请选择订单',
        image: '/assets/images/tip.png',
        duration: 2000
      })
      return false;
    }
    wx.showLoading({
      title: '请稍后...',
    });
    if (this.data.allPrice == 0) {
      app.$prot.getWeXcxPayZero({
        data: {
          ids: this.data.ids,
        },
        success(data) {
          wx.hideLoading();
          wx.showToast({
            title: '报名成功！',
            mask: true,
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.redirectTo({
                url: '../paySuccess/paySuccess'
              })
            }
          });
        }
      })
      return false;
    }
    wx.login({
      success: res => {
        app.$prot.getWeXcxPay({
          data: {
            code: res.code,
            orderIds: this.data.ids,
            price: this.data.allPrice
          },
          success(data) {
            wx.hideLoading();
            let {
              nonceStr,
              paySign,
              signType,
              timeStamp
            } = data.data;
            wx.requestPayment({
              timeStamp,
              nonceStr,
              package: data.data.package,
              signType,
              paySign,
              success(res) {
                wx.showToast({
                  title: '支付成功！',
                  mask: true,
                  icon: 'success',
                  duration: 2000,
                  success: function () {
                    wx.redirectTo({
                      url: '../paySuccess/paySuccess'
                    })
                  }
                });
              },
              fail(res) {
                wx.showToast({
                  title: '支付失败！',
                  mask: true,
                  image: '/assets/images/tip.png',
                  duration: 2000,
                });
              }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
    this.setData({
      isfooter: true
    })
    this.getOrdersData();
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
    this.setData({
      isfooter: true
    })
    this.getOrdersData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})