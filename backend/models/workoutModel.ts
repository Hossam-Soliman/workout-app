import mongoose, { Document, Schema, Model } from 'mongoose';

interface IWorkout extends Document {
  title: string;
  reps: number;
  load: number;
  userId: string;
}

const workoutSchema: Schema<IWorkout> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
