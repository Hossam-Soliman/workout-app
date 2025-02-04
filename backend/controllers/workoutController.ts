import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Workout from '../models/workoutModel';

// Get all workouts
const getWorkouts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as any).user._id; // Ensure proper typing in middleware
    const workouts = await Workout.find({ userId });
    return res.status(200).json(workouts);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
    return res.status(500).json({ error: errorMessage });
  }
};

// Get a single workout
const getWorkout = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout found' });
  }

  try {
    const workout = await Workout.findById(id).sort({ createdAt: -1 });

    if (!workout) {
      return res.status(404).json({ error: 'No such workout found' });
    }

    return res.status(200).json(workout);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
    return res.status(500).json({ error: errorMessage });
  }
};

// Create a new workout
const createWorkout = async (req: Request, res: Response): Promise<Response> => {
  const dataBody = req.body;

  let emptyFields: string[] = [];

  if (!dataBody?.title) emptyFields.push('title');
  if (!dataBody?.load) emptyFields.push('load');
  if (!dataBody?.reps) emptyFields.push('reps');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const userId = (req as any).user._id; // Ensure proper typing in middleware
    const workout = await Workout.create({ ...dataBody, userId });
    return res.status(200).json(workout);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
    return res.status(400).json({ error: errorMessage });
  }
};

// Delete a workout
const deleteWorkout = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout found' });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(404).json({ error: 'No such workout found' });
    }

    return res.status(200).json(workout);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
    return res.status(500).json({ error: errorMessage });
  }
};

// Update a workout
const updateWorkout = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const dataBody = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout found' });
  }

  try {
    const workout = await Workout.findOneAndUpdate({ _id: id }, dataBody, { new: true });

    if (!workout) {
      return res.status(404).json({ error: 'No such workout found' });
    }

    return res.status(200).json(workout);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
    return res.status(500).json({ error: errorMessage });
  }
};

export { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout };
