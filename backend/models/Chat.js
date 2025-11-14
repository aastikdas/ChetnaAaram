
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  from: { type: String, enum: ['user', 'bot'], required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: true }
});

chatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

export default mongoose.model('Chat', chatSchema);
