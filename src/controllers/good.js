import base from './index.js'
import storage from '@/util/storage'
import { SESSION_GOOD_DETAIL } from '@/storeKey'
function getDetail(params) { return base('/wechat/mall/product/detail', params) }
async function getDetail_2(params) { return base('/wechat/mall/product/detail_v2', params) }
async function getCacheDetail_2(params = {}) {
  const key = JSON.stringify(params)
  const data = storage.getStorage(SESSION_GOOD_DETAIL + key, 'sessionStorage')
  return data || getDetail_2(params).then(data => {
    storage.setStorage(SESSION_GOOD_DETAIL + key, data, 'sessionStorage')
    return data
  })
}
function getMoreDetail(params) { return base('/test2/test_get', params) }
export { getDetail, getDetail_2, getMoreDetail, getCacheDetail_2 }