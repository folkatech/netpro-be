const jwt = require("jsonwebtoken");
const config = require('../config/config');
const os = require('os');

module.exports = function(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      status: "false",
      message: "Unauthorized Access"
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET, {});
    if (decoded.hostname != os.hostname()) {
        return res.status(403).json({ success: false, message: 'Unauthorized Access hostname failed'});
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: "false",
      message: "Unauthorized Access"
    });
  }
};
