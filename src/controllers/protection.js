import base from './index.js'
// function addCart(params) { return base('/wechat/mall/product/add_cart', params) }
function getCartList(params) { return base('/wechat/mall/cart/index', params) }
function deletCartProd(params) { return base('/wechat/mall/cart/remove', params) }
export { getCartList, deletCartProd }