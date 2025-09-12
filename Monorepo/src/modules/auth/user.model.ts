import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserDocument } from './auth.types';
import { RolePermissionsMap, AllRoles } from '../../config/role-permissions.map';

const userSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: AllRoles,
      required: true,
    },
    department: { type: String },
    permissions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// HOOK: Auto-assign permissions based on role before saving.
userSchema.pre('save', function (next) {
  if ((this.isNew || this.isModified('role')) && (!this.permissions || this.permissions.length === 0)) {
    this.permissions = RolePermissionsMap[this.role] || [];
  }
  next();
});

// HOOK: Hash the user's password before saving.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// INSTANCE METHOD: Compare a candidate password with the user's hashed password.
// This is more efficient as it avoids a redundant database query.
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  // This assumes the user document was queried with .select('+password')
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema);

export default User;

