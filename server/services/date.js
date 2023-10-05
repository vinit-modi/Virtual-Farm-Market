const moment = require("moment");

let _self = {
  now: function now() {
    return moment().utc().toISOString();
  },

  utcDateFormat: (date) => {
    return moment(date.toString()).utc().format();
  },

  getTime: function getTime() {
    return moment().valueOf();
  },

  isoString: (date) => {
    return moment(date).utc().format();
  },
};

module.exports = _self;
