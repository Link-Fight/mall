import base from './index.js'
function getMain() { return base('/wechat/mall') }
function getMainGoodsList(params) { return base('/mall/goodslist', params) }
export { getMain, getMainGoodsList }