const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');
  try {
    req.user = jwt.verify(token, 'secret123');
    next();
  } catch {
    res.status(400).send('Invalid Token');
  }
};
