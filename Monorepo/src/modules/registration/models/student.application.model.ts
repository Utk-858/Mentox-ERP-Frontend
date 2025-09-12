import mongoose from 'mongoose';
import { IStudentApplication } from '../controllers/registration.types';

const studentApplicationSchema = new mongoose.Schema<IStudentApplication>({
  studentName: { type: String, required: true, trim: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
  nationality: { type: String, default: 'Indian' },
  email: { type: String, required: true, lowercase: true, match: [/.+\@.+\..+/, 'Please enter a valid email'] },
  parentNumber: { type: String, required: true, match: [/^\d{10}$/, 'Enter a valid 10-digit phone number'] },
  alternateNumber: { type: String, match: [/^\d{10}$/, 'Enter a valid 10-digit phone number'] },
  fatherName: { type: String, trim: true },
  fatherOccupation: { type: String, trim: true },
  motherName: { type: String, trim: true },
  motherOccupation: { type: String, trim: true },
  guardianName: { type: String, trim: true },
  address: { type: String, trim: true },
  weight: { type: Number, min: 1, max: 300 },
  height: { type: Number, min: 30, max: 250 },
  aadharNumber: { type: String, unique: true, required: true, match: [/^\d{12}$/, 'Enter a valid 12-digit Aadhar number'] },
  category: { type: String, enum: ['General', 'OBC', 'SC', 'ST', 'Other'], required: true },
  minorityGroup: { type: String, enum: ['Muslim', 'Christian', 'Sikh', 'Buddhist', 'Parsi', 'None'], default: 'None' },
  isBPL: { type: Boolean, default: false },
  isEWS: { type: Boolean, default: false },
  isCWSN: { type: Boolean, default: false },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  applicationDate: { type: Date, default: Date.now },
  applicationStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  photo: { type: String },
  aadharphoto: { type: String },
  casteCertificate: { type: String },
  parentID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model<IStudentApplication>('StudentApplication', studentApplicationSchema);
