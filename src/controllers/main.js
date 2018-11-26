import base from './index.js'
function getMain() { return base('/wechat/mall/home/index_v2') }
function getMainGoodsList(params) { return base('/mall/goodslist', params) }
function getRecommendSearch() { return base('/wechat/mall/home/getRecommendSearch') }
function getActivityDetail(params) { return base('/wechat/mall/recommend/getActivityDetail', params) }
function getRecommendProduct(params) { return base('/wechat/mall/recommend/getProductList', params) }
export { getMain, getMainGoodsList, getRecommendSearch, getActivityDetail, getRecommendProduct }