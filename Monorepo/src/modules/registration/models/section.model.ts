import mongoose from "mongoose";
import { ISection } from "../controllers/registration.types";

const sectionSchema = new mongoose.Schema<ISection>({
  class: { type: Number, required: true },
  name: { type: String, required: true },
  capacity: { type: Number },
  assignmentStatus: { type: String, enum: ["Not Started", "In progress", "Complete"] },
  academicYear: { type: String, match: [/^\d{4}-\d{2}$/, 'Format must be like 2025-26'], required: true },
  roomNo: { type: String },
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // Assuming a Teacher model exists
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }] // Assuming a Subject model exists
});

export default mongoose.model<ISection>("Section", sectionSchema);
