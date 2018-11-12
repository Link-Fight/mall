import base from './index.js'
// 加入购物车
function addCart(params) { return base('/wechat/mall/product/add_cart', params) }
function getCartList(params) { return base('/wechat/mall/cart/index', params) }
function getCartCount(params) { return base('/wechat/mall/cart/count', params) }
function deletCartProd(params) { return base('/wechat/mall/cart/remove', params, 'post') }

export { addCart, getCartList, getCartCount, deletCartProd }