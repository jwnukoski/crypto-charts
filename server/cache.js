const mongoose = require('mongoose')

class DailyCache {
  constructor () {
    this.db = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/crypto-charts', { useNewUrlParser: true, useUnifiedTopology: true })

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
  }

  getDate () {
    const dateObj = new Date()
    return `${String(dateObj.getUTCFullYear())}
    /${String(dateObj.getUTCMonth() + 1)}
    /${String(dateObj.getUTCDate())}`
  }

  addToCache (key, val, date = this.getDate()) {
    // Returns a promise
    return this.CacheModel.updateOne({ key: key }, { key: key, val: val, date: date }, { upsert: true })
  }

  isCachedDateGood (date = this.getDate()) {
    // Checks if given day matches todays day
    if (!date || date.localeCompare(date) < 0) {
      return false
    }
    return true
  }

  getCachedData (key) {
    // Returns promise. Value will be NULL if its out of date or doesnt exist.
    return this.CacheModel.findOne({ key: key }).then((data) => {
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
