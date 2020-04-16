const app = new getApp();
Component({
  properties: {
    value: {
      type: Array,
      value: [],
    },
    isShow: {
      type: Boolean,
      value: false,
      observer: "onShow"
    },
    issShow: {
      type: Boolean,
      value: false,
      observer: "onShow"
    },
    provinces:{
      type:Array,
      value:[],
      observer:"onValue"
    }
  },

  data: {
    provinces: [],
    showPicker: false,
    tempProvincePos: [0],
    tempCityPos: [0],
    tempAreaPos: [0],
  },
  attached: function() {
  },

  methods: {
    onTouchmask: function(event) {},
    onCacnelClick(e) {
      this.triggerEvent('cancelclick', {});
    },
    onSureClick(e) {
      var valueCode = [0, 0, 0];
      var valueName = ['', '', ''];
      if (this.data.provinces != null && this.data.provinces.length > this.data.tempProvincePos) {
        if (this.data.provinces[this.data.tempProvincePos].childrens != null && this.data.provinces[this.data.tempProvincePos].childrens.length > this.data.tempCityPos) {
          valueCode = [this.data.provinces[this.data.tempProvincePos].id, this.data.provinces[this.data.tempProvincePos].childrens[this.data.tempCityPos].ID, this.data.provinces[this.data.tempProvincePos].childrens[this.data.tempCityPos].Childrens[this.data.tempAreaPos].ID];
          valueName = [this.data.provinces[this.data.tempProvincePos].name, this.data.provinces[this.data.tempProvincePos].childrens[this.data.tempCityPos].Name, this.data.provinces[this.data.tempProvincePos].childrens[this.data.tempCityPos].Childrens[this.data.tempAreaPos].Name];
        } else{
          valueCode = [this.data.provinces[this.data.tempProvincePos].id, 0,0];
          valueName = [this.data.provinces[this.data.tempProvincePos].name, '',''];
        }
      }

      this.triggerEvent('sureclick', {
        valueCode: valueCode,
        valueName: valueName
      });

    },
    province_onChange: function(e) {
      this.setData({
        tempProvincePos: e.detail.value,
        tempCityPos: [0],
        tempAreaPos: [0]
      });
    },
    city_onChange: function(e) {
      this.setData({
        tempCityPos: e.detail.value,
        tempAreaPos: [0]
      });
    },
    area_onChange: function (e) {
      this.setData({
        tempAreaPos: e.detail.value
      });
    },
    onValue() {
      //通过传进来的省份城市的code计算对应的index
      var tempProvincePos = 0;
      for (var i = 0; i < this.data.provinces.length; i++) {
        var item = this.data.provinces[i];
        if (item.id == this.data.value[0]) {
          tempProvincePos = i;
          break;
        }
      }
      var tempCityPos = 0;
      if (this.data.provinces.length > tempProvincePos) {
        var cityList = this.data.provinces[tempProvincePos].childrens;
        for (var i = 0; i < cityList.length; i++) {
          var item = cityList[i];
          if (item.ID == this.data.value[1]) {
            tempCityPos = i;
            break;
          }
        }
      }
      var tempAreaPos =0;
      if (this.data.provinces.length > tempProvincePos) {
        var cityList = this.data.provinces[tempProvincePos].childrens[tempCityPos].Childrens;
        for (var i = 0; i < cityList.length; i++) {
          var item = cityList[i];
          if (item.ID == this.data.value[2]) {
            tempAreaPos = i;
            break;
          }
        }
      }
      console.log(tempProvincePos);
      this.setData({
        tempProvincePos: [tempProvincePos],
        tempCityPos: [tempCityPos],
        tempAreaPos: [tempAreaPos],
      });
    },
    onShow() {
      this.setData({
        showPicker: this.data.isShow
      });
      this.setData({
        isshow: this.data.issShow
      })
    }
  },
});