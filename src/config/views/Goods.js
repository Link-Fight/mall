

export function getOldCfg() {
  return {
    'shop_guid': '3F596B1ED962B52FFC7B412DCBCE69AF',
    'title': 'P30 2018款 折叠桨（正桨）',
    'sub_title': '1个',
    'sku': [],
    'available_stock': 13,
    'stock_percent': 10,
    'weight': 0,
    'detail': '<p><br/></p><p style=\'white-space: normal;\'><span style=\'color: rgb(255, 0, 0);\'><strong><span style=\'font-size: 20px;\'>适用机型：</span></strong></span></p><p style=\'white-space: normal;\'><span style=\'color: rgb(255, 0, 0);\'><strong><span style=\'font-size: 20px;\'>P30 2018款 植保无人机</span></strong></span></p><p style=\'white-space: normal;\'><br/></p><p><br/></p>',
    'logistics_cost': '0',
    'description_pics': [],
    'shop_name': '极飞商城',
    'shop_company_name': '广州极飞科技有限公司',
    'shop_description': '主营极飞产品零部件~',
    'shop_logo': 'http://agri-private.static.xag.cn/v3/upload/2018/04/04/dbaa24c8a03b4b920c0550b980e33765.jpeg?imageView2/0/w/100/h/100&e=1541673764&token=wYqu938c9qi_H_uUgnE_B36feoECpNZuZ1cZQw1S:szTJJ0hNWYkF1lUQpFUcQCRMSPs=',
    'pics': [
      'http://agri-private.static.xag.cn/v3/upload/2018/05/22/6b5f8910c89af4ace4aeb87d7be79a70.png?imageView2/0/w/750/h/750&e=1541673764&token=wYqu938c9qi_H_uUgnE_B36feoECpNZuZ1cZQw1S:iTHJXoaZiiXT6fOGM9SdUQEz5HY=',
      'http://agri-private.static.xag.cn/v3/upload/2018/05/22/c7fe0ac4b66b0dace4f34846e20b65fc.png?imageView2/0/w/750/h/750&e=1541673764&token=wYqu938c9qi_H_uUgnE_B36feoECpNZuZ1cZQw1S:vkd4_tm7x2Gxbit8mcbyRYyqbRw='
    ],
    'product_guid': '9E4D4B06598FD7976C4F829FD3B99C0A',
    'buy': 1,
    'buy_notice': '商品正在采购中，请等待！',
    'product_parent_guid': '',
    'price': 420
  }
}

let count = 0
let baseInfo = {
  'shop_guid': '35940685FC7BBA0CB176DF3DCB449D1D',
  'title': '鸡翅',
  'sub_title': '鸡翅',
  'available_stock': 0,
  'stock_percent': 30,
  'weight': 0,
  'logistics_cost': '0',
  'description_pics': [],
  'shop_name': '极飞官方',
  'shop_company_name': '极飞科技',
  'shop_description': '测试用的',
  'shop_logo': 'http://agri-private.static.xag.cn/v3/upload/2018/11/08/7da85912e941d0dbd5f6baeb35b1c4d0.jpg?imageView2/0/w/100/h/100&e=1542870487&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:RIlJ6YnYIp-xttRyeHO4g6FmW2E=',
  'pics': [],
  'buy': 1,
  'buy_notice': '',
  'price': 6
}
export function getNewCfg() {
  count++
  return {
    ...baseInfo,
    'sku': [{
      'guid': '383E78484DC106F78D8E7E9E30E669BE',
      'sku_name': '2019',
      'is_choose': count % 2
    },
    {
      'guid': 'A81013381F6FE03A15FA8DBE0A9930F6',
      'sku_name': '2018',
      'is_choose': (count + 1) % 2
    }
    ],
    'sku_name': count % 2 ? '无敌大鸡翅' : '无敌大鸡腿',
    'detail': count % 2 ? '<p>阿斯顿发</p>p>无敌大鸡翅</p>' : '<p>阿斯顿发</p>p>无敌大鸡腿</p>',
    'params': count % 2 ? [{
      'guid': 'F94F957AAE05B21716D1BEBDF3C65E31',
      'title': '口味',
      'option': [
        '香辣',
        '五香'
      ]
    },
    {
      'guid': 'E45AC53194247C7039EA21CB645B5E91',
      'title': '性别',
      'option': [
        '雄',
        '雌'
      ]
    }
    ] : [{
      'guid': 'F94F957AAE05B21716D1BEBDF3C65E31',
      'title': '口味',
      'option': [
        '香辣',
        '五香'
      ]
    },
    {
      'guid': 'E45AC53194247C7039EA21CB645B5E91',
      'title': '性别',
      'option': [
        '雄',
        '雌'
      ]
    }, {
      'guid': 'E45AC53194247C7039EA21CB645B5E91',
      'title': '颜色',
      'option': [
        '红',
        '白',
        '黑'
      ]
    }],
    'param_choice': {
      '香辣,雄': {
        'guid': '313203230948CA449ADDE5BE00BC7579',
        'available_stock': 4
      },
      '五香,雄': {
        'guid': 'FCAA735F78CB81827ABF4D46B5997F33',
        'available_stock': 2
      },
      '香辣,雌': {
        'guid': '5B081AE08636A3C95A20F1001A9FEA47',
        'available_stock': 3
      },
      '五香,雌': {
        'guid': 'A3714B54E0ECF1DA9F4BF18AF488BDD5',
        'available_stock': 0
      }
    },
    'price': count % 2 ? 6 : 166
  }
}