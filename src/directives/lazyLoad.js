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