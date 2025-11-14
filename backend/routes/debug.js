import express from 'express';
const router = express.Router();

function base64UrlDecode(input) {
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  return Buffer.from(base64, 'base64').toString('utf8');
}

function decodeTokenPayload(token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

router.get('/token', (req, res) => {
  const header = req.headers.authorization;
  if (!header) return res.status(400).json({ message: 'Missing Authorization header' });
  const token = header.split(' ')[1];
  const payload = decodeTokenPayload(token);
  res.json({ tokenPreview: token ? `${token.slice(0,20)}...` : null, payload });
});

export default router;
