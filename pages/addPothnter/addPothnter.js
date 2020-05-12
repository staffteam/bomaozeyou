// pages/addPothnter/addPothnter.js
const app = new getApp();
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityCode: {
      "北京市": {
        "province_code": "110000",
        "index": 0,
        "city_list": {
          "市辖区": {
            "city_code": "110100",
            "index": 0
          }
        }
      },
      "天津市": {
        "province_code": "120000",
        "index": 1,
        "city_list": {
          "市辖区": {
            "city_code": "120100",
            "index": 0
          }
        }
      },
      "河北省": {
        "province_code": "130000",
        "index": 2,
        "city_list": {
          "石家庄市": {
            "city_code": "130100",
            "index": 0
          },
          "唐山市": {
            "city_code": "130200",
            "index": 1
          },
          "秦皇岛市": {
            "city_code": "130300",
            "index": 2
          },
          "邯郸市": {
            "city_code": "130400",
            "index": 3
          },
          "邢台市": {
            "city_code": "130500",
            "index": 4
          },
          "保定市": {
            "city_code": "130600",
            "index": 5
          },
          "张家口市": {
            "city_code": "130700",
            "index": 6
          },
          "承德市": {
            "city_code": "130800",
            "index": 7
          },
          "沧州市": {
            "city_code": "130900",
            "index": 8
          },
          "廊坊市": {
            "city_code": "131000",
            "index": 9
          },
          "衡水市": {
            "city_code": "131100",
            "index": 10
          },
          "省直辖县级行政区划": {
            "city_code": "139000",
            "index": 11
          }
        }
      },
      "山西省": {
        "province_code": "140000",
        "index": 3,
        "city_list": {
          "太原市": {
            "city_code": "140100",
            "index": 0
          },
          "大同市": {
            "city_code": "140200",
            "index": 1
          },
          "阳泉市": {
            "city_code": "140300",
            "index": 2
          },
          "长治市": {
            "city_code": "140400",
            "index": 3
          },
          "晋城市": {
            "city_code": "140500",
            "index": 4
          },
          "朔州市": {
            "city_code": "140600",
            "index": 5
          },
          "晋中市": {
            "city_code": "140700",
            "index": 6
          },
          "运城市": {
            "city_code": "140800",
            "index": 7
          },
          "忻州市": {
            "city_code": "140900",
            "index": 8
          },
          "临汾市": {
            "city_code": "141000",
            "index": 9
          },
          "吕梁市": {
            "city_code": "141100",
            "index": 10
          }
        }
      },
      "内蒙古自治区": {
        "province_code": "150000",
        "index": 4,
        "city_list": {
          "呼和浩特市": {
            "city_code": "150100",
            "index": 0
          },
          "包头市": {
            "city_code": "150200",
            "index": 1
          },
          "乌海市": {
            "city_code": "150300",
            "index": 2
          },
          "赤峰市": {
            "city_code": "150400",
            "index": 3
          },
          "通辽市": {
            "city_code": "150500",
            "index": 4
          },
          "鄂尔多斯市": {
            "city_code": "150600",
            "index": 5
          },
          "呼伦贝尔市": {
            "city_code": "150700",
            "index": 6
          },
          "巴彦淖尔市": {
            "city_code": "150800",
            "index": 7
          },
          "乌兰察布市": {
            "city_code": "150900",
            "index": 8
          },
          "兴安盟": {
            "city_code": "152200",
            "index": 9
          },
          "锡林郭勒盟": {
            "city_code": "152500",
            "index": 10
          },
          "阿拉善盟": {
            "city_code": "152900",
            "index": 11
          }
        }
      },
      "辽宁省": {
        "province_code": "210000",
        "index": 5,
        "city_list": {
          "沈阳市": {
            "city_code": "210100",
            "index": 0
          },
          "大连市": {
            "city_code": "210200",
            "index": 1
          },
          "鞍山市": {
            "city_code": "210300",
            "index": 2
          },
          "抚顺市": {
            "city_code": "210400",
            "index": 3
          },
          "本溪市": {
            "city_code": "210500",
            "index": 4
          },
          "丹东市": {
            "city_code": "210600",
            "index": 5
          },
          "锦州市": {
            "city_code": "210700",
            "index": 6
          },
          "营口市": {
            "city_code": "210800",
            "index": 7
          },
          "阜新市": {
            "city_code": "210900",
            "index": 8
          },
          "辽阳市": {
            "city_code": "211000",
            "index": 9
          },
          "盘锦市": {
            "city_code": "211100",
            "index": 10
          },
          "铁岭市": {
            "city_code": "211200",
            "index": 11
          },
          "朝阳市": {
            "city_code": "211300",
            "index": 12
          },
          "葫芦岛市": {
            "city_code": "211400",
            "index": 13
          }
        }
      },
      "吉林省": {
        "province_code": "220000",
        "index": 6,
        "city_list": {
          "长春市": {
            "city_code": "220100",
            "index": 0
          },
          "吉林市": {
            "city_code": "220200",
            "index": 1
          },
          "四平市": {
            "city_code": "220300",
            "index": 2
          },
          "辽源市": {
            "city_code": "220400",
            "index": 3
          },
          "通化市": {
            "city_code": "220500",
            "index": 4
          },
          "白山市": {
            "city_code": "220600",
            "index": 5
          },
          "松原市": {
            "city_code": "220700",
            "index": 6
          },
          "白城市": {
            "city_code": "220800",
            "index": 7
          },
          "延边朝鲜族自治州": {
            "city_code": "222400",
            "index": 8
          }
        }
      },
      "黑龙江省": {
        "province_code": "230000",
        "index": 7,
        "city_list": {
          "哈尔滨市": {
            "city_code": "230100",
            "index": 0
          },
          "齐齐哈尔市": {
            "city_code": "230200",
            "index": 1
          },
          "鸡西市": {
            "city_code": "230300",
            "index": 2
          },
          "鹤岗市": {
            "city_code": "230400",
            "index": 3
          },
          "双鸭山市": {
            "city_code": "230500",
            "index": 4
          },
          "大庆市": {
            "city_code": "230600",
            "index": 5
          },
          "伊春市": {
            "city_code": "230700",
            "index": 6
          },
          "佳木斯市": {
            "city_code": "230800",
            "index": 7
          },
          "七台河市": {
            "city_code": "230900",
            "index": 8
          },
          "牡丹江市": {
            "city_code": "231000",
            "index": 9
          },
          "黑河市": {
            "city_code": "231100",
            "index": 10
          },
          "绥化市": {
            "city_code": "231200",
            "index": 11
          },
          "大兴安岭地区": {
            "city_code": "232700",
            "index": 12
          }
        }
      },
      "上海市": {
        "province_code": "310000",
        "index": 8,
        "city_list": {
          "市辖区": {
            "city_code": "310100",
            "index": 0
          }
        }
      },
      "江苏省": {
        "province_code": "320000",
        "index": 9,
        "city_list": {
          "南京市": {
            "city_code": "320100",
            "index": 0
          },
          "无锡市": {
            "city_code": "320200",
            "index": 1
          },
          "徐州市": {
            "city_code": "320300",
            "index": 2
          },
          "常州市": {
            "city_code": "320400",
            "index": 3
          },
          "苏州市": {
            "city_code": "320500",
            "index": 4
          },
          "南通市": {
            "city_code": "320600",
            "index": 5
          },
          "连云港市": {
            "city_code": "320700",
            "index": 6
          },
          "淮安市": {
            "city_code": "320800",
            "index": 7
          },
          "盐城市": {
            "city_code": "320900",
            "index": 8
          },
          "扬州市": {
            "city_code": "321000",
            "index": 9
          },
          "镇江市": {
            "city_code": "321100",
            "index": 10
          },
          "泰州市": {
            "city_code": "321200",
            "index": 11
          },
          "宿迁市": {
            "city_code": "321300",
            "index": 12
          }
        }
      },
      "浙江省": {
        "province_code": "330000",
        "index": 10,
        "city_list": {
          "杭州市": {
            "city_code": "330100",
            "index": 0
          },
          "宁波市": {
            "city_code": "330200",
            "index": 1
          },
          "温州市": {
            "city_code": "330300",
            "index": 2
          },
          "嘉兴市": {
            "city_code": "330400",
            "index": 3
          },
          "湖州市": {
            "city_code": "330500",
            "index": 4
          },
          "绍兴市": {
            "city_code": "330600",
            "index": 5
          },
          "金华市": {
            "city_code": "330700",
            "index": 6
          },
          "衢州市": {
            "city_code": "330800",
            "index": 7
          },
          "舟山市": {
            "city_code": "330900",
            "index": 8
          },
          "台州市": {
            "city_code": "331000",
            "index": 9
          },
          "丽水市": {
            "city_code": "331100",
            "index": 10
          }
        }
      },
      "安徽省": {
        "province_code": "340000",
        "index": 11,
        "city_list": {
          "合肥市": {
            "city_code": "340100",
            "index": 0
          },
          "芜湖市": {
            "city_code": "340200",
            "index": 1
          },
          "蚌埠市": {
            "city_code": "340300",
            "index": 2
          },
          "淮南市": {
            "city_code": "340400",
            "index": 3
          },
          "马鞍山市": {
            "city_code": "340500",
            "index": 4
          },
          "淮北市": {
            "city_code": "340600",
            "index": 5
          },
          "铜陵市": {
            "city_code": "340700",
            "index": 6
          },
          "安庆市": {
            "city_code": "340800",
            "index": 7
          },
          "黄山市": {
            "city_code": "341000",
            "index": 8
          },
          "滁州市": {
            "city_code": "341100",
            "index": 9
          },
          "阜阳市": {
            "city_code": "341200",
            "index": 10
          },
          "宿州市": {
            "city_code": "341300",
            "index": 11
          },
          "六安市": {
            "city_code": "341500",
            "index": 12
          },
          "亳州市": {
            "city_code": "341600",
            "index": 13
          },
          "池州市": {
            "city_code": "341700",
            "index": 14
          },
          "宣城市": {
            "city_code": "341800",
            "index": 15
          }
        }
      },
      "福建省": {
        "province_code": "350000",
        "index": 12,
        "city_list": {
          "福州市": {
            "city_code": "350100",
            "index": 0
          },
          "厦门市": {
            "city_code": "350200",
            "index": 1
          },
          "莆田市": {
            "city_code": "350300",
            "index": 2
          },
          "三明市": {
            "city_code": "350400",
            "index": 3
          },
          "泉州市": {
            "city_code": "350500",
            "index": 4
          },
          "漳州市": {
            "city_code": "350600",
            "index": 5
          },
          "南平市": {
            "city_code": "350700",
            "index": 6
          },
          "龙岩市": {
            "city_code": "350800",
            "index": 7
          },
          "宁德市": {
            "city_code": "350900",
            "index": 8
          }
        }
      },
      "江西省": {
        "province_code": "360000",
        "index": 13,
        "city_list": {
          "南昌市": {
            "city_code": "360100",
            "index": 0
          },
          "景德镇市": {
            "city_code": "360200",
            "index": 1
          },
          "萍乡市": {
            "city_code": "360300",
            "index": 2
          },
          "九江市": {
            "city_code": "360400",
            "index": 3
          },
          "新余市": {
            "city_code": "360500",
            "index": 4
          },
          "鹰潭市": {
            "city_code": "360600",
            "index": 5
          },
          "赣州市": {
            "city_code": "360700",
            "index": 6
          },
          "吉安市": {
            "city_code": "360800",
            "index": 7
          },
          "宜春市": {
            "city_code": "360900",
            "index": 8
          },
          "抚州市": {
            "city_code": "361000",
            "index": 9
          },
          "上饶市": {
            "city_code": "361100",
            "index": 10
          }
        }
      },
      "山东省": {
        "province_code": "370000",
        "index": 14,
        "city_list": {
          "济南市": {
            "city_code": "370100",
            "index": 0
          },
          "青岛市": {
            "city_code": "370200",
            "index": 1
          },
          "淄博市": {
            "city_code": "370300",
            "index": 2
          },
          "枣庄市": {
            "city_code": "370400",
            "index": 3
          },
          "东营市": {
            "city_code": "370500",
            "index": 4
          },
          "烟台市": {
            "city_code": "370600",
            "index": 5
          },
          "潍坊市": {
            "city_code": "370700",
            "index": 6
          },
          "济宁市": {
            "city_code": "370800",
            "index": 7
          },
          "泰安市": {
            "city_code": "370900",
            "index": 8
          },
          "威海市": {
            "city_code": "371000",
            "index": 9
          },
          "日照市": {
            "city_code": "371100",
            "index": 10
          },
          "莱芜市": {
            "city_code": "371200",
            "index": 11
          },
          "临沂市": {
            "city_code": "371300",
            "index": 12
          },
          "德州市": {
            "city_code": "371400",
            "index": 13
          },
          "聊城市": {
            "city_code": "371500",
            "index": 14
          },
          "滨州市": {
            "city_code": "371600",
            "index": 15
          },
          "菏泽市": {
            "city_code": "371700",
            "index": 16
          }
        }
      },
      "河南省": {
        "province_code": "410000",
        "index": 15,
        "city_list": {
          "郑州市": {
            "city_code": "410100",
            "index": 0
          },
          "开封市": {
            "city_code": "410200",
            "index": 1
          },
          "洛阳市": {
            "city_code": "410300",
            "index": 2
          },
          "平顶山市": {
            "city_code": "410400",
            "index": 3
          },
          "安阳市": {
            "city_code": "410500",
            "index": 4
          },
          "鹤壁市": {
            "city_code": "410600",
            "index": 5
          },
          "新乡市": {
            "city_code": "410700",
            "index": 6
          },
          "焦作市": {
            "city_code": "410800",
            "index": 7
          },
          "濮阳市": {
            "city_code": "410900",
            "index": 8
          },
          "许昌市": {
            "city_code": "411000",
            "index": 9
          },
          "漯河市": {
            "city_code": "411100",
            "index": 10
          },
          "三门峡市": {
            "city_code": "411200",
            "index": 11
          },
          "南阳市": {
            "city_code": "411300",
            "index": 12
          },
          "商丘市": {
            "city_code": "411400",
            "index": 13
          },
          "信阳市": {
            "city_code": "411500",
            "index": 14
          },
          "周口市": {
            "city_code": "411600",
            "index": 15
          },
          "驻马店市": {
            "city_code": "411700",
            "index": 16
          },
          "省直辖县级行政区划": {
            "city_code": "419000",
            "index": 17
          }
        }
      },
      "湖北省": {
        "province_code": "420000",
        "index": 16,
        "city_list": {
          "武汉市": {
            "city_code": "420100",
            "index": 0
          },
          "黄石市": {
            "city_code": "420200",
            "index": 1
          },
          "十堰市": {
            "city_code": "420300",
            "index": 2
          },
          "宜昌市": {
            "city_code": "420500",
            "index": 3
          },
          "襄阳市": {
            "city_code": "420600",
            "index": 4
          },
          "鄂州市": {
            "city_code": "420700",
            "index": 5
          },
          "荆门市": {
            "city_code": "420800",
            "index": 6
          },
          "孝感市": {
            "city_code": "420900",
            "index": 7
          },
          "荆州市": {
            "city_code": "421000",
            "index": 8
          },
          "黄冈市": {
            "city_code": "421100",
            "index": 9
          },
          "咸宁市": {
            "city_code": "421200",
            "index": 10
          },
          "随州市": {
            "city_code": "421300",
            "index": 11
          },
          "恩施土家族苗族自治州": {
            "city_code": "422800",
            "index": 12
          },
          "省直辖县级行政区划": {
            "city_code": "429000",
            "index": 13
          }
        }
      },
      "湖南省": {
        "province_code": "430000",
        "index": 17,
        "city_list": {
          "长沙市": {
            "city_code": "430100",
            "index": 0
          },
          "株洲市": {
            "city_code": "430200",
            "index": 1
          },
          "湘潭市": {
            "city_code": "430300",
            "index": 2
          },
          "衡阳市": {
            "city_code": "430400",
            "index": 3
          },
          "邵阳市": {
            "city_code": "430500",
            "index": 4
          },
          "岳阳市": {
            "city_code": "430600",
            "index": 5
          },
          "常德市": {
            "city_code": "430700",
            "index": 6
          },
          "张家界市": {
            "city_code": "430800",
            "index": 7
          },
          "益阳市": {
            "city_code": "430900",
            "index": 8
          },
          "郴州市": {
            "city_code": "431000",
            "index": 9
          },
          "永州市": {
            "city_code": "431100",
            "index": 10
          },
          "怀化市": {
            "city_code": "431200",
            "index": 11
          },
          "娄底市": {
            "city_code": "431300",
            "index": 12
          },
          "湘西土家族苗族自治州": {
            "city_code": "433100",
            "index": 13
          }
        }
      },
      "广东省": {
        "province_code": "440000",
        "index": 18,
        "city_list": {
          "广州市": {
            "city_code": "440100",
            "index": 0
          },
          "韶关市": {
            "city_code": "440200",
            "index": 1
          },
          "深圳市": {
            "city_code": "440300",
            "index": 2
          },
          "珠海市": {
            "city_code": "440400",
            "index": 3
          },
          "汕头市": {
            "city_code": "440500",
            "index": 4
          },
          "佛山市": {
            "city_code": "440600",
            "index": 5
          },
          "江门市": {
            "city_code": "440700",
            "index": 6
          },
          "湛江市": {
            "city_code": "440800",
            "index": 7
          },
          "茂名市": {
            "city_code": "440900",
            "index": 8
          },
          "肇庆市": {
            "city_code": "441200",
            "index": 9
          },
          "惠州市": {
            "city_code": "441300",
            "index": 10
          },
          "梅州市": {
            "city_code": "441400",
            "index": 11
          },
          "汕尾市": {
            "city_code": "441500",
            "index": 12
          },
          "河源市": {
            "city_code": "441600",
            "index": 13
          },
          "阳江市": {
            "city_code": "441700",
            "index": 14
          },
          "清远市": {
            "city_code": "441800",
            "index": 15
          },
          "东莞市": {
            "city_code": "441900",
            "index": 16
          },
          "中山市": {
            "city_code": "442000",
            "index": 17
          },
          "潮州市": {
            "city_code": "445100",
            "index": 18
          },
          "揭阳市": {
            "city_code": "445200",
            "index": 19
          },
          "云浮市": {
            "city_code": "445300",
            "index": 20
          }
        }
      },
      "广西壮族自治区": {
        "province_code": "450000",
        "index": 19,
        "city_list": {
          "南宁市": {
            "city_code": "450100",
            "index": 0
          },
          "柳州市": {
            "city_code": "450200",
            "index": 1
          },
          "桂林市": {
            "city_code": "450300",
            "index": 2
          },
          "梧州市": {
            "city_code": "450400",
            "index": 3
          },
          "北海市": {
            "city_code": "450500",
            "index": 4
          },
          "防城港市": {
            "city_code": "450600",
            "index": 5
          },
          "钦州市": {
            "city_code": "450700",
            "index": 6
          },
          "贵港市": {
            "city_code": "450800",
            "index": 7
          },
          "玉林市": {
            "city_code": "450900",
            "index": 8
          },
          "百色市": {
            "city_code": "451000",
            "index": 9
          },
          "贺州市": {
            "city_code": "451100",
            "index": 10
          },
          "河池市": {
            "city_code": "451200",
            "index": 11
          },
          "来宾市": {
            "city_code": "451300",
            "index": 12
          },
          "崇左市": {
            "city_code": "451400",
            "index": 13
          }
        }
      },
      "海南省": {
        "province_code": "460000",
        "index": 20,
        "city_list": {
          "海口市": {
            "city_code": "460100",
            "index": 0
          },
          "三亚市": {
            "city_code": "460200",
            "index": 1
          },
          "三沙市": {
            "city_code": "460300",
            "index": 2
          },
          "儋州市": {
            "city_code": "460400",
            "index": 3
          },
          "省直辖县级行政区划": {
            "city_code": "469000",
            "index": 4
          }
        }
      },
      "重庆市": {
        "province_code": "500000",
        "index": 21,
        "city_list": {
          "市辖区": {
            "city_code": "500100",
            "index": 0
          },
          "县": {
            "city_code": "500200",
            "index": 1
          }
        }
      },
      "四川省": {
        "province_code": "510000",
        "index": 22,
        "city_list": {
          "成都市": {
            "city_code": "510100",
            "index": 0
          },
          "自贡市": {
            "city_code": "510300",
            "index": 1
          },
          "攀枝花市": {
            "city_code": "510400",
            "index": 2
          },
          "泸州市": {
            "city_code": "510500",
            "index": 3
          },
          "德阳市": {
            "city_code": "510600",
            "index": 4
          },
          "绵阳市": {
            "city_code": "510700",
            "index": 5
          },
          "广元市": {
            "city_code": "510800",
            "index": 6
          },
          "遂宁市": {
            "city_code": "510900",
            "index": 7
          },
          "内江市": {
            "city_code": "511000",
            "index": 8
          },
          "乐山市": {
            "city_code": "511100",
            "index": 9
          },
          "南充市": {
            "city_code": "511300",
            "index": 10
          },
          "眉山市": {
            "city_code": "511400",
            "index": 11
          },
          "宜宾市": {
            "city_code": "511500",
            "index": 12
          },
          "广安市": {
            "city_code": "511600",
            "index": 13
          },
          "达州市": {
            "city_code": "511700",
            "index": 14
          },
          "雅安市": {
            "city_code": "511800",
            "index": 15
          },
          "巴中市": {
            "city_code": "511900",
            "index": 16
          },
          "资阳市": {
            "city_code": "512000",
            "index": 17
          },
          "阿坝藏族羌族自治州": {
            "city_code": "513200",
            "index": 18
          },
          "甘孜藏族自治州": {
            "city_code": "513300",
            "index": 19
          },
          "凉山彝族自治州": {
            "city_code": "513400",
            "index": 20
          }
        }
      },
      "贵州省": {
        "province_code": "520000",
        "index": 23,
        "city_list": {
          "贵阳市": {
            "city_code": "520100",
            "index": 0
          },
          "六盘水市": {
            "city_code": "520200",
            "index": 1
          },
          "遵义市": {
            "city_code": "520300",
            "index": 2
          },
          "安顺市": {
            "city_code": "520400",
            "index": 3
          },
          "毕节市": {
            "city_code": "520500",
            "index": 4
          },
          "铜仁市": {
            "city_code": "520600",
            "index": 5
          },
          "黔西南布依族苗族自治州": {
            "city_code": "522300",
            "index": 6
          },
          "黔东南苗族侗族自治州": {
            "city_code": "522600",
            "index": 7
          },
          "黔南布依族苗族自治州": {
            "city_code": "522700",
            "index": 8
          }
        }
      },
      "云南省": {
        "province_code": "530000",
        "index": 24,
        "city_list": {
          "昆明市": {
            "city_code": "530100",
            "index": 0
          },
          "曲靖市": {
            "city_code": "530300",
            "index": 1
          },
          "玉溪市": {
            "city_code": "530400",
            "index": 2
          },
          "保山市": {
            "city_code": "530500",
            "index": 3
          },
          "昭通市": {
            "city_code": "530600",
            "index": 4
          },
          "丽江市": {
            "city_code": "530700",
            "index": 5
          },
          "普洱市": {
            "city_code": "530800",
            "index": 6
          },
          "临沧市": {
            "city_code": "530900",
            "index": 7
          },
          "楚雄彝族自治州": {
            "city_code": "532300",
            "index": 8
          },
          "红河哈尼族彝族自治州": {
            "city_code": "532500",
            "index": 9
          },
          "文山壮族苗族自治州": {
            "city_code": "532600",
            "index": 10
          },
          "西双版纳傣族自治州": {
            "city_code": "532800",
            "index": 11
          },
          "大理白族自治州": {
            "city_code": "532900",
            "index": 12
          },
          "德宏傣族景颇族自治州": {
            "city_code": "533100",
            "index": 13
          },
          "怒江傈僳族自治州": {
            "city_code": "533300",
            "index": 14
          },
          "迪庆藏族自治州": {
            "city_code": "533400",
            "index": 15
          }
        }
      },
      "西藏自治区": {
        "province_code": "540000",
        "index": 25,
        "city_list": {
          "拉萨市": {
            "city_code": "540100",
            "index": 0
          },
          "日喀则市": {
            "city_code": "540200",
            "index": 1
          },
          "昌都市": {
            "city_code": "540300",
            "index": 2
          },
          "林芝市": {
            "city_code": "540400",
            "index": 3
          },
          "山南市": {
            "city_code": "540500",
            "index": 4
          },
          "那曲地区": {
            "city_code": "542400",
            "index": 5
          },
          "阿里地区": {
            "city_code": "542500",
            "index": 6
          }
        }
      },
      "陕西省": {
        "province_code": "610000",
        "index": 26,
        "city_list": {
          "西安市": {
            "city_code": "610100",
            "index": 0
          },
          "铜川市": {
            "city_code": "610200",
            "index": 1
          },
          "宝鸡市": {
            "city_code": "610300",
            "index": 2
          },
          "咸阳市": {
            "city_code": "610400",
            "index": 3
          },
          "渭南市": {
            "city_code": "610500",
            "index": 4
          },
          "延安市": {
            "city_code": "610600",
            "index": 5
          },
          "汉中市": {
            "city_code": "610700",
            "index": 6
          },
          "榆林市": {
            "city_code": "610800",
            "index": 7
          },
          "安康市": {
            "city_code": "610900",
            "index": 8
          },
          "商洛市": {
            "city_code": "611000",
            "index": 9
          }
        }
      },
      "甘肃省": {
        "province_code": "620000",
        "index": 27,
        "city_list": {
          "兰州市": {
            "city_code": "620100",
            "index": 0
          },
          "嘉峪关市": {
            "city_code": "620200",
            "index": 1
          },
          "金昌市": {
            "city_code": "620300",
            "index": 2
          },
          "白银市": {
            "city_code": "620400",
            "index": 3
          },
          "天水市": {
            "city_code": "620500",
            "index": 4
          },
          "武威市": {
            "city_code": "620600",
            "index": 5
          },
          "张掖市": {
            "city_code": "620700",
            "index": 6
          },
          "平凉市": {
            "city_code": "620800",
            "index": 7
          },
          "酒泉市": {
            "city_code": "620900",
            "index": 8
          },
          "庆阳市": {
            "city_code": "621000",
            "index": 9
          },
          "定西市": {
            "city_code": "621100",
            "index": 10
          },
          "陇南市": {
            "city_code": "621200",
            "index": 11
          },
          "临夏回族自治州": {
            "city_code": "622900",
            "index": 12
          },
          "甘南藏族自治州": {
            "city_code": "623000",
            "index": 13
          }
        }
      },
      "青海省": {
        "province_code": "630000",
        "index": 28,
        "city_list": {
          "西宁市": {
            "city_code": "630100",
            "index": 0
          },
          "海东市": {
            "city_code": "630200",
            "index": 1
          },
          "海北藏族自治州": {
            "city_code": "632200",
            "index": 2
          },
          "黄南藏族自治州": {
            "city_code": "632300",
            "index": 3
          },
          "海南藏族自治州": {
            "city_code": "632500",
            "index": 4
          },
          "果洛藏族自治州": {
            "city_code": "632600",
            "index": 5
          },
          "玉树藏族自治州": {
            "city_code": "632700",
            "index": 6
          },
          "海西蒙古族藏族自治州": {
            "city_code": "632800",
            "index": 7
          }
        }
      },
      "宁夏回族自治区": {
        "province_code": "640000",
        "index": 29,
        "city_list": {
          "银川市": {
            "city_code": "640100",
            "index": 0
          },
          "石嘴山市": {
            "city_code": "640200",
            "index": 1
          },
          "吴忠市": {
            "city_code": "640300",
            "index": 2
          },
          "固原市": {
            "city_code": "640400",
            "index": 3
          },
          "中卫市": {
            "city_code": "640500",
            "index": 4
          }
        }
      },
      "新疆维吾尔自治区": {
        "province_code": "650000",
        "index": 30,
        "city_list": {
          "乌鲁木齐市": {
            "city_code": "650100",
            "index": 0
          },
          "克拉玛依市": {
            "city_code": "650200",
            "index": 1
          },
          "吐鲁番市": {
            "city_code": "650400",
            "index": 2
          },
          "哈密市": {
            "city_code": "650500",
            "index": 3
          },
          "昌吉回族自治州": {
            "city_code": "652300",
            "index": 4
          },
          "博尔塔拉蒙古自治州": {
            "city_code": "652700",
            "index": 5
          },
          "巴音郭楞蒙古自治州": {
            "city_code": "652800",
            "index": 6
          },
          "阿克苏地区": {
            "city_code": "652900",
            "index": 7
          },
          "克孜勒苏柯尔克孜自治州": {
            "city_code": "653000",
            "index": 8
          },
          "喀什地区": {
            "city_code": "653100",
            "index": 9
          },
          "和田地区": {
            "city_code": "653200",
            "index": 10
          },
          "伊犁哈萨克自治州": {
            "city_code": "654000",
            "index": 11
          },
          "塔城地区": {
            "city_code": "654200",
            "index": 12
          },
          "阿勒泰地区": {
            "city_code": "654300",
            "index": 13
          },
          "自治区直辖县级行政区划": {
            "city_code": "659000",
            "index": 14
          }
        }
      },
      "台湾省": {
        "province_code": "710000",
        "index": 31,
        "city_list": {
          "台湾": {
            "city_code": "710100",
            "index": 0
          }
        }
      },
      "香港特别行政区": {
        "province_code": "810000",
        "index": 32,
        "city_list": {
          "香港": {
            "city_code": "810100",
            "index": 0
          }
        }
      },
      "澳门特别行政区": {
        "province_code": "820000",
        "index": 33,
        "city_list": {
          "澳门": {
            "city_code": "820100",
            "index": 0
          }
        }
      }
    },
    city: '请选择',
    issShow3: false,
    cityPickerValue: [0, 0],
    cityPickerIsShow: false,
    applyListType: {},
    imgUrl: "",
    form: {
      ID: 0,
      Name: "", // 姓名
      Sex: '请选择', // 性别
      Age: "", // 年龄
      Nation: "", // 民族
      School: "", // 学校
      PicID: "", // 照片
      IDCardNo: "", // 身份证号
      Class: "请选择", // 班级
      Phone: "", // 电话
      Address: "", //地址
      NamePinying: "", // 姓名拼音
      Country: "", // 国籍
      Birthplace: "", //出生地
      HuKouAddress: "", //户口所在地
      WechatNo: "", // 微信号
      Email: "", //邮箱
      GuardianName: "", //监护人姓名
      GuardianPhone: "", //监护人电话
      Awards: "", //获过的奖项
      Height: "", //身高
      Weight: "", //体重
      BodyStatus: "", //身体状况
      IsDisease: "", //特殊疾病
      PassportNo: "",
      PassportIssueTime: "请选择",
      PassportIssueAt: "",
      PassportExpiryTime: "请选择",
    },
    ClassData: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    SexData: ['请选择', '男', '女'],
    isOpen: false,
    openData: [],
    openCNmae: '',
    openHostVal: '',
    vtext: '报名信息不完善，是否立即完善信息？',
    vbtn: '完善信息',
    isVShow: false,
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    isshow: false,
    datePickerValue2: ['', '', ''],
    datePickerIsShow2: false,
    isshow2: false,
    isData: {
      IsPassportInfo: false,
      IsBodyInfo: false,
      IsStuDetailInfo: false,
      IsShowInfo: false,
      IsSchool:false
    }
  },
  showDatePicker: function (e) {
    this.setData({
      datePickerIsShow: true,
      isshow: true
    });
  },
  /**
   * 城市选择确认
   */
  cityPickerOnSureClick: function (e) {
    this.setData({
      issShow3: false
    })
    console.log(e.detail.valueCode);
    this.setData({
      city: e.detail.valueName[0] + ' ' + e.detail.valueName[1],
      cityPickerIsShow: false,
    });

  },
  /**
   * 城市选择取消
   */
  cityPickerOnCancelClick: function (event) {
    this.setData({
      issShow3: false
    })
    console.log(event);
    this.setData({
      cityPickerIsShow: false,
    });
  },
  showCityPicker() {
    // this.data.cityPicker.show()
    this.setData({
      cityPickerIsShow: true,
      issShow3: true,
      cityPickerValue: this.data.cityPickerValue
    });
  },
  datePickerOnSureClick: function (e) {
    this.setData({
      isshow: false
    })
    setTimeout(() => {
      this.setData({
        ['form.PassportExpiryTime']: `${e.detail.value[0]}/${e.detail.value[1]}/${e.detail.value[2]}`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      });
    }, 100)
  },

  datePickerOnCancelClick: function (event) {
    this.setData({
      isshow: false
    })
    setTimeout(() => {
      this.setData({
        datePickerIsShow: false,
      });
    }, 100)
  },

  showDatePicker2: function (e) {
    this.setData({
      datePickerIsShow2: true,
      isshow2: true
    });
  },

  datePickerOnSureClick2: function (e) {
    this.setData({
      isshow2: false
    })
    setTimeout(() => {
      this.setData({
        ['form.PassportIssueTime']: `${e.detail.value[0]}/${e.detail.value[1]}/${e.detail.value[2]}`,
        datePickerValue2: e.detail.value,
        datePickerIsShow2: false,
      });
    }, 100)
  },

  datePickerOnCancelClick2: function (event) {
    this.setData({
      isshow2: false
    })
    setTimeout(() => {
      this.setData({
        datePickerIsShow2: false,
      });
    }, 100)
  },

  onInputs(o) {
    let val = o.detail.value;
    this.setData({
      [o.currentTarget.dataset.id]: val
    })
  },
  openChange(o) {
    this.setData({
      [this.data.openCNmae]: this.data.openData[o.detail.value[0]]
    })
  },
  closeOpen() {
    this.setData({
      isDown: false
    })
    setTimeout(() => {
      this.setData({
        isOpen: false,
      })
    }, 100)
  },
  saveOpen() {
    this.setData({
      isDown: false
    })
    setTimeout(() => {
      this.setData({
        isOpen: false,
      })
    }, 100)
  },
  pickerOpen(o) {
    if (this.data.isOpen) {
      return false;
    }
    let name = o.currentTarget.dataset.name;
    let list = o.currentTarget.dataset.list;
    let hostval = this.data[name.split('.')[0]][name.split('.')[1]];
    let _val = 0;
    this.data[list].forEach((value, index) => {
      if (value == hostval) {
        _val = index;
      }
    })
    this.setData({
      openCNmae: name,
      openHostVal: hostval,
      isOpen: true,
      openData: this.data[list],
      openVal: [_val]
    })
    this.setData({
      isDown: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    // if (options.typeid){
    //   app.$prot.getActivity({
    //     success: data => {
    //       let kindids = {};
    //       data.data.forEach(value => {
    //         kindids[value.name] = value.id;
    //       })
    //       this.setData({
    //         applyListType: kindids,
    //         typeid: kindids[options.typeid]
    //       });
    //       console.log(kindids);
    //     }
    //   })
    // }
    this.setData({
      ['isData.IsPassportInfo']: options.IsPassportInfo == 'true',
      ['isData.IsBodyInfo']: options.IsBodyInfo == 'true',
      ['isData.IsStuDetailInfo']: options.IsStuDetailInfo == 'true',
      ['isData.IsShowInfo']: options.IsShowInfo == 'true',
      ['isData.IsSchool']: options.IsSchool == 'true'
    });
    if (options.id) {
      app.$prot.getUserDetalis({
        data: {
          id: options.id
        },
        success(data) {
          console.log(data.data);
          let {
            address,
            age,
            awards,
            birthplace,
            class_info,
            country,
            email,
            guardianname,
            guardianphone,
            hukouaddress,
            id,
            id_card_no,
            img_url,
            name,
            namepinying,
            nation,
            passport_expiry_time,
            passport_issue_at,
            passport_issue_time,
            passport_no,
            phone,
            school,
            sex,
            wechatno,
            height,
            weight,
            bodyStatus,
            isDisease,
            img_id
          } = data.data;
          let issue_time = passport_issue_time != '' && passport_issue_time != null ? passport_issue_time.split(' ')[0] : '请选择'
          let expiry_time = passport_expiry_time != '' && passport_expiry_time != null ? passport_expiry_time.split(' ')[0] : '请选择'
          let _address = '';
          let _city = '请选择';
          let _cityPickerValue = [0, 0];
          if (address != '' && address.split(' ').length > 1) {
            _address = address.replace(address.split(' ')[0], '').replace(' ' + address.split(' ')[1] + ' ', '');
            _city = address.split(' ')[0] + ' ' + address.split(' ')[1];
            _cityPickerValue = [vm.data.cityCode[address.split(' ')[0]].index, vm.data.cityCode[address.split(' ')[0]].city_list[address.split(' ')[1]].index]
          }
          let _data = {
            ID: id,
            Name: name, // 姓名
            Sex: sex == "True" ? "男" : "女", // 性别
            Age: age, // 年龄
            Nation: nation, // 民族
            School: school, // 学校
            PicID: img_id, // 照片
            IDCardNo: id_card_no, // 身份证号
            Class: class_info, // 班级
            Phone: phone, // 电话
            Address: _address, //地址
            NamePinying: namepinying, // 姓名拼音
            Country: country, // 国籍
            Birthplace: birthplace, //出生地
            HuKouAddress: hukouaddress, //户口所在地
            WechatNo: wechatno, // 微信号
            Email: email, //邮箱
            GuardianName: guardianname, //监护人姓名
            GuardianPhone: guardianphone, //监护人电话
            Awards: awards, //获过的奖项
            Height: height, //身高
            Weight: weight, //体重
            BodyStatus: bodyStatus, //身体状况
            IsDisease: isDisease, //特殊疾病
            PassportNo: passport_no,
            PassportIssueTime: issue_time,
            PassportIssueAt: passport_issue_at,
            PassportExpiryTime: expiry_time
          }
          let imgUrl = img_url;
          vm.setData({
            form: _data,
            city: _city,
            cityPickerValue: _cityPickerValue,
            imgUrl: app.$prot.api + imgUrl,
            datePickerValue: issue_time != '请选择' ? [issue_time.split('/')[0], issue_time.split('/')[1], issue_time.split('/')[2]] : ['', '', ''],
            datePickerValue2: expiry_time != '请选择' ? [expiry_time.split('/')[0], expiry_time.split('/')[1], expiry_time.split('/')[2]] : ['', '', '']
          })
        }
      })
    }
  },
  // 点击头像 显示底部菜单
  clickImage: function () {
    var vm = this;
    let list = ['上传头像', '查看头像'];
    if (this.data.imgUrl == "") {
      list = ['上传头像']
    }
    wx.showActionSheet({
      itemList: list,
      success(res) {
        if (res.tapIndex == 0) {
          vm.changeImage();
        } else {
          vm.viewImage();
        }
      },
      fail(res) {

      }
    })
  },
  // 查看原图
  viewImage: function () {
    var vm = this;
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [vm.data.imgUrl] // 需要预览的图片http链接列表
    })
  },
  // 上传头像
  changeImage: function () {
    var vm = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中...',
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片，只有一张图片获取下标为0
        var tempFilePaths = res.tempFilePaths[0];
        util.uploadFile(`${app.$prot.api}api/Member/UploadPicture?sessionKey=${wx.getStorageSync('sessionKey')}`, tempFilePaths, 'imgFile', {
          'picid': 0
        }, function (res) {
          wx.hideLoading();
          res = typeof (res) === 'string' ? JSON.parse(res) : res;
          var data = typeof (res) === 'string' ? JSON.parse(res) : res;
          vm.setData({
            imgUrl: app.$prot.imgApi + data.data.Src,
            ['form.PicID']: data.data.pid,
          });
          if (null != res) {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            // 显示消息提示框
            wx.showToast({
              title: '上传失败',
              icon: 'error',
              duration: 2000
            })
          }
        });
      }
    })
  },
  vTips(v, btn) {
    this.setData({
      vtext: v,
      vbtn: btn || '完善信息',
      isVShow: true
    });
  },
  obligationV() {
    this.setData({
      isVShow: false
    })
  },
  onsubmit() {
    let _obj = {};
    let vm = this;
    // 体育类: 14 其他类: 15 学科类: 11 科创类: 13 艺术类: 12
    let {
      ID,
      Name,
      Sex,
      Age,
      Nation,
      School,
      PicID,
      IDCardNo,
      Class,
      Phone,
      Address,
      Height,
      Weight,
      BodyStatus,
      IsDisease,
      NamePinying,
      Country,
      Birthplace,
      HuKouAddress,
      WechatNo,
      Email,
      GuardianName,
      GuardianPhone,
      PassportNo,
      PassportIssueTime,
      PassportIssueAt,
      PassportExpiryTime,
      Awards
    } = this.data.form;
    PassportIssueTime = PassportIssueTime == '请选择' ? '' : PassportIssueTime
    PassportExpiryTime = PassportExpiryTime == '请选择' ? '' : PassportExpiryTime
    Weight = Weight == '' ? 0 : Number(Weight);
    Height = Height == '' ? 0 : Number(Height);
    _obj = {
      ID,
      Name,
      Sex: Sex == "男",
      Age,
      Nation,
      PicID,
      IDCardNo,
      Phone,
      Address: vm.data.city ? vm.data.city + ' ' + Address : '',
    };
    if (Name == "" || Sex == "请选择" || Age == "" || Nation == "" || PicID == "" || IDCardNo == "" || Phone == "" || Address == "") {
      this.vTips('报名信息不完善，是否立即完善信息？');
      return false;
    }
    if (this.data.isData.IsSchool && (School == '' || Class == '')) {
      this.vTips('报名信息不完善，是否立即完善信息？');
      return false;
    }
    if(this.data.isData.IsSchool){
      _obj = {
        ..._obj,
        School,
        Class
      }
    }
    if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(IDCardNo) && !/^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(IDCardNo) && !/^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/.test(IDCardNo)) {
      this.vTips('身份证号格式错误', '确定');
      return false;
    }
    if (!/^1[3456789]\d{9}$/.test(Phone)) {
      this.vTips('联系电话格式有误', '确定');
      return false;
    }
    if (this.data.isData.IsBodyInfo) {
      // if (Height == "" || Weight == "请选择" || BodyStatus == "") {
      //   this.vTips('报名信息不完善，是否立即完善信息？');
      //   return false;
      // }
      _obj = {
        ..._obj,
        Height,
        Weight,
        BodyStatus,
        IsDisease
      }
    }
    if (this.data.isData.IsStuDetailInfo) {
      // if (NamePinying == "" || Country == "请选择" || Birthplace == "" || HuKouAddress == "" || WechatNo == "" || Email == "" || GuardianName == "" || GuardianPhone == "" || PassportNo == "" || PassportIssueTime == "" || PassportIssueAt == "" || PassportExpiryTime == "") {
      //   this.vTips('报名信息不完善，是否立即完善信息？');
      //   return false;
      // }
      if (Email != '' && !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(Email)) {
        this.vTips('邮箱格式有误', '确定');
        return false;
      }
      if (GuardianPhone != '' && !/^1[3456789]\d{9}$/.test(GuardianPhone)) {
        this.vTips('监护人电话格式有误', '确定');
        return false;
      }
      _obj = {
        ..._obj,
        NamePinying,
        Country,
        Birthplace,
        HuKouAddress,
        WechatNo,
        Email,
        GuardianName,
        GuardianPhone,
      }
    }
    if (this.data.isData.IsPassportInfo) {
      // if (PassportNo == "" || PassportIssueTime == "" || PassportIssueAt == "" || PassportExpiryTime == "请选择") {
      //   this.vTips('报名信息不完善，是否立即完善信息？');
      //   return false;
      // }
      _obj = {
        ..._obj,
        PassportNo,
        PassportIssueTime,
        PassportIssueAt,
        PassportExpiryTime
      }
    }
    wx.showLoading({
      title: '请稍后...',
    });
    app.$prot.getStudents({
      data: _obj,
      success(data) {
        wx.hideLoading();
        if (data.code == 0) {
          wx.showToast({
            title: '添加成功！',
            mask: true,
            icon: 'success',
            duration: 1000,
            success: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          });
        } else {
          wx.showToast({
            title: '添加失败！',
            mask: true,
            image: '/assets/images/tip.png',
            duration: 2000,
          });
        }
      }
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