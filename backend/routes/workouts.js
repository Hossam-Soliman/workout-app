const express = require('express');
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//protect all workout routes
router.use(requireAuth);

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
