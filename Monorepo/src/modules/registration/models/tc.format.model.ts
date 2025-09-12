import mongoose from "mongoose";
import { ITCFormat } from "../controllers/registration.types";

const tcFormatSchema = new mongoose.Schema<ITCFormat>({
  content: { type: String },
  public_id: { type: String }
});

export default mongoose.model<ITCFormat>("TCFormat", tcFormatSchema);
