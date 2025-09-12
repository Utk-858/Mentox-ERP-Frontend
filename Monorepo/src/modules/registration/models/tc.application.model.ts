import mongoose from 'mongoose';
import { ITCApplication } from '../controllers/registration.types';

const tcApplicationSchema = new mongoose.Schema<ITCApplication>({
  admission: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission', required: true, unique: true },
  reasonForLeaving: { type: String, required: true, trim: true },
  dateOfApplication: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model<ITCApplication>('TCApplication', tcApplicationSchema);
