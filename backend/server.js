require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// Express app
const app = express();

// Middlewares
app.use(express.json()); // Middleware to parse JSON request bodies

// API routes
app.use('/api/workouts', workoutRoutes); // Define your API routes here

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Catch-all handler to serve React's index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log('Listening on port', process.env.PORT || 4000);
    });
  })
  .catch((error) => console.log(error));
