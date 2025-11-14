import express from 'express';
import Message from '../models/Message.js';
import { auth } from '../middleware/auth.js';
import multer from 'multer';
const router = express.Router();

const upload = multer({ dest: 'uploads/' });


// 1-on-1 chat: send message
router.post('/message', auth, upload.array('attachments'), async (req, res) => {
  const { to, text } = req.body;
  const attachments = (req.files || []).map(f => '/uploads/' + f.filename);
  const msg = await Message.create({ from: req.user.id, to, text, attachments });
  console.log('Message saved to DB:', msg);
  // Emit notification to recipient
  try {
    const io = req.app.get('io');
    if (io && to) io.to(String(to)).emit('message', msg);
  } catch(e){}
  res.json(msg);
});

// 1-on-1 chat: get all messages between two users
router.get('/with/:otherUserId', auth, async (req, res) => {
  const myId = req.user.id;
  const otherId = req.params.otherUserId;
  const msgs = await Message.find({
    $or: [
      { from: myId, to: otherId },
      { from: otherId, to: myId }
    ]
  }).sort('createdAt');
  res.json(msgs);
});

export default router;
