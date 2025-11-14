import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SocketContext } from '../context/SocketProvider';

export default function NotificationsPage(){
  const [list, setList] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(()=> {
    fetch();
  }, []);

  useEffect(()=> {
    if (!socket) return;
    socket.on('notification', (n) => {
      setList(prev=> [n, ...prev]);
    });
    return () => socket && socket.off('notification');
  }, [socket]);

  async function fetch(){
    const res = await axios.get('/notifications');
    setList(res.data);
  }

  async function markRead(id){
    await axios.post(`/notifications/${id}/read`);
    setList(l => l.map(x => x._id===id ? {...x, read:true} : x));
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h3 className="text-2xl font-semibold mb-3 text-gray-800 border-b-2 border-gray-300 pb-1">
  Notifications
</h3>

      <div className="space-y-2">
        {list.map(n=> (
          <div key={n._id} className={`p-3 rounded ${n.read ? 'bg-white/30' : 'bg-white/60'}`}>
            <div className="font-semibold">{n.title}</div>
            <div>{n.body}</div>
            <div className="text-sm">{new Date(n.createdAt).toLocaleString()}</div>
            {!n.read && <button onClick={()=>markRead(n._id)} className="mt-2 px-3 py-1 rounded bg-mint">Mark read</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
