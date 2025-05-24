import mongoose, { Schema } from 'mongoose';
import { UserDocument } from '../types';

const userSchema = new Schema<UserDocument>({
  id: { type: String, required: true, unique: true },
  user: { type: String, required: true },
  class: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  inserted_at: { type: Date, required: true },
  modified_at: { type: Date, default: Date.now }
});

export const User = mongoose.model<UserDocument>('User', userSchema); 