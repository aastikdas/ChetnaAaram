import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  content: String,
  mood: { type: String },
  stressLevel: { type: Number, min: 0, max: 10 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Journal', JournalSchema);
