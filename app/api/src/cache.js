const mongoose = require('mongoose')

class DailyCache {
  constructor () {
    this.db = null
    this.cacheSchema = null
    this.CacheModel = null
  }

  async init() {
    this.cacheSchema = new mongoose.Schema({
      key: {
        type: String,
        index: true,
        unique: true
      },
      date: String,
      val: mongoose.Mixed
    })
    
    this.CacheModel = mongoose.model('cache', this.cacheSchema)

    await new this.CacheModel.create({})

    this.db = mongoose.connect(`mongodb://${process.env.CACHE_DB_ROOT_USERNAME ?? ''}:${process.env.CACHE_DB_ROOT_PASSWORD ?? ''}@cache-database:27017/crypto-charts`, { useNewUrlParser: true, useUnifiedTopology: true })

    return this.db
  }

  getDate () {
    const dateObj = new Date()
    return `${String(dateObj.getUTCFullYear())}
    /${String(dateObj.getUTCMonth() + 1)}
    /${String(dateObj.getUTCDate())}`
  }

  async addToCache (key, val, date = this.getDate()) {
    // Returns a promise
    return await this.CacheModel.updateOne({ key: key }, { key: key, val: val, date: date }, { upsert: true })
  }

  isCachedDateGood (date = this.getDate()) {
    // Checks if given day matches todays day
    if (!date || date.localeCompare(date) < 0) {
      return false
    }
    return true
  }

  async getCachedData (key) {
    // Returns promise. Value will be NULL if its out of date or doesnt exist.
    if (!this.db)
      await this.init()

    return await this.CacheModel.findOne({ key: key }).then((data) => {
      if (data && data.date) {
        // Check date
        if (this.isCachedDateGood(data.date)) {
          return data
        } else {
          return null
        }
      } else {
        return null
      }
    })
  }
}

module.exports = {
  DailyCache
}
