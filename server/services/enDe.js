const crypto = require("crypto");
const config = require("../config/index");

var algorithm = "aes192";

var _self = {
  encrypt: function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, config.secret);
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  },

  decrypt: function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, config.secret);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  },
};

module.exports = _self;
