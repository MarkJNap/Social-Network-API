const dayjs = require("dayjs");

function formatDate(date) {
  return dayjs(date).format("HH:mm:ss on DD-MM-YYYY");
}

module.exports = formatDate;
