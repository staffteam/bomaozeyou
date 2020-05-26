// pages/withdraw/withdraw.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: "可提现金额 0元",
    info: {},
    money: "",
    maxMoney: 0
  },
  goWithdraw() {
    let vm = this;
    if (Number(vm.data.money)) {
      if (Number(vm.data.money) > vm.data.maxMoney) {
        wx.showToast({
          title: '输入金额不能大于可提现金额',
          mask: true,
          image: '/assets/images/tip.png',
        });
      } else {
        app.$prot.withdrawalSubmit({
          data: {
            Money: vm.data.money
          },
          success(res) {
            if (res.code == 0) {
              wx.showToast({
                title: '申请提现成功！',
                mask: true,
                icon: 'success',
                duration: 1000
              });
              setTimeout(_ => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000);
            }
          }
        })
      }
    } else {
      wx.showToast({
        title: '请输入提现金额',
        mask: true,
        image: '/assets/images/tip.png',
      });
    }

  },
  onInputs(o) {
    let val = o.detail.value;
    this.setData({
      [o.currentTarget.dataset.id]: val
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync("userInfo");
    this.setData({
      info: userInfo
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
    let vm = this;
    app.$prot.getMemberBalance({
      success(res) {
        vm.setData({
          placeholder: `可提现金额 ${res.data.money}元`,
          maxMoney: res.data.money
        })
      }
    });
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