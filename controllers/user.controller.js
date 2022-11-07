const userModel = require('../models/user.models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../middlewares/auth');
require('dotenv').config();

const signup = async (req, res) => {
  // Exsisting user check
  // hashed password
  //user Creation
  //token generate

  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: 'Email already exist! Try another email.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      uuid: uuidv4().replaceAll('-', ''),
    });

    const token = jwt.sign(
      { email: result.email, id: result.uuid },
      process.env.ACCESS_TOKEN_SECRET,
    );

    res.status(200).json({ user: result, token: token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const accessToken = generateAccessToken({
      email: existingUser.email,
      id: existingUser.uuid,
    });

    const refreshToken = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser.uuid,
      },
      process.env.REFRESH_TOKEN_SECRET,
    );

    res.cookie('jwt', refreshToken, {
      expires: new Date(Date.now() + 36000),
      httpOnly: true,
      // secure: true,
      sameSite: 'None',
    });

    res.status(200).json({
      user: existingUser,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const refreshToken = (req, res) => {
  const cookies = req.cookies;

  const refreshToken = cookies.jwt;

  if (refreshToken === null)
    return res.sendStatus(401).json({ message: 'Refresh token not found.' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken({
      email: user.email,
      id: user.id,
    });
    res.json({ accessToken: accessToken });
  });
};

module.exports = { signup, signin, refreshToken };
