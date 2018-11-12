import base from './index.js'
export function getBillInfoList(guid) { return base('/wechat/mall/invoice/index', { guid }) }
export function getDefaultBillInfo() { return base('/wechat/mall/invoice/index', { get_default: 1 }) }
export function deleteBillInfo(guid) { return base('/wechat/mall/invoice/delete_invoice', { guid }, 'post') }
export function saveBillInfo(params) { return base('/wechat/mall/invoice/save_invoice', params, 'post') }