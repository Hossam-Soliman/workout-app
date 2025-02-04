import dotenv from 'dotenv';
import path from 'path';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { workoutRoutes } from './routes/workouts';
import { userRoutes } from './routes/users';

// Load environment variables
dotenv.config();

// Express app
const app: Express = express();

// Middlewares
app.use(express.json()); // Middleware to parse JSON request bodies

// API routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Catch-all handler to serve React's index.html for unknown routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONG_URI as string)
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log('Listening on port', PORT);
    });
  })
  .catch((error: unknown) => console.log(error));

export default app;
