
import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export default function SocketProvider({ children, getToken, userId }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userId) return;

    let mounted = true;
    (async () => {
      try {
        const token = getToken ? await getToken() : null;
        if (!mounted) return;
        const s = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000', { auth: { token }});
        s.on('connect', () => {
          s.emit('join', { userId });
          setSocket(s);
        });
        // cleanup
        const cleanup = () => {
          s.disconnect();
          setSocket(null);
        };
        // attach cleanup to outer effect return
        // but since we are inside async, return via mounted flag and outer return below
      } catch (e) {
        // token fetch failed or socket error
        console.error('Socket setup failed', e);
      }
    })();

    return () => {
      mounted = false;
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [userId, getToken]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
