import mongoose from 'mongoose';
import { ICounter } from '../controllers/registration.types';

const counterSchema = new mongoose.Schema<ICounter>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

export default mongoose.model<ICounter>('Counter', counterSchema);

