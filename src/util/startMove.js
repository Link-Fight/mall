import requestAnimationFrame from './requestAnimFrame.js'

/**
 *
 * @param {Node} obj
 * @param {Object} target 键值对 目标要达成得到目标
 * @param {Function} endFn
 *
 * @return {Function}
 */
export default function (obj, target = {}, endFn) {
  let LASTPOINT = {}
  Object.keys(target).forEach(key => LASTPOINT[key])
  return () => {
    cancelAnimationFrame(obj.$$timer)
    var loop = () => {
      let needStop = true
      for (var attr in target) {
        var iCur = 0
        iCur = obj[attr]
        // let params = target[attr] > iCur ? 1 : -1
        var iSpeed = (target[attr] - iCur) / 10
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
        console.log(iSpeed, obj[attr], target[attr])
        if (LASTPOINT[attr] !== obj[attr]) {
          if (Math.abs(iCur - target[attr]) > 1) {
            needStop = false
            LASTPOINT[attr] = iCur
            obj[attr] = (iCur + iSpeed)
          } else {
            obj[attr] = target[attr]
          }
        }
      }
      if (needStop) {
        clearInterval(obj.$$timer)
        if (endFn) {
          endFn.call(obj)
        }
      } else {
        obj.$$timer = requestAnimationFrame(loop)
      }
    }
    obj.$$timer = requestAnimationFrame(loop)
  }
}