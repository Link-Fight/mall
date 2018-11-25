import base from './index.js'
function getMain() { return base('/wechat/mall') }
function getMainGoodsList(params) { return base('/mall/goodslist', params) }
function getRecommendSearch() { return base('/wechat/mall/home/getRecommendSearch') }
function getActivityDetail(params) { return base('/wechat/mall/recommend/getActivityDetail', params) }
export { getMain, getMainGoodsList, getRecommendSearch, getActivityDetail }