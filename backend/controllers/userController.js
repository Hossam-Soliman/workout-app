const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET, { expiresIn: '3d' });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password aren't empty
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email is not valid' });
  }

  // Validate password strength
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: 'Password is not strong enough' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hashedPass });
    const token = createToken(user?._id, email);
    res.status(200).json({ token, email, message: 'Successfully signup' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: 'Incorrect email' });
  }

  const match = await bcrypt.compare(password, user?.password);

  if (!match) {
    return res.status(400).json({ error: 'Incorrect password' });
  }

  try {
    const token = createToken(user?._id, email);
    res.status(200).json({ token, email, message: 'Successfully login' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
