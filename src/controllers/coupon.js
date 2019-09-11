import base from './index.js'
class Coupon {
  price = '' // 优惠金额
  coupon_guid = '' // 优惠券guid
  coupon_name = '' // 优惠券名称
  is_used = '' // 1:未使用 2:已使用
  can_use = '' // 能否使用
  expiry_date = '' // 有效期
  select = false
}

function conversion(list, selectResult = {}) {
  return list.map(item => {
    return {
      ...item,
      select: selectResult[item.coupon_guid] || false
    }
  })
}

// function test({ type, product }) {
//   console.log('test', type, product)
//   return new Promise(resolve => {
//     let list = [
//       {
//         price: '100',
//         coupon_guid: '01',
//         coupon_name: 'T1',
//         is_used: false,
//         can_use: true,
//         expiry_date: '2019/9/9 - 2020/1/1'
//       },
//       {
//         price: '120',
//         coupon_guid: '03',
//         coupon_name: 'T3',
//         is_used: false,
//         can_use: true,
//         expiry_date: '2019/9/1 - 2020/1/1'
//       },
//       {
//         price: '200',
//         coupon_guid: '02',
//         coupon_name: 'T2',
//         is_used: false,
//         can_use: false,
//         expiry_date: '2019/9/9 - 2020/1/1'
//       }
//     ]
//     setTimeout(() => {
//       resolve(product ? list.filter(item => item.can_use) : list)
//     }, 3000)
//   })
// }

// 获取优惠券的描述信息
async function getCouponDesc() {
  if (curProductDesc) {
    return curProductDesc
  }
  const { desc } = await base('/wechat/mall/coupon/get_description')
  return desc
}

/**
 * 获取优惠券
 * @param {type，product} params type:String [1:待使用|2:已使用|:已过期], product:Array [商品guid]
 */
async function getCoupon(params) {
  const result = await base('/wechat/mall/coupon/index', params, 'post') //test(params)
  return conversion(result)
}

/**
 * 获取购物车优惠后的价格
 * @param { product,coupon_guids } params product:[]<{guid,count}>,coupon_guids:[]
 */
async function getProductCouponPrice(params) {
  return await base('/wechat/mall/coupon/get_product_price', params, 'post')
}

let allCouponList = null
/**
 * 记录当前商品对应的可用的优惠券
 * 因为处于当前支付阶段的商品是唯一一份，所以可以这样存
 */
let curProductCanUseCouponList = null
/**
 * 记录当前商品的不可用的优惠券
 */
let curProductNoCanUseCouponList = null
/**
 * 记录当前商品对应选择的优惠券
 */
let curProductSelectConponList = []

let curProductDesc = ''

function clearOldProductCouponInfo() {
  curProductDesc = ''
  allCouponList = []
  curProductCanUseCouponList = null
  curProductNoCanUseCouponList = null
  curProductSelectConponList = []
}

/**
 * 获取可用的优惠券
 */
function getCurProductCanUse() {
  return curProductCanUseCouponList.map(item => {
    item.select = curProductSelectConponList.includes(item.coupon_guid)
    return item
  })
}

function getCurProductNoUse() {
  return curProductNoCanUseCouponList
}

async function getProductCoupon(product) {
  clearOldProductCouponInfo()
  getCouponDesc()
  allCouponList = await getCoupon({ type: 1 })
  curProductCanUseCouponList = await getCoupon({
    type: 1,
    product
  })
  const canUseCouponGuids = curProductCanUseCouponList.map(
    item => item.coupon_guid
  )
  curProductNoCanUseCouponList = allCouponList.filter(
    item => !canUseCouponGuids.includes(item.coupon_guid)
  )
  return curProductCanUseCouponList
}

function updateProductByCoupon(product, coupon_guids = []) {
  curProductSelectConponList = coupon_guids
  return getProductCouponPrice({
    product,
    coupon_guids
  })
}

export {
  getCoupon,
  getProductCoupon,
  Coupon,
  getCurProductCanUse,
  getCurProductNoUse,
  getCouponDesc,
  updateProductByCoupon
}
