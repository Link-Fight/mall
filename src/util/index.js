export function getScrollTop(el) {
  if (el) {
    return el.scrollTop
  }
  return (
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop
  )
}

export function setScrollTop(scrollTop, el) {
  if (el) {
    el.scrollTop = scrollTop
  } else {
    document.documentElement.scrollTop = document.body.scrollTop = scrollTop
  }
}
