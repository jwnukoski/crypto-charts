class DailyCache {
  constructor () {
    this.cache = {}
  }

  getDate () {
    const dateObj = new Date()
    const month = String(dateObj.getUTCMonth() + 1)
    const day = String(dateObj.getUTCDate())
    const year = String(dateObj.getUTCFullYear())

    return `${year}/${month}/${day}`
  }

  addToCache (key, val, date = this.getDate()) {
    this.cache[key] = { val: val, date: date }
    return true
  }

  isCachedDataGood (key, date = this.getDate()) {
    if (this.cache[key] === undefined || this.cache[key].date === undefined || this.cache[key].date.localeCompare(date) < 0) {
      return false
    }

    return true
  }

  getCachedData (key, date = this.getDate()) {
    // Refuse out of date data
    if (this.isCachedDataGood(key, date)) {
      return this.cache[key]
    }

    console.error(`\nRequest for cache failed due to it not existing, or being out of date at key: ${key}.\nReturned NULL instead.\n`)
    return null
  }
}

module.exports = {
  DailyCache
}
