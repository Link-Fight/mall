// 获取微信签名的
export const wechatSignature = {
  url: '/wechat/wechat/wechat_signature_info/',
  data: {
    url: window.location.href.toString()
  },
  method: 'post'
}

// 微信图片的服务器地址
export const saveWechatRes = {
  url: '/resource/home/fetch_wechat_res_uid',
  data: {
    uids: []
  },
  method: 'post'
}

/**
 * 把资源id变为其地址
 */
export const getResourceUrls = {
  url: '/resource/home/get_resource_urls',
  data: {
    res_uids: []
  },
  method: 'post'
}