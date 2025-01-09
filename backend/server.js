require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

//express app
const app = express();

// // Serve static files from the React app build directory
// app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// // Any other routes will be handled by React (client-side routing)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
// });

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
