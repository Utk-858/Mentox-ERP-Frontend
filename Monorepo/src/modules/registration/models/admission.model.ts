import mongoose from 'mongoose';
import { IAdmission } from '../controllers/registration.types';

const admissionSchema = new mongoose.Schema<IAdmission>({
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentApplication', required: true, unique: true },
  admissionNumber: { type: String, required: true, unique: true },
  classEnrolled: { type: String, required: true, match: [/^[1-9][0-2]?(st|nd|rd|th)$/, 'Enter class like 1st, 10th'] },
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
  academicYear: { type: String, required: true, match: [/^\d{4}-\d{2}$/, 'Format must be like 2025-26'] },
  admissionDate: { type: Date, default: Date.now },
  house: { type: mongoose.Schema.Types.ObjectId, ref: "House" }
}, { timestamps: true });

export default mongoose.model<IAdmission>('Admission', admissionSchema);
