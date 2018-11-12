import axios from 'axios'
import qs from 'qs'

function base(url, data = {}, type = 'get', config = {}) {
  config.url = url
  config.method = type
  if (data.fromUrl === undefined) {
    data.fromUrl = window.location.href
  }
  if (type === 'get') {
    config.params = data
  }
  if (type === 'post') {
    config.data = qs.stringify(data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  return new Promise((resolve, reject) => {
    axios.request(config).then((respose) => {
      if (respose.status === 200) {
        var status = respose.data.status
        switch (status) {
          case 8888:
            window.location.href = respose.data.data
            break
          case 8899:
            window.history.go(-1)
            break
          case 4304:
            break
          case 4300:
            break
        }
        if (status !== 200) {
          reject(respose.data)
          return
        }
      }
      resolve(respose.data.data || respose.data)
    }).catch(respose => {
      reject(respose)
    })
  })
}
export default base
