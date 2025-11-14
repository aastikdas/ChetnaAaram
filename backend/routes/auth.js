import express from 'express';
const router = express.Router();

// This backend no longer manages local token-based auth.
// Authentication is handled by Clerk (frontend). Keep these routes
// as informational stubs to avoid breaking consumers.
router.post('/register', (req, res) => {
  res.status(410).json({ message: 'Deprecated. Use Clerk for sign-up and authentication.' });
});

router.post('/login', (req, res) => {
  res.status(410).json({ message: 'Deprecated. Use Clerk for sign-up and authentication.' });
});

export default router;
