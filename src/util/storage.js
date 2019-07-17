export default {
  setStorage(key, value, type = 'localStorage') {
    window[type].setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
  },
  getStorage(key, type = 'localStorage') {
    const value = window[type].getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch (error) {
        return value
      }
    }
    return value
  }
}