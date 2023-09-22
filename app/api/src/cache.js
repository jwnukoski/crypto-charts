const mongoose = require('mongoose')

class DailyCache {
  constructor () {
    this.db = null
    this.cacheSchema = null
    this.CacheModel = null
  }

  async init() {
    try {
      this.db = await mongoose.connect(`mongodb://${process.env.CACHE_DB_USER}:${process.env.CACHE_DB_PASS}@crypto-charts:27017/crypto-charts`, { 
        autoIndex: true, 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
      })
    } catch (error) {
      console.error(error)
      this.db = null
      return null
    }

    if (this.cacheSchema === null) {
      this.cacheSchema = new mongoose.Schema({
        key: {
          type: String,
          index: true,
          unique: true
        },
        date: String,
        val: mongoose.Mixed
      })
      
      if (this.CacheModel === null)
        this.CacheModel = mongoose.model('cache', this.cacheSchema)
      
      // create blank cache entry
      await this.addToCache('markets', null, '1970/01/01')
      // remove blank cache entry
      await this.CacheModel.deleteOne({ key: 'markets' })
    }

    if (this.db !== null) {
      return this.db
    }

    
    return this.db
  }

  getDate () {
    const dateObj = new Date()
    return `${String(dateObj.getUTCFullYear())}/${String(dateObj.getUTCMonth() + 1)}/${String(dateObj.getUTCDate())}`
  }

  async addToCache (key, val, date = this.getDate()) {
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

    if (!this.db)
      return null

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
