import base from './index.js'
// 购物车_检查购物车记录是否有效
function checkOrder(params) { return base('/wechat/mall/order/check_cart', params, 'post') }
function checkIFFEOrder(params) { return base('/wechat/mall/product/check_product', params, 'post') }
function submitOrder(params) { return base('/wechat/mall/order/submit', params, 'post') }
function submitQuickOrder(params) { return base('/wechat/mall/order/quick_submit', params, 'post') }
function getOrder(params) { return base('/wechat/mall/order/detail', params) }
function getOrderStatusNum(params) { return base('/wechat/mall/order/order_status_num', params) }
// 确定收货
function changeExpress(params) { return base('/wechat/mall/order/delivery', params, 'post') }
function getOrderList(params) { return base('/wechat/mall/order/order_list', params) }
export { checkOrder, checkIFFEOrder, submitOrder, submitQuickOrder, getOrder, getOrderStatusNum, changeExpress, getOrderList }