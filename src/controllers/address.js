/* eslint-disable */
import base from './index.js'
function getAddressList(params) {
    return base('/wechat/account/address/address_list', params)
}
function getAddressDetail(params) { return base('/wechat/account/address/detail', params) }
function getDefaultAddress(params) { return base('/wechat/account/address/get_default_address', params) }
function deleteAddress(params) {
    params.type = 1
    return base('/wechat/account/address/delete', params)
}
function saveAddress(params) { return base('/wechat/account/address/save', params, 'post') }
function setDefaultAddress(params) { return base('/wechat/account/address/set_default', params, 'post') }
export { getAddressList, getAddressDetail, getDefaultAddress, deleteAddress, saveAddress, setDefaultAddress }