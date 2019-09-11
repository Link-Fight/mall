/* eslint-disable */
import base from './index.js'
import storage from '@/util/storage'
function getAddressList(params) {
  return base('/wechat/account/address/address_list', params)
}
function getAddressDetail(params) {
  return base('/wechat/account/address/detail', params)
}
function getDefaultAddress(params) {
  return base('/wechat/account/address/get_default_address', params)
}
function deleteAddress(params) {
  params.type = 1
  return base('/wechat/account/address/delete', params)
}
function saveAddress(params) {
  return base('/wechat/account/address/save', params, 'post')
}
function setDefaultAddress(params) {
  return base('/wechat/account/address/set_default', params, 'post')
}

// 尝试从浏览器的缓存获取数据，获取不到再通过网络请求
async function getDefaultAddressFormStorageOrNetwork(
  storageKey,
  storageType = 'sessionStorage'
) {
  let result = storage.getStorage(storageKey, storageType)
  if (!result) {
    result = await getDefaultAddress()
  }
  return result
}

export {
  getAddressList,
  getAddressDetail,
  getDefaultAddress,
  getDefaultAddressFormStorageOrNetwork,
  deleteAddress,
  saveAddress,
  setDefaultAddress
}
