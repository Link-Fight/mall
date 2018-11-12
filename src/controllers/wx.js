import wx from 'weixin-js-sdk'
import base from './index.js'
import { wechatSignature, getResourceUrls } from '@/apis/wx.js'
import * as geo from './geo.js'
function _checkIsWeixin() {
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1
}
let hasConfig = false
export default {

    /** 判断是否在微信的环境下
     *  不是 就直接执行cb
     *
     * @param  {} cb
     */
    async config(cb) {
        if (_checkIsWeixin()) {
            if (hasConfig) {
                cb && cb()
            }
            try {
                let data = await base(wechatSignature.url, wechatSignature.data, wechatSignature.method)
                data = data.data
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名，见附录1
                    jsApiList: ['chooseImage', 'previewImage', 'getLocalImgData', 'uploadImage', 'downloadImage', 'hideMenuItems', 'showMenuItems', 'scanQRCode', 'getLocation', 'openLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })
                wx.ready(function () {
                    if (cb instanceof Function) {
                        cb()
                        hasConfig = true
                    }
                })
                wx.error(function (res) {
                    console.info('wx:error')
                    console.warn(JSON.stringify(res))
                    if (cb instanceof Function) {
                        cb(res)
                    }
                })
            } catch (error) {
                alert(error.message)
                if (cb instanceof Function) {
                    cb(error)
                }
            }
        } else {
            if (cb instanceof Function) {
                cb()
            }
        }
    },
    ready(fun) {
        wx.ready(function (res) {
            fun && fun(res)
        })
    },
    error(fun) {
        wx.error(function (res) {
            fun && fun(res)
        })
    },
    chooseImage(options) {
        var localIds = []
        var count = (options && options.count) ? options.count : 9
        var sizeType = (options && options.sizeType) ? options.sizeType : ['original', 'compressed']
        var sourceType = (options && options.sourceType) ? options.sourceType : ['album', 'camera']
        return new Promise(resolve => {
            wx.chooseImage({
                count: count, // 默认9张
                sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有
                sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    for (var i = 0; i < res.localIds.length; i++) {
                        localIds.push(res.localIds[i])
                    }
                    resolve(localIds)
                },
                fail: function (res) {
                    alert(JSON.stringify(res))
                }
            })
        })
    },
    upload(localIds, isShowProgressTips) {
        isShowProgressTips = isShowProgressTips ? 1 : 0
        let i = 0
        let length = localIds.length
        let serverIds = []
        let mResolve
        let mReject
        function upload() {
            wx.uploadImage({
                isShowProgressTips: isShowProgressTips,
                localId: localIds[i],
                success: function (res) {
                    i++
                    serverIds.push(res.serverId)
                    if (i < length) {
                        upload()
                    } else {
                        mResolve(serverIds)
                    }
                },
                fail: function (res) {
                    mReject(JSON.stringify(res))
                }
            })
        }
        return new Promise((resolve, reject) => {
            mResolve = resolve
            mReject = reject
            upload()
        })
    },
    previewImage(current, urls) {
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
        })
    },
    // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1483682025_enmey
    getLocalImgData(localIds) {
        if (localIds.toString().indexOf('wxLocalResource') === -1) {
            return Promise.resolve(localIds)
        }
        return new Promise(resolve => {
            let i = 0
            let newIds = []
            function _getLocalImgData() {
                wx.getLocalImgData({
                    localId: localIds[i],
                    success(res) {
                        newIds[i] = res.localData
                        if (i < localIds.length - 1) {
                            _getLocalImgData(++i)
                        } else {
                            resolve(newIds)
                        }
                    },
                    fail(err) {
                        window.alert(JSON.stringify(err))
                    }
                })
            }
            _getLocalImgData()
        })
    },
    async getImageUrl(resUids) {
        console.log(resUids)
        let result = await base(getResourceUrls.url, { res_uids: resUids }, getResourceUrls.method)
        return result.data
    },
    scanQRCode(config) {
        return new Promise(resolve => {
            var defaultOption = {
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success(res) {
                    resolve(res.resultStr)
                },
                fail(res) {
                    alert(JSON.stringify(res))
                }
            }
            if (config) {
                Object.assign(defaultOption, config)
            }
            wx.scanQRCode(defaultOption)
        })
    },
    getLocation(config) {
        // 判断是否是在微信的环境下
        config.fail = config.fail || function () { }
        if (!_checkIsWeixin()) {
            // http
            if (window.location.origin.indexOf('http://') > -1) {
                try {
                    geo.getLocation({ success: config.success, fail: config.fail })
                } catch (e) {
                    config.fail && config.fail('NO wx,NO H5 Location')
                }
            } else {
                // https
                if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        debugger
                        // alert(position.coords.latitude + ' ' + position.coords.longitude)
                        var data = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                        config.success && config.success(data)
                    }, config.fail, {
                            enableHighAccuracy: true,
                            timeout: 5000,
                            maximumAge: 0
                        })
                    return
                }
                config.fail && config.fail('NO wx,NO H5 Location')
            }
        } else {
            var defaultOption = {
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed // 速度，以米/每秒计
                    var accuracy = res.accuracy // 位置精度
                    console.log(latitude, longitude, speed, accuracy)
                }
            }
            if (config) {
                Object.assign(defaultOption, config)
            }
            wx.getLocation(defaultOption)
        }
    },
    openLocation(config) {
        if (config.latitude < 0 || config.longitude < 0) {
            console.warn('[wx:openLocation] need latitude longitude')
            return false
        }
        var defaulConfig = {
            latitude: 0, // 纬度，浮点数，范围为90 ~ -90
            longitude: 0, // 经度，浮点数，范围为180 ~ -180。
            name: '', // 位置名
            address: '', // 地址详情说明
            scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        }
        Object.assign(defaulConfig, config)
        wx.openLocation(defaulConfig)
    },
    getShareOption() {
        return {
            title: document.title.replace(' - 极飞商城', ''),
            desc: `极飞科技旗下的保障商城`,
            link: window.location.href,
            imgUrl: window.location.origin + '/pm/images/share_logo.png'
        }
    }
}
