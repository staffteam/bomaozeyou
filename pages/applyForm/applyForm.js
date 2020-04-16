// pages/applyForm/applyForm.js
let app = getApp();
import locate from '../../utils/location.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityVal: '请选择',
    cityPickerValue: [0, 0, 0],
    cityPickerIsShow: false,
    cityPickerIssShow: false,
    applyid: '',
    info: {},
    pothunterData: [],
    classfyWorksData: [],
    classfyWorksJson: {},
    classfyGroupData: [],
    classfyGroupJson: {},
    form: {
      worksType: '请选择',
      workForm: '请选择',
      name: '',
      date: '请选择',
      coachName: '',
      coachPhone: '',
      // address: '请选择'
    },
    addressMaxData: [],
    addressData: [],
    city: '',
    openVal: [0],
    isOpen: false,
    openData: [],
    openCNmae: '',
    openHostVal: '',
    isDown: false,
    isAdd: false,
    isAddDown: false,
    addHostData: [],
    pothunterData: [],
    checkPothunter: [],
    pothunterHostData: [],
    addListData: [],
    _price_: 0,
    _price: 0,
    isHintShow: false,
    orderIds: '123456789',
    isTimeOpen: false,
    isTimeDown: false,
    timeOpenData: [],
    timeOpenVal: [],
    timeOpenHostVal: [],
    timeA: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    timeB: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    timeid: '',
    timeData: [],
    isGradeOpen: false,
    isGradeDown: false,
    gradeOpenVal: [],
    gradeOpenHostVal: [],
    gradeA: [],
    gradeB: [],
    gradeVal: '请选择',
    isgrade: true,
    hostgrade: null,
    isVShow: false,
    vtext: '报名信息不完善，是否立即完善信息？',
    vbtn: '完善信息',
    isstop: false,
    grade: '',
    isproto: false,
    gradeData: [],
    isActivityOpen: false,
    isActivityDown: false,
    activityVal: "请选择",
    activityOpenVal: [],
    activityData: [],
    activityOpenHostVal: [],
    activityClassID: "",
    isNotChange: false
  },
  //关闭选择类别
  closeActivityOpen() {
    let vm = this;
    let _grade = '',
      _gradeid = '';
    vm.data.activityClassData.forEach((value, index) => {
      if (vm.data.activityOpenHostVal[0] == index) {
        _grade = value.name;
        _gradeid = value.id;
      }
    })
    this.setData({
      isActivityDown: false,
      activityClassID: _gradeid,
      activityVal: _grade,
      activityOpenVal: vm.data.activityOpenHostVal
    })
    if (vm.data.activityOpenHostVal[0] == 0) {
      this.getGetPrice();
    }
    setTimeout(() => {
      this.setData({
        isActivityOpen: false,
      })
    }, 300)
  },
  //保存类别选择
  saveActivityOpen() {
    let vm = this;
    this.setData({
      isActivityDown: false,
      activityOpenHostVal: vm.data.activityOpenVal
    })
    this.getGetPrice();
    setTimeout(() => {
      this.setData({
        isActivityOpen: false,
      })
    }, 300)
  },
  //打开选择类别框
  pickerActivityOpen(o) {
    let vm = this;
    if (vm.data.activityData.length == 0) {
      this.vTips('请先选择地址', '确定');
      return false;
    }
    if (this.data.isActivityOpen) {
      return false;
    }
    let _grade = '',
      _gradeid = '';
    vm.data.activityClassData.forEach((value, index) => {
      if (0 == index) {
        _grade = value.name;
        _gradeid = value.id;
      }
    })
    if (!this.data.activityClassID) {
      vm.setData({
        activityClassID: _gradeid,
        activityVal: _grade,
        activityOpenVal: [0],
        activityOpenHostVal: [0]
      })
    }
    this.setData({
      isActivityOpen: true,
    })
    this.setData({
      isActivityDown: true
    });
    setTimeout(() => {
      this.setData({
        activityOpenVal: vm.data.activityOpenHostVal
      })
    }, 200);
  },
  //选择类别改变
  activityOpenChange(o) {
    if (!this.data.isActivityDown) {
      return false;
    }
    let vm = this;
    this.setData({
      activityOpenVal: o.detail.value
    })
    let _grade = '',
      _gradeid = '';
    vm.data.activityClassData.forEach((value, index) => {
      if (o.detail.value[0] == index) {
        _grade = value.name;
        _gradeid = value.id;
      }
    })
    vm.setData({
      activityClassID: _gradeid,
      activityVal: _grade
    })
  },
  pickerTimeOpen() {
    let vm = this;
    if (this.data.isTimeOpen) {
      return false;
    }
    this.setData({
      timeOpenHostVal: this.data.timeOpenVal,
      isTimeOpen: true,
    })
    this.setData({
      isTimeDown: true
    })
  },
  closeTimeOpen() {
    this.setData({
      isTimeDown: false
    })
    setTimeout(() => {
      this.setData({
        isTimeOpen: false,
        timeOpenData: []
      })
    }, 300)
  },
  saveTimeOpen() {
    if (this.data.timeOpenVal.length == 0 || (this.data.timeOpenVal[0] == 0 && this.data.timeOpenVal[1] == 0)) {
      this.vTips('请选择合理的作品时长', '确定');
      return;
    }
    this.setData({
      isTimeDown: false
    })
    setTimeout(() => {
      this.setData({
        isTimeOpen: false,
      })
    }, 300)
  },
  timeOpenChange(o) {
    let vm = this;
    this.setData({
      timeOpenVal: o.detail.value
    })
    let _m = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
    if (o.detail.value[0] == 20) {
      this.setData({
        timeB: [0]
      })
    } else {
      this.setData({
        timeB: _m
      })
    }
    let _time = '';
    vm.data.timeA.forEach((value, index) => {
      if (o.detail.value[0] == index) {
        _time += value;
      }
    })
    if (o.detail.value[0] == 20) {
      _time += '分0秒';
    } else {
      vm.data.timeB.forEach((item, i) => {
        if (o.detail.value[1] == i) {
          _time += '分' + item + '秒';
        }
      })
    }
    vm.setData({
      ['form.date']: _time
    })
  },
  //获取年级和类别数据
  activityClassfy(type) {
    let vm = this;
    let objs = {
      id: this.data.applyid,
      provinceid: this.data.cityPickerValue[0],
      cityid: this.data.cityPickerValue[1],
      countyid: this.data.cityPickerValue[2]
    };
    if(type == 'grade'){
      objs.gradeid = vm.data.grade;
    }
    if(type == 'works'){
      objs.gradeid = vm.data.grade;
      objs.workid = vm.data.classfyWorksJson[vm.data.form.worksType];
    }
    if(type == 'group'){
      objs.gradeid = vm.data.grade;
      objs.workid = vm.data.classfyWorksJson[vm.data.form.worksType];
      objs.groupid = vm.data.classfyGroupJson[vm.data.form.workForm];
    }
    app.$prot.getActivityClassfys({
      data: objs,
      success(data) {
        if (data.data) {
          let name = data.data.grades.map(value => {
            return value.name;
          })
          let activityArr = data.data.activityClasses.map(value => {
            return value.name;
          })
          let _name = data.data.grades[0].childrens.map(value => {
            return value.name;
          })
          if (type == 'grade') {
            //年级选择后，替换类型选择数据
            vm.setData({
              activityData: activityArr,
              activityClassData: data.data.activityClasses,
              activityVal: "请选择",
              activityClassID: "",
            });
            let _data = [];
            let _json = {};
            data.data.works.forEach(value => {
              _data.push(value.name);
              _json[value.name] = value.id;
            })
            vm.setData({
              classfyWorksData: ['请选择', ..._data],
              classfyWorksJson: _json,
              ['form.worksType']: '请选择',
              ['form.workForm']: '请选择'
            });
            _data = [];
            _json = {};
            data.data.group.forEach(value => {
              _data.push(value.name);
              _json[value.name] = value.id;
            })
            vm.setData({
              classfyGroupData: ['请选择', ..._data],
              classfyGroupJson: _json
            });
          } else if (type == 'works') {
            //选择作品
            vm.setData({
              activityData: activityArr,
              activityClassData: data.data.activityClasses,
              activityVal: "请选择",
              activityClassID: "",
            });
            let _data = [];
            let _json = {};
            data.data.group.forEach(value => {
              _data.push(value.name);
              _json[value.name] = value.id;
            })
            vm.setData({
              ['form.workForm']: '请选择',
              classfyGroupData: ['请选择', ..._data],
              classfyGroupJson: _json
            });
          } else if (type == 'group') {
            //选择形式
            vm.setData({
              activityData: activityArr,
              activityClassData: data.data.activityClasses,
              activityVal: "请选择",
              activityClassID: "",
            });
          } else {
            //地址选择后重置所有
            vm.setData({
              activityData: activityArr,
              activityClassData: data.data.activityClasses,
              activityOpenVal: "请选择",
              activityClassID: "",
              gradeData: data.data.grades,
              gradeA: name,
              gradeB: _name,
              isgrade: vm.data.hostgrade != null ? true : false,
              gradeOpenVal: [0, 0],
              gradeVal: '请选择'
            })
            if (vm.data.hostgrade == null) {
              vm.setData({
                grade: ''
              })
            }

            let _data = [];
            let _json = {};
            data.data.works.forEach(value => {
              _data.push(value.name);
              _json[value.name] = value.id;
            })
            vm.setData({
              classfyWorksData: ['请选择', ..._data],
              classfyWorksJson: _json,
              ['form.worksType']: '请选择',
              ['form.workForm']: '请选择'
            });
            _data = [];
            _json = {};
            data.data.group.forEach(value => {
              _data.push(value.name);
              _json[value.name] = value.id;
            })
            vm.setData({
              classfyGroupData: ['请选择', ..._data],
              classfyGroupJson: _json
            });
          }

        }
      }
    })
  },
  showCityPicker() {
    // this.data.cityPicker.show()
    this.setData({
      cityPickerIsShow: true,
    });
    this.setData({
      cityPickerIssShow: true,
    })
  },
  protocolClick() {
    this.setData({
      isproto: !this.data.isproto
    })
  },
  //打开选择年级框
  pickerGradeOpen(o) {
    let vm = this;
    if (vm.data.gradeData.length == 0) {
      this.vTips('请先选择地址', '确定');
      return false;
    }
    if (this.data.isGradeOpen) {
      return false;
    }
    let _grade = '',
      _gradeid = '';
    vm.data.gradeData.forEach((value, index) => {
      if (0 == index) {
        _grade += value.name;
        value.childrens.forEach((item, i) => {
          if (0 == i) {
            _grade += ' ' + item.name;
            _gradeid = item.id;
          }
        })
      }
    })
    if (!vm.data.grade) {
      vm.setData({
        gradeOpenVal: [0, 0],
        grade: _gradeid,
        gradeVal: _grade,
        gradeOpenHostVal: [0, 0],
      })
    }
    this.setData({
      isGradeOpen: true,
    });
    this.setData({
      isGradeDown: true
    });
    setTimeout(() => {
      this.setData({
        gradeOpenVal: vm.data.gradeOpenHostVal
      })
    }, 200);
  },
  //选择年级取消
  closeGradeOpen() {
    let vm = this;
    this.setData({
      isGradeDown: false
    })
    let _grade = '',
      _gradeid = '';
    vm.data.gradeData.forEach((value, index) => {
      if (vm.data.gradeOpenHostVal[0] == index) {
        _grade += value.name;
        value.childrens.forEach((item, i) => {
          if (vm.data.gradeOpenHostVal[1] == i) {
            _grade += ' ' + item.name;
            _gradeid = item.id;
          }
        })
      }
    });
    setTimeout(() => {
      this.setData({
        isGradeOpen: false,
        grade: _gradeid,
        gradeVal: _grade,
        gradeOpenVal: vm.data.gradeOpenHostVal
      })
    }, 300)
  },
  //保存年级选择
  saveGradeOpen() {
    let vm = this;
    this.setData({
      isGradeDown: false,
      gradeOpenHostVal: vm.data.gradeOpenVal
    });
    this.activityClassfy('grade');
    this.getGetPrice();
    setTimeout(() => {
      this.setData({
        isGradeOpen: false
      })
    }, 300)
  },
  //年级选择改变
  gradeOpenChange(o) {
    if (!this.data.isGradeDown || this.data.isNotChange) {
      return false;
    }
    console.log(o);
    let vm = this;
    this.setData({
      gradeOpenVal: o.detail.value
    });
    let _grade = '',
      _gradeid = '';
    vm.data.gradeData.forEach((value, index) => {
      if (o.detail.value[0] == index) {
        _grade += value.name;
        value.childrens.forEach((item, i) => {
          if (o.detail.value[1] == i) {
            _grade += ' ' + item.name;
            _gradeid = item.id;
          }
        })
      }
    });
    vm.setData({
      grade: _gradeid,
      gradeVal: _grade
    });
    let _name = vm.data.gradeData[o.detail.value[0]].childrens.map(value => {
      return value.name;
    });
    vm.setData({
      gradeB: _name
    });
  },
  /**
   * 城市选择确认
   */
  cityPickerOnSureClick: function (e) {
    this.setData({
      cityPickerIssShow: false,
    })
    console.log(e.detail.valueCode);
    this.activityClassfy();
    setTimeout(() => {
      this.setData({
        cityVal: e.detail.valueName[0] + ' ' + e.detail.valueName[1] + ' ' + e.detail.valueName[2],
        cityPickerValue: e.detail.valueCode,
        cityPickerIsShow: false,
      });
    }, 100)
  },
  /**
   * 城市选择取消
   */
  cityPickerOnCancelClick: function (event) {
    this.setData({
      cityPickerIssShow: false,
    })
    setTimeout(() => {
      this.setData({
        cityPickerIsShow: false,
      });
    }, 100)
  },
  hintHide() {
    this.setData({
      isHintShow: false
    })
  },
  obligation() {
    this.hintHide();
    wx.redirectTo({
      url: '../center/center'
    })
  },
  obligationV() {
    this.setData({
      isVShow: false
    })
  },
  awaitClick() {
    let vm = this;
    this.settleClick(function () {
      vm.setData({
        isHintShow: true
      });
    })
  },
  //选中已选参赛人
  checkAddData(o) {
    let id = o.currentTarget.dataset.id;
    this.data.checkPothunter = this.data.checkPothunter.map(value => {
      if (value.id == id) {
        value.check = !value.check;
      } else {
        value.check = false
      }
      return value;
    });
    this.setData({
      checkPothunter: this.data.checkPothunter
    })
  },
  //删除已选参赛人
  delAddListData(o) {
    let vm = this;
    let id = o.currentTarget.dataset.id;
    vm.data.checkPothunter = vm.data.checkPothunter.filter(value => {
      return value.id != id;
    });
    vm.data.pothunterData = vm.data.pothunterData.map(value => {
      if (id == value.id) {
        value.checked = false;
      }
      return value;
    })
    vm.setData({
      checkPothunter: vm.data.checkPothunter,
      pothunterData: vm.data.pothunterData,
    })
    this.getGetPrice();
  },
  //选中参赛人
  pothunterChange(o) {
    let id = o.currentTarget.dataset.id;
    let _data = '';
    let _data_ = [];
    if (o.detail.value.length > 0) {
      let val = o.detail.value[0];
      _data = this.data.checkPothunter;
      _data_ = this.data.pothunterData.map(value => {
        if (id == value.id) {
          value.checked = true;
          value.check = false;
          _data.push(value);
        }
        return value;
      })
    } else {
      _data = this.data.checkPothunter;
      _data = _data.filter(value => {
        return value.id != id;
      });
      _data_ = this.data.pothunterData.map(value => {
        if (id == value.id) {
          value.checked = false;
        }
        return value;
      })
    }
    console.log(_data);
    this.setData({
      checkPothunter: _data,
      pothunterData: _data_
    });
  },
  distinct(a, b) {
    let c = a.filter((value, index) => {
      let _is = true;
      b.forEach(item => {
        if (item.id == value.id) {
          _is = false;
        }
      })
      return _is;
    })
    return [...c, ...b]
  },
  //取消添加
  checkPothunterClose() {
    this.setData({
      checkPothunter: JSON.parse(this.data.addHostData),
      pothunterData: JSON.parse(this.data.pothunterHostData),
      isAddDown: false
    });
    setTimeout(() => {
      this.setData({
        isAdd: false
      })
    }, 300);
  },
  //确认添加
  checkPothunterSave() {
    let vm = this;
    if ((this.data.info.IsPassportInfo || this.data.info.IsStuDetailInfo) && vm.data.checkPothunter.length > 0) {
      wx.showLoading({
        title: '请稍后...',
      })
      let ids = vm.data.checkPothunter.map(value => {
        return value.id;
      })
      app.$prot.getCheckStudentInfo({
        data: {
          type: this.data.info.IsPassportInfo && this.data.info.IsStuDetailInfo ? 'all' : this.data.info.IsPassportInfo ? 'passport' : 'detail',
          ids: ids.join(',')
        },
        success(data) {
          wx.hideLoading();
          if (data.code == '0') {
            vm.setData({
              isAddDown: false,
            })
            vm.getGetPrice();
            setTimeout(() => {
              vm.setData({
                isAdd: false
              })
            }, 300)
          } else {
            vm.vTips(data.msg);
          }
        }
      })
    } else {
      vm.setData({
        isAddDown: false,
      })
      vm.getGetPrice();
      setTimeout(() => {
        vm.setData({
          isAdd: false
        })
      }, 300)
    }
  },
  //添加参赛人
  addPothnter() {
    console.log(`IsPassportInfo=${this.data.info.IsPassportInfo}&IsBodyInfo=${this.data.info.IsBodyInfo}&IsStuDetailInfo=${this.data.info.IsStuDetailInfo}&IsShowInfo=${this.data.info.IsShowInfo}`);
    wx.navigateTo({
      url: `../addPothnter/addPothnter?IsPassportInfo=${this.data.info.IsPassportInfo}&IsBodyInfo=${this.data.info.IsBodyInfo}&IsStuDetailInfo=${this.data.info.IsStuDetailInfo}&IsShowInfo=${this.data.info.IsShowInfo}`
    })
  },
  //编辑参赛人
  editPothunter(o) {
    let id = o.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../addPothnter/addPothnter?IsPassportInfo=${this.data.info.IsPassportInfo}&IsBodyInfo=${this.data.info.IsBodyInfo}&IsStuDetailInfo=${this.data.info.IsStuDetailInfo}&IsShowInfo=${this.data.info.IsShowInfo}&id=${id}`
    })
  },
  //删除参赛人
  delPothunter(o) {
    let vm = this;
    let id = o.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success(res) {
        if (res.confirm) {
          app.$prot.getDelStudent({
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
              vm.data.pothunterData = vm.data.pothunterData.filter(value => {
                return value.id != id;
              });
              vm.setData({
                pothunterData: vm.data.pothunterData
              })
            }
          })
        }
      }
    })
  },
  addPothunter() {
    this.setData({
      addHostData: JSON.stringify(this.data.checkPothunter),
      pothunterHostData: JSON.stringify(this.data.pothunterData),
      isAdd: true
    })
    this.setData({
      isAddDown: true
    })
  },
  oninputs(o) {
    let val = o.detail.value;
    this.setData({
      [o.currentTarget.dataset.id]: val
    })
  },
  pickerOpen(o) {
    if (this.data.isOpen) {
      return false;
    }
    let name = o.currentTarget.dataset.name;
    let list = o.currentTarget.dataset.list;
    let hostval = this.data[name.split('.')[0]][name.split('.')[1]];
    let _val = 0;
    if (this.data[list].length == 0) {
      this.vTips('请先选择地址', '确定');
      return false;
    }
    this.data[list].forEach((value, index) => {
      if (value == hostval) {
        _val = index;
      }
    })
    console.log(_val);
    this.setData({
      openCNmae: name,
      openHostVal: hostval,
      isOpen: true,
      openData: this.data[list]
    })
    this.setData({
      isDown: true,
      openVal: [_val]
    })
  },
  closeOpen() {
    this.setData({
      isDown: false
    })
    setTimeout(() => {
      this.setData({
        [this.data.openCNmae]: this.data.openHostVal,
        isOpen: false,
        openData: []
      })
    }, 300)
  },
  saveOpen() {
    this.setData({
      isDown: false
    })
    this.getGetPrice();
    if(this.data.openCNmae == 'form.worksType' && this.data.form.worksType!='请选择'){
      this.activityClassfy('works');
    }else if(this.data.openCNmae == 'form.workForm' && this.data.form.workForm!='请选择'){
      this.activityClassfy('group');
    }
    setTimeout(() => {
      this.setData({
        isOpen: false,
      })
    }, 300)
  },
  openChange(o) {
    this.setData({
      [this.data.openCNmae]: this.data.openData[o.detail.value[0]]
    })
  },
  rndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
      rnd += Math.floor(Math.random() * 10);
    return rnd;
  },
  vTips(v, btn) {
    this.setData({
      vtext: v,
      vbtn: btn || '完善信息',
      isVShow: true
    });
  },
  //提交订单
  settleClick(fns) {
    let vm = this;
    if (!this.data.isproto) {
      this.vTips('请先阅读并同意协议', '确定');
      return false;
    }
    if (this.data.isstop) {
      this.vTips('正在计算价格，请稍后');
      vm.getGetPrice();
      return false;
    }
    let {
      worksType,
      workForm,
      name,
      date,
      coachName,
      coachPhone,
      // address
    } = this.data.form;
    if (((worksType == '请选择' || workForm == '请选择' || name == '' || date == '') && vm.data.info.IsShowInfo) || (this.data.gradeVal == '请选择' && !this.data.isgrade)) {
      this.vTips('报名信息不完善，是否立即完善信息？');
      return false;
    }
    if (this.data.activityClassID == "" && this.data.activityData.length > 0) {
      this.vTips('请选择报名类别');
      return false;
    }
    if (this.data.checkPothunter.length == 0) {
      this.vTips('请选择参赛人', '确定');
      return false;
    }
    if (coachPhone != '' && !/^1[3456789]\d{9}$/.test(coachPhone) && vm.data.info.IsTutor) {
      this.vTips('辅导老师电话格式有误', '确定');
      return false;
    }
    // if (vm.data._price_ == '0'){
    //   this.vTips('价格计算异常，请检查各字段是否按要求填写！', '确定');
    //   return false;
    // }
    wx.showLoading({
      title: '请稍后...',
    });

    wx.setStorage({
      key: 'applyFormData',
      data: this.data.form
    });

    let kindids = wx.getStorageSync('kindids');
    let _arr = [];

    // let addressID = '';
    // vm.data.addressJson.forEach(value => {
    //   if (value.address == vm.data.form.address) {
    //     addressID = value.id
    //   }
    // })
    this.data.checkPothunter.forEach(value => {
      let jsons = {
        StudentID: value.id,
        ClassfyID: kindids[vm.data.info.classfy_name],
        GradeID: vm.data.grade,
        ActivityClassID: vm.data.activityClassID || 0,
        ActivityID: vm.data.info.id,
        Price: Number(vm.data._price_),
        // AddressID: addressID
      };
      if (vm.data.info.IsShowInfo) {
        jsons.GroupID = vm.data.classfyGroupJson[vm.data.form.workForm];
        jsons.WorksClassfyID = vm.data.classfyWorksJson[vm.data.form.worksType];
      }
      _arr.push(jsons);
    });
    let models = {
      ActivityID: vm.data.info.id,
      Price: Number(vm.data._price_),
      Count: this.data.checkPothunter.length,
      Certificates: _arr,
    };
    if (vm.data.info.IsShowInfo) {
      models.WorksName = name;
      models.WorksTime = date;
    }
    if (vm.data.info.IsTutor) {
      models.Name = coachName;
      models.Phone = coachPhone;
    }
    console.log(models);
    wx.request({
      url: `${app.$prot.api}api/WechatPay/LogWrite?args=${JSON.stringify({ 'name': '报名表单提交的数据', 'content': models })}`,
      method: 'POST'
    });
    app.$prot.getAddOrder({
      data: models,
      success(data) {
        wx.hideLoading();
        wx.request({
          url: `${app.$prot.api}api/WechatPay/LogWrite?args=${JSON.stringify({ 'name': '订单提交成功', 'content': data })}`,
          method: 'POST'
        });
        if (typeof fns === 'function') {
          fns(data);
        } else {
          vm.setData({
            orderIds: data.data
          })
          vm.payments();
        }

      }
    })
  },
  payments() {
    wx.showLoading({
      title: '请稍后...',
    });
    if (this.data._price_ == 0) {
      app.$prot.getWeXcxPayZero({
        data: {
          ids: this.data.orderIds,
        },
        success(data) {
          wx.hideLoading();
          wx.request({
            url: `${app.$prot.api}api/WechatPay/LogWrite?args=${JSON.stringify({ 'name': '免费订单提交成功', 'content': data })}`,
            method: 'POST'
          });
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
        wx.request({
          url: `${app.$prot.api}api/WechatPay/LogWrite?args=${JSON.stringify({
            'name': '获取登录code成功', 'content': {
              code: res.code,
              orderIds: this.data.orderIds,
              price: this.data._price_
            } })}`,
          method: 'POST'
        });
        app.$prot.getWeXcxPay({
          data: {
            code: res.code,
            orderIds: this.data.orderIds,
            price: this.data._price_
          },
          success(data) {
            wx.hideLoading();
            wx.request({
              url: `${app.$prot.api}api/WechatPay/LogWrite?args=${JSON.stringify({
                'name': '获取支付相关参数成功', 'content': data
              })}`,
              method: 'POST'
            });
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
                wx.request({
                  url: `${app.$prot.api}api/WechatPay/LogWrite?args=${JSON.stringify({
                    'name': '支付成功', 'content': res
                  })}`,
                  method: 'POST'
                });
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
                wx.request({
                  url: `${app.$prot.api}api/WechatPay/LogWrite?args=${JSON.stringify({
                    'name': '支付失败', 'content': res
                  })}`,
                  method: 'POST'
                });
                wx.showToast({
                  title: '支付失败！',
                  mask: true,
                  image: '/assets/images/tip.png',
                  duration: 2000,
                  success: function () {
                    wx.redirectTo({
                      url: '../delayPayment/delayPayment'
                    })
                  }
                });
              }
            })
          }
        })
      }
    })
  },
  protocolLink() {
    wx.navigateTo({
      url: `../protocol/protocol`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1CB0F6',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });
    let vm = this;
    // let applyFormData = wx.getStorageSync('applyFormData');
    // if (applyFormData){
    //   vm.setData({
    //     form: applyFormData,
    //     success(){
    //       vm.getGetPrice();
    //     }
    //   })
    // }
    if (options.grade) {
      vm.setData({
        grade: options.grade,
        hostgrade: options.grade
      })
    } else {
      vm.setData({
        isgrade: false
      })
    }
    app.$prot.getActivityRegionAll({
      data: {
        id: options.id
      },
      success(data) {
        vm.setData({
          cityPickerValue: [data.data[0].id, data.data[0].childrens[0].ID, data.data[0].childrens[0].Childrens[0].ID]
        })
        vm.setData({
          provinces: data.data
        })
      }
    })
    app.$prot.getActivityDetail({
      data: {
        id: options.id
      },
      success(data) {
        let end_time_arr = data.data.end_time.split(':');
        data.data.end_time = end_time_arr[0] + ':' + end_time_arr[1];
        let start_time_arr = data.data.start_time.split(':');
        data.data.start_time = start_time_arr[0] + ':' + start_time_arr[1];
        console.log(data.data);
        // let _arr = [];
        // data.data.address.forEach((value, index) => {
        //   _arr.push(value.address)
        // })
        // console.log(data.data.address);
        vm.setData({
          applyid: options.id,
          info: data.data,
          // addressData: ['请选择', ..._arr],
          // addressJson: data.data.address
        });
        wx.hideLoading();
      }
    })
  },
  hiddens(str, frontLen, endLen) { //str：要进行隐藏的变量  frontLen: 前面需要保留几位    endLen: 后面需要保留几位
    var len = str.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
      xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getUserInfo() {
    let vm = this;
    app.$prot.getStudentsList({
      data: {
        pageNum: 0,
        pageSize: 999
      },
      success(data) {
        console.log(data.data);
        data.data = data.data.map(value => {
          value.checked = false;
          value.xxidentity = vm.hiddens(value.idcard, 3, 4);
          return value;
        });
        data.data = data.data.map((value, index) => {
          vm.data.pothunterData.forEach((item, i) => {
            if (item.id == value.id && item.checked) {
              value.checked = true;
              value.check = false;
            }
          })
          return value;
        })

        vm.setData({
          pothunterData: data.data
        })
      }
    })
  },
  getGetPrice() {
    let vm = this;
    let obj = {
      ProvinceID: this.data.cityPickerValue[0],
      CityID: this.data.cityPickerValue[1],
      CountyID: this.data.cityPickerValue[2],
      ActivityID: Number(this.data.applyid),
      GradeID: Number(this.data.grade),
      MaxUser: this.data.checkPothunter.length
    };
    if (vm.data.activityClassID) {
      obj.ActivityClassID = this.data.activityClassID;
    }
    if (vm.data.info.IsShowInfo) {
      obj.GroupID = this.data.classfyGroupJson[this.data.form.workForm];
      obj.WorksClassfyID = this.data.classfyWorksJson[this.data.form.worksType];
      obj.IsNotLive = false;
    }
    vm.setData({
      isstop: true
    })
    app.$prot.getGetPrices({
      data: obj,
      success(data) {
        if (data.data !== undefined) {
          vm.setData({
            _price_: (data.data * vm.data.checkPothunter.length) || 0,
            _price: data.data || 0,
          })
        }
        vm.setData({
          isstop: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let vm = this;
    if (!wx.getStorageSync('sessionKey')) {
      app.initend = function () {
        vm.getUserInfo();
      }
    } else {
      vm.getUserInfo();
    }
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