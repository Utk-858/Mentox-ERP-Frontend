import mongoose from 'mongoose';
import { ITCGenerated } from '../controllers/registration.types';

const tcGeneratedSchema = new mongoose.Schema<ITCGenerated>({
  tcApplication: { type: mongoose.Schema.Types.ObjectId, ref: 'TCApplication', required: true, unique: true },
  lastClassAttended: { type: String, required: true },
  rollNumber: { type: String, required: true },
  examResultStatus: { type: String, enum: ['Passed', 'Failed', 'Promoted', 'Not Applicable'], required: true },
  duesPaid: { type: Boolean, required: true },
  generalConduct: { type: String, enum: ['Excellent', 'Good', 'Average', 'Poor'], required: true },
  remarks: { type: String, default: '' },
  dateOfIssue: { type: Date, default: Date.now, required: true },
  academicYear: { type: String, required: true, match: [/^\d{4}-\d{2}$/, 'Format must be like 2024-25'] }
}, { timestamps: true });

export default mongoose.model<ITCGenerated>('TCGenerated', tcGeneratedSchema);
