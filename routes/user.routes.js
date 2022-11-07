const express = require('express');
const {
  signup,
  signin,
  refreshToken,
} = require('../controllers/user.controller');
const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/refreshToken', refreshToken);

module.exports = router;
