// pages/permitDetails/permitDetails.js
const app = new getApp();
import {
  base64src
} from '../../utils/base64src.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    wechartImgUrl: '',
    isprint: true,
    tips: '',
    isVShow: false,
    vtext: '签到成功',
    vbtn: '确定',
    isSign: false,
    is28:false
  },
  vTips(v, btn) {
    this.setData({
      vtext: v,
      vbtn: btn || '确定',
      isVShow: true
    });
  },
  obligationV() {
    this.setData({
      isVShow: false
    })
  },
  saveImageToPhotosAlbum: function() {
    var vm = this;
    vm.setData({
      isprint: false
    })
    wx.showLoading({
      title: '加载中...',
    });
    //2. canvas绘制文字和图片
    let infos = wx.getSystemInfoSync();
    let _w = infos.windowWidth;
    let _h = infos.windowHeight;
    const ctx = wx.createCanvasContext('print');
    ctx.drawImage('/assets/images/bg.png', 0, 0, _w, _h);
    ctx.drawImage('/assets/images/voucher_bg.png', _w * 0.05, _w * 0.05, _w * 0.9, _h * 0.94);
    ctx.setFillStyle('#000000') // 文字颜色：黑色
    if (!vm.data.is28){
      ctx.setFontSize(_w * 0.045)
      ctx.setTextAlign('center')
      ctx.fillText(vm.data.info.activity_title.slice(0, 16), _w * 0.5, _h * 0.09, _w * 0.7) //开始绘制文本的 x/y 坐标位置（相对于画布）
      if (vm.data.info.activity_title.length > 16) {
        ctx.setTextAlign('center')
        ctx.fillText(vm.data.info.activity_title.slice(16, vm.data.info.activity_title.length), _w * 0.5, _h * 0.13, _w * 0.6) //开始绘制文本的 x/y 坐标位置（相对于画布） 
      }
    }else{
      
      if (vm.data.info.activity_title.length > 20 && vm.data.info.activity_title.length<=40) {
        ctx.setFontSize(_w * 0.045)
        ctx.setTextAlign('center')
        ctx.fillText(vm.data.info.activity_title.slice(0, 20), _w * 0.5, _h * 0.09, _w * 0.9) //开始绘制文本的 x/y 坐标位置（相对于画布）
        ctx.setTextAlign('center')
        ctx.fillText(vm.data.info.activity_title.slice(20, vm.data.info.activity_title.length), _w * 0.5, _h * 0.13, _w * 0.9) //开始绘制文本的 x/y 坐标位置（相对于画布） 
      }
      if (vm.data.info.activity_title.length > 40) {
        ctx.setFontSize(_w * 0.040)
        ctx.setTextAlign('center')
        ctx.fillText(vm.data.info.activity_title.slice(0, 23), _w * 0.5, _h * 0.08, _w * 0.9) //开始绘制文本的 x/y 坐标位置（相对于画布）
        ctx.setTextAlign('center')
        ctx.fillText(vm.data.info.activity_title.slice(23, 40), _w * 0.5, _h * 0.12, _w * 0.9) //开始绘制文本的 x/y 坐标位置（相对于画布） 
        ctx.fillText(vm.data.info.activity_title.slice(40, vm.data.info.activity_title.length), _w * 0.5, _h * 0.16, _w * 0.9) //开始绘制文本的 x/y 坐标位置（相对于画布） 
      }
    }
    
    
    wx.getImageInfo({
      src: vm.data.info.img_url,
      success: function(res) {
        var path = res.path;

        base64src(vm.data.wechartImgUrl, res => {
          var paths = res;
          ctx.drawImage(path, _w * 0.37, _w * 0.28, _w * 0.26, _w * 0.26) //绘制图片
          ctx.setFillStyle('white')
          vm.LeftArc(ctx, _w * 0.5, _w * 0.41, _w * 0.13, 0);
          ctx.drawImage('/assets/images/voucher_circle.png', _w * 0.21, _w * 0.6, _w * 0.03, _w * 0.03) //绘制图片
          ctx.setFillStyle('#000000')
          ctx.setFontSize(_w * 0.038)
          ctx.setTextAlign('left')
          ctx.fillText(`姓名：${vm.data.info.name}`, _w * 0.25, _w * 0.628, _w * 0.7)

          ctx.drawImage('/assets/images/voucher_circle.png', _w * 0.56, _w * 0.6, _w * 0.03, _w * 0.03) //绘制图片
          ctx.fillText(`性别：${vm.data.info.sex}`, _w * 0.60, _w * 0.628, _w * 0.7)

          ctx.drawImage('/assets/images/voucher_circle.png', _w * 0.21, _w * 0.67, _w * 0.03, _w * 0.03) //绘制图片
          ctx.fillText(`年龄：${vm.data.info.age}`, _w * 0.25, _w * 0.698, _w * 0.7)

          ctx.drawImage('/assets/images/voucher_circle.png', _w * 0.56, _w * 0.67, _w * 0.03, _w * 0.03) //绘制图片
          ctx.fillText(`民族：${vm.data.info.nation}`, _w * 0.60, _w * 0.698, _w * 0.7)

         
          ctx.drawImage('/assets/images/voucher_circle.png', _w * 0.21, _w * 0.74, _w * 0.03, _w * 0.03) //绘制图片
          ctx.fillText(`报名级别：${vm.data.info.group}`,_w * 0.25, _w * 0.769, _w * 0.7 )

          ctx.drawImage('/assets/images/voucher_circle.png', _w * 0.21, _w * 0.81, _w * 0.03, _w * 0.03 ) //绘制图片
          ctx.fillText(`学校或`, _w * 0.26, _w * 0.837, _w * 0.7)
          ctx.fillText(`单位名称：${vm.data.info.school}`, _w * 0.25, _w * 0.89, _w * 0.7)

          ctx.drawImage('/assets/images/voucher_circle.png', _w * 0.21, _w * 0.93, _w * 0.03, _w * 0.03) //绘制图片
          ctx.fillText(`报名编码：${vm.data.info.applycode}`, _w * 0.25, _w * 0.958, _w * 0.7)

          ctx.drawImage(paths, _w * 0.1, _w * 1.1, _w * 0.3, _w * 0.3) //绘制图片
          ctx.setFontSize(_w * 0.032)
          ctx.setFillStyle('#666666')
          ctx.fillText('提示：请自行打印报名凭证后凭', _w * 0.45, _w * 1.18, _w * 0.5)
          ctx.fillText('报名凭证参赛，具体考试时间及', _w * 0.45, _w * 1.23, _w * 0.5)
          ctx.fillText('地点会以短信的方式通知您或', _w * 0.45, _w * 1.28, _w * 0.5)
          ctx.fillText('请留意博茂择优官方公众号及', _w * 0.45, _w * 1.33, _w * 0.5)
          ctx.fillText('小程序内信息', _w * 0.45, _w * 3.8, _w * 0.5)
          ctx.stroke();
          ctx.draw(false, function() {
            // 3. canvas画布转成图片
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: _w,
              height: _h,
              destWidth: _w * 2,
              destHeight: _h * 2,
              canvasId: 'print',
              success: function(res) {
                console.log(res);
                vm.setData({
                  shareImgSrc: res.tempFilePath
                })
                if (!res.tempFilePath) {
                  wx.showModal({
                    title: '提示',
                    content: '图片绘制中，请稍后重试',
                    showCancel: false
                  })
                }
                vm.setData({
                  isprint: true
                })
                //4. 当用户点击分享到朋友圈时，将图片保存到相册
                wx.saveImageToPhotosAlbum({
                  filePath: vm.data.shareImgSrc,
                  success(res) {
                    wx.hideLoading();
                    wx.showToast({
                      title: '保存成功!',
                      mask: true,
                      icon: 'success',
                      duration: 1000,
                    });
                  }
                })
              },
              fail: function(res) {
                console.log(res)
              }
            })
          })
        })
      },
      fail: function(res) {
        console.log(res);
      }
    })


  },
  LeftArc: function(context, x, y, r, stepClear) {
    var calcHeight = r - stepClear;
    var calcWidth = Math.sqrt(r * r - calcHeight * calcHeight);

    var rectWidth = r - calcWidth;
    var rectheight = stepClear;
    if (rectWidth > 0.1) {
      context.fillRect(x - r, y - r, rectWidth, rectheight);
      context.fillRect(x + calcWidth, y - r, rectWidth, rectheight);
      context.fillRect(x - r, y + r - stepClear, rectWidth, rectheight);
      context.fillRect(x + calcWidth, y + r - stepClear, rectWidth, rectheight);
      stepClear += 0.5;
      this.LeftArc(context, x, y, r, stepClear);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let vm = this;
    wx.showLoading({
      title: '请稍后...',
    })
    app.$prot.getStudentCertificateDetail({
      data: {
        id: options.id
      },
      success(data) {
        wx.hideLoading();
        if (data.data) {
          data.data.img_url = app.$prot.api + data.data.img_url;
          vm.setData({
            info: data.data,
            tips:data.data.hint || '提示：请自行打印报名凭证后凭报名凭证参赛，具体考试时间及地点会以短信的方式通知您或请留意博茂择优官方公众号及小程序内信息',
            wechartImgUrl: 'data:image/png;base64,' + data.data.qrcode.split('"')[1],
            is28: data.data.activity_title!=null && data.data.activity_title.length > 28
          })
        }
      }
    })
    // setInterval(()=>{
    //   if (!this.data.isSign){
    //     app.$prot.getScanQRCodes({
    //       data: {
    //         applyCode: options.id
    //       },
    //       success(data) {
    //         console.log(data);
    //         if (data.data) {
    //           vm.vTips('签到成功');
    //           vm.setData({
    //             isSign:true
    //           })
    //         }
    //       }
    //     })
    //   }
    // },5000)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})