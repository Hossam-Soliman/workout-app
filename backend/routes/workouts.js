const express = require('express');
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');

//get workouts list
router.get('/', getWorkouts);

//get single workout
router.get('/:id', getWorkout);

//add new workout
router.post('/', createWorkout);

//delete workout
router.delete('/:id', deleteWorkout);

//update workout
router.patch('/:id', updateWorkout);

module.exports = router;
