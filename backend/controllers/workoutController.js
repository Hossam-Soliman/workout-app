const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req, res) => {
  const userId = req.user._id;

  try {
    const workouts = await Workout.find({ userId });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout found' });
  }
  try {
    const workout = await Workout.findById(id).sort({ createdAt: -1 });
    if (!workout) {
      return res.status(404).json({ error: 'No such workout found' });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//create new workout
const createWorkout = async (req, res) => {
  const dataBody = req.body;

  let emptyFields = [];

  if (!dataBody?.title) {
    emptyFields.push('title');
  }
  if (!dataBody?.load) {
    emptyFields.push('load');
  }
  if (!dataBody?.reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }
  const userId = req.user._id;
  try {
    const workout = await Workout.create({ ...dataBody, userId });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such workout found' });
    }
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ error: 'No such workout found' });
    }
    res.status(200).json(workout);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//update workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBody = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such workout found' });
    }
    const workout = await Workout.findOneAndUpdate({ _id: id }, dataBody);
    if (!workout) {
      return res.status(404).json({ error: 'No such workout found' });
    }
    res.status(200).json(workout);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
