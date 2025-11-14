import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: String,
  text: String,
  attachments: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Message', MessageSchema);
