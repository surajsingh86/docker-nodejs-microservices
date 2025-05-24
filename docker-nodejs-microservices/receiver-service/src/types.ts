import { Document } from 'mongoose';

export interface UserData {
  user: string;
  class: string;
  age: number;
  email: string;
}

export interface UserRecord extends UserData {
  id: string;
  inserted_at: Date;
}

export interface UserDocument extends UserRecord, Document {
  id: string;
} 