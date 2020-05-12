// pages/upWorks/upWorks.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filelist: [],
    videolist: [],
    hint: "",
    upload_count: 0,
    i: 0,
    pid: "",
    navon: '1',
    navData: [{
        id: "1",
        title: "上传图片"
      },
      {
        id: "2",
        title: "上传视频"
      }
    ],
  },
  navClick(o) {
    let id = o.currentTarget.dataset.id;
    this.setData({
      navon: id,
      pageNum: -1,
    })
  },
  delVideo(e) {
    let vm = this;
    let {
      file,
      id
    } = e.currentTarget.dataset;
    if (id != 'undefined' && id) {
      wx.showModal({
        title: '询问',
        content: '您确认删除此作品吗？',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: `${app.$prot.api}api/Member/DeleteUploadWorks`,
              method: "POST",
              data: id,
              success(data) {
                if (data.statusCode == '200' && data.data) {
                  data = JSON.parse(data.data);
                  if (data.code != '-1') {
                    let videolist = vm.data.videolist.filter(item => {
                      return file != item.file;
                    });
                    vm.setData({
                      videolist: videolist
                    });
                    wx.showToast({
                      title: '删除成功'
                    })
                  } else {
                    wx.showToast({
                      title: '删除失败，请重试',
                      icon: "none"
                    })
                  }
                } else {
                  wx.showToast({
                    title: '删除失败，请重试',
                    icon: "none"
                  })
                }
              }
            })
          }
        }
      })

    } else {
      let videolist = vm.data.videolist.filter(item => {
        return file != item.file;
      });
      vm.setData({
        videolist: videolist
      });
    }
  },
  delFile(e) {
    let vm = this;
    let {
      file,
      id
    } = e.currentTarget.dataset;
    if (id != 'undefined' && id) {
      wx.showModal({
        title: '询问',
        content: '您确认删除此作品吗？',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: `${app.$prot.api}api/Member/DeleteUploadWorks`,
              method: "POST",
              data: id,
              success(data) {
                if (data.statusCode == '200' && data.data) {
                  data = JSON.parse(data.data);
                  if (data.code != '-1') {
                    let filelist = vm.data.filelist.filter(item => {
                      return file != item.file;
                    });
                    vm.setData({
                      filelist: filelist
                    });
                    wx.showToast({
                      title: '删除成功'
                    })
                  } else {
                    wx.showToast({
                      title: '删除失败，请重试',
                      icon: "none"
                    })
                  }
                } else {
                  wx.showToast({
                    title: '删除失败，请重试',
                    icon: "none"
                  })
                }
              }
            })
          }
        }
      })

    } else {
      let filelist = vm.data.filelist.filter(item => {
        return file != item.file;
      });
      vm.setData({
        filelist: filelist
      });
    }
  },
  showDetail(e) {
    let vm = this;
    let {
      file
    } = e.currentTarget.dataset;
    wx.previewImage({
      current: file, // 当前显示图片的http链接
      urls: [file]
    })
  },
  upfile() {
    let vm = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var filelist = vm.data.filelist;
        var arr = [],
          is = true;
        tempFilePaths.forEach(item => {
          arr.push({
            file: item
          });
          var h = item.split('.');
          if (h[h.length - 1] != 'png' && h[h.length - 1] != 'jpg') {
            is = false;
          }
        });
        if (!is) {
          wx.showToast({
            title: '请上传图片文件',
            icon: "none"
          })
        } else {
          if (vm.data.upload_count < (tempFilePaths.length + vm.data.filelist.length + vm.data.videolist.length)) {
            wx.showToast({
              title: '超出上传作品个数限制，最多可上传' + vm.data.upload_count + '个作品',
              icon: "none",
              duration: 2500
            })
            return false;
          }
          vm.setData({
            filelist: [...filelist, ...arr]
          })
        }
      }
    })
  },
  upvideo() {
    let vm = this;
    wx.showLoading({
      title: '请稍后...',
    });
    wx.chooseVideo({
      compressed:false,
      success: function (res) {
        wx.hideLoading();
        var tempFilePath = res.tempFilePath;
        let is = true;
        var h = tempFilePath.split('.');
        if (h[h.length - 1] != 'mp4') {
          is = false;
        }
        if(res.size > 209715200){
          wx.showToast({
            title: '视频大小不能大于200M',
            icon: "none"
          });
          return;
        } 
        if (is) {
          var videolist = vm.data.videolist;
          if (vm.data.upload_count < (1 + vm.data.filelist.length + vm.data.videolist.length)) {
            wx.showToast({
              title: '超出上传作品个数限制，最多可上传' + vm.data.upload_count + '个作品',
              icon: "none",
              duration: 2500
            })
            return false;
          }
          vm.setData({
            videolist: [...videolist, {
              file: tempFilePath
            }]
          })
        } else {
          wx.showToast({
            title: '请上传mp4格式文件',
            icon: "none"
          })
        }

      }
    })
  },
  upVideos() {
    let vm = this;
    var imgObj = vm.data.videolist[0].file;
    if (vm.data.videolist[0].id) {
      let videolist = vm.data.videolist.filter(item => {
        return imgObj != item.file;
      });
      vm.setData({
        i: vm.data.i++,
        videolist: videolist
      });
      vm.upVideos();
    } else {
      wx.uploadFile({
        url: `${app.$prot.api}api/Member/UploadWorks`, //仅为示例，非真实的接口地址
        filePath: imgObj,
        name: "file",
        formData: {
          'studentId': vm.data.pid
        },
        success: function (res) {
          var data = JSON.parse(res.data);
          if (res.statusCode == '200') {
            if (vm.data.i == vm.data.videolist.length - 1) {
              wx.hideLoading();
              let videolist = vm.data.videolist.filter(item => {
                return imgObj != item.file;
              });
              vm.setData({
                i: vm.data.i++,
                videolist: videolist
              });
              wx.redirectTo({
                url: `../upsuccess/upsuccess`
              })
            } else {
              let videolist = vm.data.videolist.filter(item => {
                return imgObj != item.file;
              });
              vm.setData({
                i: vm.data.i++,
                videolist: videolist
              });
              vm.upVideos();
            }
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '剩余作品上传失败，请重新上传',
              icon: "none"
            })
          }
        }
      })
    }
  },
  upFiles() {
    let vm = this;
    if (vm.data.filelist.length == 0) {
      if (vm.data.videolist.length == 0) {
        wx.hideLoading();
        wx.redirectTo({
          url: `../upsuccess/upsuccess`
        })
      } else {
        vm.upVideos();
      }
    }
    var imgObj = vm.data.filelist[0].file;
    if (vm.data.filelist[0].id) {
      let filelist = vm.data.filelist.filter(item => {
        return imgObj != item.file;
      });
      vm.setData({
        i: vm.data.i++,
        filelist: filelist
      });
      vm.upFiles();
    } else {
      wx.uploadFile({
        url: `${app.$prot.api}api/Member/UploadWorks`, //仅为示例，非真实的接口地址
        filePath: imgObj,
        name: "file",
        formData: {
          'studentId': vm.data.pid
        },
        success: function (res) {
          var data = JSON.parse(res.data);
          if (res.statusCode == '200') {
            if (vm.data.i == vm.data.filelist.length - 1) {

              let filelist = vm.data.filelist.filter(item => {
                return imgObj != item.file;
              });
              vm.setData({
                i: vm.data.i++,
                filelist: filelist
              });
              if (vm.data.videolist.length == 0) {
                wx.hideLoading();
                wx.redirectTo({
                  url: `../upsuccess/upsuccess`
                })
              } else {
                vm.upVideos();
              }
            } else {
              let filelist = vm.data.filelist.filter(item => {
                return imgObj != item.file;
              });
              vm.setData({
                i: vm.data.i++,
                filelist: filelist
              });
              vm.upFiles();
            }
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '剩余作品上传失败，请重新上传',
              icon: "none"
            })
          }
        }
      })
    }
  },
  submitFile() {
    let vm = this;
    if (this.data.filelist.length == 0 && this.data.videolist.length == 0) {
      wx.showToast({
        title: '请选择作品',
        icon: "none"
      })
    } else {
      if (vm.data.filelist.length == 0) {
        vm.upVideos();
      } else {
        vm.upFiles();
      }
      wx.showLoading({
        title: '上传中',
        mask: true
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    if (options.type == '上传成功') {
      wx.setNavigationBarTitle({
        title: '编辑作品'
      });
      wx.showLoading({
        title: '请稍后',
      });
      wx.request({
        url: `${app.$prot.api}api/Member/GetUploadWorksList`,
        data: {
          studentId: options.id
        },
        success(data) {
          wx.hideLoading();
          if (data.statusCode == '200') {
            data = JSON.parse(data.data);
            var arr = [],
              arr2 = [];
            data.data.forEach(item => {
              let _arr = item.url.split('.');
              if (_arr.length > 1 && (_arr[_arr.length - 1] == 'png' || _arr[_arr.length - 1] == 'jpg')) {
                arr.push({
                  file: app.$prot.imgApi + item.url,
                  id: item.id
                })
              } else {
                arr2.push({
                  file: app.$prot.imgApi + item.url,
                  id: item.id
                })
              }
            })
            vm.setData({
              filelist: arr,
              videolist: arr2
            });
          }
        }
      })
    }
    wx.request({
      url: `${app.$prot.api}/api/Article/GetUploadWorksHint`,
      data: {
        activityId: options.activityid
      },
      success(res) {
        if (res.statusCode == '200') {
          let data = JSON.parse(res.data);
          vm.setData({
            hint: data.data.hint,
            upload_count: data.data.upload_count
          })
        }
      }
    })
    this.setData({
      pid: options.id
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1CB0F6',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
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