import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

const createToken = (id: string, email: string): string => {
  return jwt.sign({ id, email }, process.env.SECRET as string, { expiresIn: '3d' });
};

const signupUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = createToken(user._id.toString(), user.email);

    return res.status(201).json({ email, token });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  // Check if email and password aren't empty
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // Check if the password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: 'Incorrect password' });
  }

  const token = createToken(user._id.toString(), user.email);

  return res.status(200).json({ email, token });
};

export { signupUser, loginUser };
