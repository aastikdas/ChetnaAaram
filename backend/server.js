import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import journalRoutes from './routes/journal.js';
import chatRoutes from './routes/chat.js';
import notificationRoutes from './routes/notifications.js';
import botRoutes from './routes/bot.js';
import debugRoutes from './routes/debug.js';
import path from 'path';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }
});

// CORS and JSON middleware should be registered BEFORE any routes/static handlers
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.set('io', io);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/bot', botRoutes);
app.use('/api/debug', debugRoutes);
app.get('/api/health', (req, res) => res.json({ ok: true }));


io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('join', ({ userId }) => {
    socket.join(String(userId));
  });
  socket.on('sendMessage', (msg) => {
    
    io.to(String(msg.to)).emit('message', msg);
  });
  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI )
  .then(() => {
    console.log('Mongo connected');
    server.listen(PORT, () => console.log('Server running on', PORT));
  })
  .catch(err => console.error(err));
