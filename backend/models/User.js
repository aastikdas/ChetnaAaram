import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient','therapist','admin'], default: 'patient' },
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
