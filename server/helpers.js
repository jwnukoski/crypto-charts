module.exports.getDate = () => {
  const dateObj = new Date()
  let month = String(dateObj.getUTCMonth() + 1)
  let day = String(dateObj.getUTCDate())
  const year = String(dateObj.getUTCFullYear())

  // only for how coindesk puts 0 in single digit dates
  if (day.length === 1) {
    day = `0${day}`
  }

  if (month.length === 1) {
    month = `0${month}`
  }

  return year + '/' + month + '/' + day
}
