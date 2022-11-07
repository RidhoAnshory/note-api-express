const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: err.message });

        req.id = user.id;

        next();
      });
    } else {
      res.status(401).json({ message: 'Unauthorized User' });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unauthorized User' });
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
};

module.exports = { auth, generateAccessToken };
