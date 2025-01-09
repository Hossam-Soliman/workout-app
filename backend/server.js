require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

//express app
const app = express();

//middlewares
app.use(express.json());

//routes
app.use('/api/workouts', workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log('listening to port', process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
