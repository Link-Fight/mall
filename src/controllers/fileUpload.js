import EXIF from 'exif-js'

/**
 * 最大上传图片的大小
 */
const MAX = 12
const MAXFILESIZETITP = `暂不支持大于${MAX}m的图片上传`
const MAXFILESIZE = MAX * 1024 * 1024

const DV_ORIG_COMP = 600 * 1024 // 原图与压缩的临界值 600k

/** 上传文件
 * @param  {String} url 上传路径
 * @param  {FormData} formData  上传的formData对象
 * @param  {Function} onprogress 不断触发上传进度的函数
 * @return  {String} responseText
 */
const uploadFileXhr = (url, formData, onprogress = function () { }) => new Promise((resolve, reject) => {
    let xhr = new window.XMLHttpRequest()
    xhr.upload.addEventListener('progress', onprogress, false)
    xhr.addEventListener('load', function () { console.log('load') }, false)
    xhr.addEventListener('error', function () { console.log('error') }, false)
    xhr.addEventListener('abort', function () { console.log('abort') }, false)
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    let response = JSON.parse(this.responseText)
                    if (response.status === 200) {
                        resolve(response.data)
                    } else if (response.status === undefined) {
                        resolve(response)
                    } else {
                        let error = { msg: response.message }
                        reject(error)
                    }
                } catch (e) {
                    resolve({ msg: this.responseText })
                }
            } else {
                reject(this.responseText)
            }
        }
    }
    xhr.open('POST', url)
    xhr.send(formData)
})

const uploadFileExif = function (guid, exifObj, url = '/resource/home/save_res_exif') {
    let formData = new window.FormData()
    formData.append('guid', guid)
    formData.append('lat', exifObj['GPSLatitude'])
    formData.append('lng', exifObj['GPSLongitude'])
    formData.append('time', exifObj['DateTimeOriginal'])
    formData.append('exif', JSON.stringify(exifObj))
    return uploadFileXhr(url, formData)
}

const checkImgComplete = (img) => new Promise((resolve, reject) => {
    if (img.naturalWidth > 0 || img.naturalHeight > 0 || img.complete) {
        resolve()
    } else {
        img.addEventListener('load', () => resolve())
    }
})

/**
 *
 * @param {*} url 上传地址
 * @param {*} param1  要上传的图片以及上传进度的回调
 */
function uploadFile(url = '/resource/home/upload', { files, onprogress }) {
    let formData = new window.FormData()
    files.forEach(file => formData.append('file_base[]', file))
    return uploadFileXhr(url, formData, onprogress)
}

function uploadBase64(url = '/resource/home/upload_base64', { base64, fileName, fileType, onprogress }) {
    let formData = new window.FormData()
    formData.append('base64', base64)
    formData.append('fileName', fileName)
    formData.append('fileType', fileType)
    return uploadFileXhr(url, formData, onprogress)
}

/**
* 上传单张原图 只做了大小判断
* @param {*} file 原图
* @param {*} onprogress 上传进度回调
*/
function uploadOriginalFile(file, onprogress) {
    if (file.size > MAXFILESIZE) {
        let err = { 'msg': MAXFILESIZETITP }
        return Promise.reject(err)
    }
    return Promise.all([
        asyReadFile2Img(file),
        uploadFile(undefined, { files: [file], onprogress: onprogress })])
        .then(([img, guids]) => {
            return {
                guid: guids[0],
                src: img.src
            }
        })
}
/**
 * 上传压缩图片
 * @param {*} file
 * @param {*} onprogress
 */
function uploadCompressFile(file, onprogress) {
    return Promise.all([asyReadFile2Img(file), asyReadFileEXIF(file, {}, null, true)])
        .then(([img, mFileInfo]) => {
            return compress({
                img: img,
                mimeType: file.type,
                maxWidth: file.size > DV_ORIG_COMP ? undefined : img.width,
                rotateDeg: mFileInfo.rotateDeg,
                orientation: mFileInfo.orientation
            }).then(base64 => {
                return uploadBase64(undefined, {
                    base64: base64, fileName: file.name, fileType: file.type, onprogress: onprogress
                }).then(result => {
                    return {
                        guid: result[0],
                        src: base64
                    }
                })
            })
        })
}
/**
 * 压缩上传图片 并且 要带有exif信息
 * @param {*} file
 * @param {*} onprogress
 */
