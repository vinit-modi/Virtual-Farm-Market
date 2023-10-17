const jwt = require("jsonwebtoken");
const config = require("../config/index");

function decodeToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userInfo = decoded;
    next();
  } catch (ex) {
    next();
  }
}

module.exports = decodeToken;
