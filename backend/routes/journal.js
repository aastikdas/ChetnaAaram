import express from 'express';
import Journal from '../models/Journal.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

// Create
router.post('/', auth, async (req, res) => {
  const data = { ...req.body, user: req.user.id };
  const j = await Journal.create(data);
  res.json(j);
});

// List user's journals
router.get('/', auth, async (req, res) => {
  const list = await Journal.find({ user: req.user.id }).sort('-createdAt');
  res.json(list);
});

export default router;
