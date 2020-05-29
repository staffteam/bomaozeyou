let api = 'https://xcx.zysn.net';
import testData from './testData.js';

function errorFn(data) {
  if (data.code && data.code < 0) {
    wx.showToast({
      title: data.msg,
      mask: true,
      image: '/assets/images/tip.png',
    });
    return false;
  } else if (data.code == undefined) {
    wx.showToast({
      title: '网络异常！',
      mask: true,
      image: '/assets/images/tip.png',
    });
    return false;
  } else {
    return true;
  }
}
export default {
  api: api + '/',
  imgApi: api,
  //扫码签到
  getScanQRCode(o) {
    wx.request({
      url: `${api}/api/Member/ScanQRCode?applyCode=${o.data.applyCode}&sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          let _data = JSON.parse(data.data);
          if (_data.code < 0) {
            wx.showToast({
              title: _data.msg,
              mask: true,
              image: '/assets/images/tip.png',
            });
            setTimeout(() => {
              wx.redirectTo({
                url: '../center/center'
              })
            }, 2000)
            return false;
          }
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取省市区
  getActivityRegionAll(o) {
    wx.request({
      url: `${api}/api/Article/ActivityRegionAll`,
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取分类信息
  getMessageDetail(o) {
    wx.request({
      url: `${api}/api/Member/MessageDetail?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取分类信息
  getActivityClassfys(o) {
    wx.request({
      url: `${api}/api/Article/ActivityClassfy`,
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //是否已签到
  getScanQRCodes(o) {
    wx.request({
      url: `${api}/api/Member/ScanQRCode?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //协议
  getProtocol(o) {
    wx.request({
      url: `${api}/api/Article/Protocol`,
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //验证护照信息
  getCheckStudentInfo(o) {
    wx.request({
      url: `${api}/api/Member/CheckStudentInfo`,
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取学生信息
  getUserDetalis(o) {
    wx.request({
      url: `${api}/api/Member/StudentDetail/${o.data.id}`,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //意见反馈
  getSuggestions(o) {
    wx.request({
      url: `${api}/api/Member/Suggestions?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      method: 'POST',
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //热门搜索
  getArticlesFaq(o) {
    wx.request({
      url: `${api}/api/Member/Faq`,
      data: {
        pageNum: 0,
        pageSize: 999
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //热门搜索
  getHotKeywords(o) {
    wx.request({
      url: `${api}/api/Article/HotKeywords`,
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //查询成绩
  getQueryScore(o) {
    wx.request({
      url: `${api}/api/Article/QueryScore`,
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //报名凭证详情
  getStudentCertificateDetail(o) {
    wx.request({
      url: `${api}/api/Member/StudentCertificateDetail?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //保存信息
  getMemberInfoSave(o) {
    wx.request({
      url: `${api}/api/Member/MemberInfoSave?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      method: 'POST',
      data: o.data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (data.code && data.code < 0) {
            return false;
          }
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //报名凭证列表
  getStudentCertificates(o) {
    wx.request({
      url: `${api}/api/Member/StudentCertificates?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      data: {
        status: o.data.status,
        pageNum: o.data.pageNum,
        pageSize: o.data.pageSize
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //删除订单
  getDelOrder(o) {
    wx.request({
      url: `${api}/api/Member/DelOrder?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      method: 'POST',
      data: o.data.id,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //代付款列表
  getOrdersData(o) {
    wx.request({
      url: `${api}/api/Member/Orders?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      data: {
        status: o.data.status,
        pageNum: o.data.pageNum,
        pageSize: o.data.pageSize
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //零价格提交订单
  getWeXcxPayZero(o) {
    wx.request({
      url: `${api}/api/WechatPay/WeXcxPayZero?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      method: 'POST',
      data: o.data.ids,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          let _data = JSON.parse(data.data);
          if (_data.code < 0) {
            wx.showToast({
              title: _data.msg,
              mask: true,
              image: '/assets/images/tip.png',
              duration: 2000,
            });
            return false;
          }
          o.success(_data);
        } else {
          wx.showToast({
            title: '网络异常！',
            mask: true,
            image: '/assets/images/tip.png',
            duration: 2000,
          });
        }
      }
    })
  },
  //提交订单
  getAddOrder(o) {
    wx.request({
      url: `${api}/api/Member/AddOrder?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}&type=1`,
      method: 'POST',
      data: JSON.stringify(o.data),
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          let _data = JSON.parse(data.data);
          if (_data.code < 0) {
            wx.showToast({
              title: _data.msg,
              mask: true,
              image: '/assets/images/tip.png',
              duration: 2000,
            });
            return false;
          }
          o.success(_data);
        } else {
          wx.showToast({
            title: '网络异常',
            mask: true,
            image: '/assets/images/tip.png',
            duration: 2000,
          });
        }
      }
    })
  },
  //获取活动年级
  getActivityClassfy(o) {
    wx.request({
      url: `${api}/api/Article/ActivityClassfy`,
      data: {
        id: o.data.id,
        key: o.data.key,
        address: ""
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取价格
  getGetPrices(o) {
    wx.request({
      url: `${api}/api/Member/GetPrice`,
      method: 'POST',
      data: JSON.stringify(o.data),
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //删除学生
  getGetPrice(o) {
    wx.request({
      url: `${api}/api/Member/GetPrice?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      method: 'POST',
      data: o.data.id,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //删除学生
  getDelStudent(o) {
    wx.request({
      url: `${api}/api/Member/DelStudent?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      method: 'POST',
      data: o.data.id,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //学生列表
  getStudentsList(o) {
    wx.request({
      url: `${api}/api/Member/Students`,
      method: 'GET',
      data: {
        sessionKey: wx.getStorageSync('sessionKey'),
        pageNum: o.data.pageNum,
        pageSize: o.data.pageSize
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //添加学生
  getStudents(o) {
    wx.request({
      url: `${api}/api/Member/AddStudent?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      method: 'POST',
      data: JSON.stringify(o.data),
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //系统消息列表
  getMessages(o) {
    wx.request({
      url: `${api}/api/Member/Messages`,
      data: {
        pageNum: o.data.pageNum,
        pageSize: o.data.pageSize,
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //收藏
  getDelFavorite(o) {
    wx.request({
      url: `${api}/api/Member/DelFavorite?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      method: 'POST',
      data: JSON.stringify({
        SourceID: o.data.id,
        KeyCode: o.data.type == 0 ? 'Activity' : 'Article'
      }),
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //收藏
  getAddFavorite(o) {
    wx.request({
      url: `${api}/api/Member/AddFavorite?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      method: 'POST',
      data: JSON.stringify({
        SourceID: o.data.id,
        KeyCode: o.data.type == 0 ? 'Activity' : 'Article'
      }),
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //活动详情
  getActivityDetail(o) {
    wx.request({
      url: `${api}/api/Article/ActivityDetail/${o.data.id}`,
      data: {
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //微信支付
  getWeXcxPay(o) {
    wx.request({
      url: `${api}/api/WechatPay/WeXcxPay?sessionKey=${encodeURIComponent(wx.getStorageSync('sessionKey'))}`,
      method: 'POST',
      data: {
        orderIds: o.data.orderIds,
        price: o.data.price,
        code: o.data.code
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          let _data = JSON.parse(data.data);
          if (_data.code < 0) {
            wx.showToast({
              title: _data.msg ? _data.msg : '网络发生异常  ！',
              mask: true,
              image: '/assets/images/tip.png',
              duration: 2000,
            });
            setTimeout(() => {
              wx.redirectTo({
                url: '../delayPayment/delayPayment'
              })
            }, 2000)
            return false;
          }
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //资讯推荐列表
  getRecommendActivitys(o) {
    wx.request({
      url: `${api}/api/Article/RecommendActivitys`,
      data: {
        pageNum: o.data.pageNum,
        pageSize: o.data.pageSize,
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //资讯详情
  getArticleDetail(o) {
    wx.request({
      url: `${api}/api/Article/ArticleDetail`,
      data: {
        id: o.data.id,
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //作品详情
  getActivityWorksDetail(o) {
    wx.request({
      url: `${api}/api/Article/GetActivityWorksDetail`,
      data: {
        id: o.data.id,
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //收藏列表
  getFavorites(o) {
    wx.request({
      url: `${api}/api/Member/Favorites`,
      data: {
        sessionKey: wx.getStorageSync('sessionKey'),
        pageNum: o.data.pageNum,
        pageSize: o.data.pageSize,
        keycode: o.data.keycode
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //客服信息
  getCustomerService(o) {
    wx.request({
      url: `${api}/api/Member/CustomerService`,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取会员信息
  getMemberInfo(o) {
    wx.request({
      url: `${api}/api/Member/MemberInfo`,
      data: {
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取订单数量
  getOrdersCount(o) {
    wx.request({
      url: `${api}/api/Member/OrdersCount`,
      data: {
        status: o.data.status,
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          let _data = JSON.parse(data.data);
          if (_data.code >= 0) {
            o.success(_data);
          }
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //搜索资讯和活动混合的列表
  getSearch(o) {
    wx.request({
      url: `${api}/api/Article/Search`,
      data: {
        pageNum: o.data.pageNum,
        pageSize: o.data.pageSize,
        keyword: o.data.keyword,
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取资讯和活动混合的列表
  getActivityUnionNewsList(o) {
    wx.request({
      url: `${api}/api/Article/ActivityUnionNewsList`,
      data: {
        pageNum: o.data.pageNum,
        pageSize: o.data.pageSize,
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取优秀作品
  getActivityWorksList(o) {
    wx.request({
      url: `${api}/api/Article/GetActivityWorksList`,
      data: {
        page: o.data.page
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //登录
  logins(o) {
    wx.request({
      url: `${api}/api/Member/WxLogin`,
      data: {
        code: o.data.code,
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取艺术组类别
  getClassfyGroup(o) {
    wx.request({
      url: `${api}/api/Article/Classfy`,
      data: {
        key: 'Group'
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取艺术类别
  getClassfyWorks(o) {
    wx.request({
      url: `${api}/api/Article/Classfy`,
      data: {
        key: 'Works'
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取年级信息
  getClassfy(o) {
    wx.request({
      url: `${api}/api/Article/Classfy`,
      data: {
        key: 'Grade'
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //首页提示
  getHomeHint(o) {
    wx.request({
      url: `${api}/api/Home/Hint`,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //列表页轮播
  getBanners(o) {
    wx.request({
      url: `${api}/api/Home/Banners?pageNum=1&pageSize=10`,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取种类
  getActivity(o) {
    wx.request({
      url: `${api}/api/Article/Classfy`,
      data: {
        key: 'Activity'
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //获取活动列表
  getArtivitys(o) {
    let {
      province,
      city,
      county,
      start,
      limit,
      grade,
      classfy,
      Title,
    } = o.data;
    let data = {
      args: {
        "province": province,
        "city": city,
        "sort": "IsTop DESC,TopTime DESC,PublisherTime",
        "dir": "DESC",
        "start": start,
        "limit": limit,
        "IsPublisher": true,
      }
    }
    grade ? data.args.grade = grade : null;
    classfy ? data.args.classfy = classfy : null;
    county ? data.args.county = county : null;
    Title ? data.args.Title = Title : null;
    wx.request({
      url: `${api}/api/Article/Activitys`,
      data: data,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  //省市区分级列表
  getRegios(o) {
    wx.request({
      url: `${api}/api/Article/Regions`,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  getApplyListData(o) {
    setTimeout(() => o.success(testData.apply), 500);
  },
  getApplyDetailsData(o) {
    setTimeout(() => o.success(testData.applyDetail), 500);
  },
  getUserListData(o) {
    setTimeout(() => o.success(testData.userList), 500);
  },
  getArticleListData(o) {
    wx.request({
      url: `${api}/api/Article/RecommendActivitys`,
      data: {
        pageNum: o.data.pageNum,
        pageSize: o.data.pageSize
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  getPromotionDetail(o) {
    wx.request({
      url: `${api}/api/promotion/GetPromotionDetail`,
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  getMemberBalance(o) {
    wx.request({
      url: `${api}/api/Promotion/GetMemberBalance`,
      data:{
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  withdrawalSubmit(o) {
    wx.request({
      url: `${api}/api/Promotion/WithdrawalSubmit`,
      method: 'POST',
      data:{
        sessionKey: wx.getStorageSync('sessionKey'),
        Money:o.data.Money
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  addPromotion(o) {
    wx.request({
      url: `${api}/api/Promotion/AddPromotion`,
      method: 'POST',
      data:{
        ActivityID: o.data.ActivityID,
        FromMemberID:o.data.FromMemberID,
        MemberID:o.data.MemberID
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  getAuthCode(o) {
    wx.showLoading({
      title: '请稍后',
    });
    wx.request({
      url: `${api}/api/Member/GetAuthCode`,
      data: {
        phone: o.data.phone,
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        wx.hideLoading();
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  getBalanceDetailList(o) {
    wx.request({
      url: `${api}/api/Promotion/GetBalanceDetailList`,
      data: {
        page: o.data.page,
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  getWithdrawalList(o) {
    wx.request({
      url: `${api}/api/Promotion/GetWithdrawalList`,
      data: {
        page: o.data.page,
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  getPromotionList(o) {
    wx.request({
      url: `${api}/api/Promotion/GetPromotionList`,
      data: {
        page: o.data.page,
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  getWithdrawalList(o) {
    wx.request({
      url: `${api}/api/Promotion/GetWithdrawalList`,
      data: {
        page: o.data.page,
        sessionKey: wx.getStorageSync('sessionKey')
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  },
  wecwhatAuthorization(o) {
    wx.request({
      url: `${api}/api/Member/WechatAuthorization`,
      data: {
        code: o.data.code
      },
      success(data) {
        if (data.data && typeof(data.data) === 'string') {
          if (!errorFn(JSON.parse(data.data))) return;
          o.success(JSON.parse(data.data));
        } else {
          o.success(data.data);
        }
      }
    })
  }
} 