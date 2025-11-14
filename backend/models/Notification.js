import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  body: String,
  read: { type: Boolean, default: false },
  meta: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', NotificationSchema);
