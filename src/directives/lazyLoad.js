export default {
  inserted(el, { value }) {
    let observer = new IntersectionObserver(function (entries) {
      if (entries[0].intersectionRatio) {
        observer.unobserve(el)
        el.src = value
      }
    })
    observer.observe(el)
  }
}

export function lazyLoadConfig(type = 'img', cfg = {}) {
  const loadingClass = cfg.loadingClass
  const displayClass = cfg.displayClass
  return {
    inserted(el, { value }) {
      loadingClass && (el.className += ' ' + loadingClass)
      let observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio) {
          observer.unobserve(el)
          if (loadingClass) {
            el.className = el.className.replace(' ' + loadingClass, '')
          }
          if (displayClass) {
            el.className += ' ' + displayClass
          }
          if (type === 'ímg') {
            el.src = value
          } else {
            el.style = 'background-image:url(' + value + ')'
          }
        }
      })
      observer.observe(el)
    }
  }
}