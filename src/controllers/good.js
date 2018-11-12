import base from './index.js'
function getDetail(params) { return base('/wechat/mall/product/detail', params) }
function getMoreDetail(params) { return base('/test2/test_get', params) }
export { getDetail, getMoreDetail }