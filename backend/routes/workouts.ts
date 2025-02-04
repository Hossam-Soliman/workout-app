import express, { Request, Response, NextFunction } from 'express';
import {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from '../controllers/workoutController';
import requireAuth from '../middleware/requireAuth';

const router = express.Router();

// Protect all workout routes
router.use(requireAuth);

// Get workouts list
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getWorkouts(req, res);
  } catch (error) {
    next(error);
  }
});

// Get single workout
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getWorkout(req, res);
  } catch (error) {
    next(error);
  }
});

// Add new workout
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createWorkout(req, res);
  } catch (error) {
    next(error);
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteWorkout(req, res);
  } catch (error) {
    next(error);
  }
});

// Update workout
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateWorkout(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
