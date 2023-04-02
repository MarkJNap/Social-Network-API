const dayjs = require("dayjs");

function formatDate(date) {
  dayjs(date).format("HH:mm:ss DD MM YYYY");
}

module.exports = formatDate;
