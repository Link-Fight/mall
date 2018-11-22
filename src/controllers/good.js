import base from './index.js'
import { getNewCfg } from '@/config/views/Goods'
function getDetail(params) { return base('/wechat/mall/product/detail', params) }
async function getDetail_2(params) {
  return getNewCfg() || base('/wechat/mall/product/detail_v2', params)
}
function getMoreDetail(params) { return base('/test2/test_get', params) }
function addCart(params) {
  return base('/wechat/mall/product/add_cart_v2', params)
}
export { getDetail, getDetail_2, getMoreDetail, addCart }