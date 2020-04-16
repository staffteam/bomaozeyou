//(Component构造器)
Component({
  //一些组件选项
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
    ,isimg:true
  },

  //组件的对外属性，属性设置中可包含三个字段,type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数    
  properties: {
    pages:{
      type:String,
      value:'0'
    },
    nums: {
      type: String,
      value: '0'
    }
  },
  //组件的内部数据，和 properties 一同用于组件的模版渲染
  data: {
    footerNavData: [
      { PicId: 0, title: '我要报名', onicon: '/assets/images/icon_nav_bm_on.png', officon:'/assets/images/icon_nav_bm_off.png' },
      { PicId: 1, title: '活动发布', onicon: '/assets/images/icon_nav_hd_on.png', officon: '/assets/images/icon_nav_hd_off.png' },
      { PicId: 2, title: '成绩查询', onicon: '/assets/images/icon_nav_cz_on.png', officon: '/assets/images/icon_nav_cz_off.png' },
      { PicId: 3, title: '我的参与', onicon: '/assets/images/icon_nav_wd_on.png', officon: '/assets/images/icon_nav_wd_off.png' }
    ],
    navlink:{
      0:'../index/index',
      1: '../article/article',
      2: '../grade/grade',
      3: '../center/center'
    }
  },
  //组件的方法，包括事件响应函数和任意的自定义方法 
  methods: {
    footerClick(o) {
      var picid = o.currentTarget.dataset.picid;
      wx.redirectTo({
        url: this.data.navlink[picid]
      })
    },
    isimgc(o){
      this.setData({
        isimg:false
      })
    }
  },
  ready(){
  },

})