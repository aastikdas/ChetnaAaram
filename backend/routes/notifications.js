import express from 'express';
import Notification from '../models/Notification.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

// Create a notification (therapist/admin can notify)
router.post('/', auth, async (req, res) => {
  const { userId, title, body, meta } = req.body;
  // only therapist/admin can create notifications
  if (req.user.role === 'patient') return res.status(403).json({ message: 'Forbidden' });
  const n = await Notification.create({ user: userId, title, body, meta });
  // emit via socket
  const io = req.app.get('io');
  if (io) io.to(String(userId)).emit('notification', n);
  res.json(n);
});

// List user's notifications
router.get('/', auth, async (req, res) => {
  const list = await Notification.find({ user: req.user.id }).sort('-createdAt');
  res.json(list);
});

// Mark read
router.post('/:id/read', auth, async (req, res) => {
  const n = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(n);
});

export default router;
