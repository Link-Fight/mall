export default function (fn, timeout = 500) {
  let timeHandle = null
  return function () {
    let that = this
    clearTimeout(timeHandle)
    timeHandle = setTimeout(() => {
      fn.apply(that, arguments)
    }, timeout)
  }
}