import express from 'express';
import { signupUser, loginUser } from '../controllers/userController';

const router = express.Router();

// Signup
router.post('/signup', signupUser);

// Login
router.post('/login', loginUser);

export const userRoutes = router;
