import mongoose from "mongoose";
import { IHouse } from "../controllers/registration.types";

const houseSchema = new mongoose.Schema<IHouse>({
  name: { type: String, required: true },
  colorAssociated: { type: String }
});

export default mongoose.model<IHouse>("House", houseSchema);
