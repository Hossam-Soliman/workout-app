import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as { id: string };

    const user = await User.findOne({ _id: decodedToken.id }).select<{ _id: string }>('_id');
    if (!user) {
      res.status(401).json({ error: 'User not found' });
    }
    req.user = { _id: user._id.toString() };

    next();
  } catch (err) {
    res.status(401).json({ error: 'Request isn\'t authorized' });
  }
};

export default requireAuth;
