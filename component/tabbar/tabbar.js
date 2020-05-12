// component/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "color": "#aaaaaa",
    "selectedColor": "#1CB0F6",
    "borderStyle": "#e5e5e5",
    "list": [{
        "pagePath": "pages/index/index",
        "iconPath": "/assets/images/icon_nav_bm_off.png",
        "selectedIconPath": "/assets/images/icon_nav_bm_on.png",
        "text": "我要报名"
      },
      {
        "pagePath": "pages/article/article",
        "iconPath": "/assets/images/icon_nav_hd_off.png",
        "selectedIconPath": "/assets/images/icon_nav_hd_on.png",
        "text": "最新发布"
      },
      {
        "pagePath": "pages/grade/grade",
        "iconPath": "/assets/images/icon_nav_cz_off.png",
        "selectedIconPath": "/assets/images/icon_nav_cz_on.png",
        "text": "成绩查询"
      },
      {
        "pagePath": "pages/center/center",
        "iconPath": "/assets/images/icon_nav_wd_off.png",
        "selectedIconPath": "/assets/images/icon_nav_wd_on.png",
        "text": "我的参与"
      }
    ]
  },
  tabChange(e) {
    console.log('tab change', e)
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})