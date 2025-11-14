import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();

function base64UrlDecode(input) {
  // Replace URL-safe chars
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  // Pad with '='
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

export const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];

  // Decode token payload (no signature verification here).
  const payload = decodeTokenPayload(token) || {};

  // Derive an email to look up/create the user. Use sub as fallback.
  const email = (payload.email && String(payload.email).toLowerCase()) || (payload.email_address && String(payload.email_address).toLowerCase()) || (payload.sub ? `${payload.sub}@clerk.local` : null);

  if (!email) return res.status(401).json({ message: 'Invalid token payload' });

  try {
    let userRecord = await User.findOne({ email });
    if (!userRecord) {
      const placeholder = `clerk_${Date.now()}`;
      userRecord = await User.create({
        name: payload.name || payload.fullName || 'Clerk User',
        email,
        password: placeholder,
        avatar: payload.profileImageUrl || payload.avatar_url || undefined
      });
    }

    req.user = { id: String(userRecord._id), email: userRecord.email, role: userRecord.role };
    return next();
  } catch (e) {
    console.error('Auth middleware error:', e);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
