const dayjs = require('dayjs')

function formatDate(date) {
    dayjs(date).format('HH:mm:ss DD MM YYYY')
    return date
}

module.exports = formatDate