import base from './index.js'

export function addFeekBack(params) { return base('/wechat/mall/advice/edit_advice', params, 'post') }

export function checkLogin() { return base('/wechat/wechat/check_login') }