function uploadCompressFileWidthExif(file, onprogress) {
    return Promise.all([asyReadFile2Img(file), asyReadFileEXIF(file, {}, null, true)]).then(([img, mFileInfo]) => {
        if (!mFileInfo.Model || !mFileInfo.GPSLatitude || !mFileInfo.GPSLongitude) {
            let err = { 'msg': '该图片缺乏地理定位信息，请上传原图！' }
            return Promise.reject(err)
        }
        return compress({
            img: img,
            maxWidth: file.size > DV_ORIG_COMP ? undefined : img.width,
            mimeType: file.type,
            rotateDeg: mFileInfo.rotateDeg,
            orientation: mFileInfo.orientation
        }).then(base64 => {
            return uploadBase64(undefined, {
                base64: base64, fileName: file.name, fileType: file.type, onprogress: onprogress
            }).then(result => {
                return uploadFileExif(result[0], mFileInfo).then(() => {
                    return {
                        src: base64,
                        guid: result[0]
                    }
                })
            })
        })
    })
}

function compress({ img, maxWidth = 1500, mimeType = 'image/jpeg', rotateDeg = 0, orientation = 0 }) {
    // console.log('mimeType:', mimeType)
    return new Promise((resolve, reject) => {
        let cvs = document.createElement('canvas')
        checkImgComplete(img).then(() => {
            let width = img.naturalWidth
            let height = img.naturalHeight
            let imgRatio = width / height
            console.info('compress:width', width, maxWidth)
            console.info('compress:height', height)
            console.info('img', img.complete)
            if (width > maxWidth) {
                width = maxWidth
                height = width / imgRatio
            }
            cvs.width = width
            cvs.height = height
            let ctx = cvs.getContext('2d')
            if (orientation === 6) {
                cvs.height = width
                cvs.width = height
                ctx.translate(height, 0)
                ctx.rotate(90 * Math.PI / 180)
            } else if (orientation === 8) {
                cvs.height = width
                cvs.width = height
                ctx.translate(0, width)
                ctx.rotate(-90 * Math.PI / 180)
            } else if (orientation === 3) {
                ctx.translate(width, height)
                ctx.rotate(180 * Math.PI / 180)
            }
            // ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, width, height)
            let quality = width >= 1500 ? 0.5 : (width > 600 ? 0.6 : 1)
            let newImageData = cvs.toDataURL(mimeType, quality)
            resolve(newImageData || img.src)
        })
    })
}

/** 获取照片的EXIF信息，主要拿来判断照片是否旋转了
 * @param  {FILE} file 文件
 * @param  {Object} info={} 文件信息
 * @param  {Array} keys=[] 另外需要返回的EXIF字段
 * @param  {Boolean} needAll=false 是否要返回全部的EXIT的字段
 */
function asyReadFileEXIF(file, info = {}, keys = [], needAll = false) {
    return new Promise((resolve, reject) => {
        EXIF.getData(file, function () {
            let orientation = this.exifdata.Orientation
            console.log('EXIF', this.exifdata)
            let rotateDeg = 0
            if (orientation !== undefined && orientation !== 1) {
                switch (orientation) {
                    case 6: // 顺时针90°
                        rotateDeg = 90 * Math.PI / 180
                        break
                    case 8: // 逆时针90°
                        rotateDeg = -90 * Math.PI / 180
                        break
                    case 3: // 180°
                        rotateDeg = 180 * Math.PI / 180
                        break
                    default:
                        rotateDeg = 0
                }
            }
            console.info('orientation', orientation)
            if (needAll === true) {
                Object.assign(info, this.exifdata)
            } else {
                if (keys.length > 0) keys.forEach(key => { info[key] = this.exifdata[key] })
            }
            info.rotateDeg = rotateDeg
            info.orientation = orientation
            resolve(info)
        })
    })
}

/**
 * 把选择的文件(file)变成图片(img) 好获得它的宽度，高度
 * @param {*} file
 */
function asyReadFile2Img(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader(file)
        var img = document.createElement('img')
        reader.onload = function (e) {
            img.src = e.target.result
            resolve(img)
        }
        reader.readAsDataURL(file)
    })
}
function createFileInput(accept = 'image/jpg,image/jpeg,image/png,image/gif') {
    let input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    return input
}
export function uploadQiniu(url = 'http://upload.qiniu.com/', { params, onprogress }) {
    let formData = new window.FormData()
    let keys = Object.keys(params)
    keys.forEach(key => {
        formData.append(key, params[key])
    })
    return uploadFileXhr(url, formData, onprogress)
}
export const getEXIF = EXIF
export default {
    DV_ORIG_COMP,
    MAXFILESIZE,
    MAXFILESIZETITP,
    uploadBase64,
    uploadFile,
    uploadOriginalFile,
    uploadCompressFile,
    uploadCompressFileWidthExif,
    /** 读取文件 返回base64信息
     * @param  {FILE} file
     * @param  {} info={base64,size}
     * @return Promise
     */
    readImageFile(file, info = {}) {
        return new Promise((resolve, reject) => {
            let reader = new window.FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = (event) => {
                info.base64 = event.target.result
                info.size = file.size
                resolve(info)
            }
        })
    },
    compress,
    asyReadFileEXIF,
    asyReadFile2Img,
    createFileInput
}