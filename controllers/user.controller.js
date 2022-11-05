const userModel = require('../models/user.models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
      uuid: uuidv4(),
    });

    const token = jwt.sign(
      { email: result.email, id: result.uuid },
      process.env.APP_SECRET_KEY,
    );

    res.status(201).json({ user: result, token: token });
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
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.uuid },
      process.env.APP_SECRET_KEY,
    );

    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { signup, signin };
