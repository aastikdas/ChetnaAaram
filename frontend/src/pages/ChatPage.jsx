import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SocketContext } from '../context/SocketProvider';
export default function ChatPage({ user }){
 
  const socket = useContext(SocketContext);
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null); 
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    if (!socket || !user?._id) return;
    socket.emit('join', { userId: user._id });
  }, [socket, user]);


  useEffect(() => {
    axios.get('/users').then(res => {
      setContacts(res.data.filter(u => u._id !== user?._id));
    });
  }, [user]);

  useEffect(() => {
    if (!selected) return setMsgs([]);
    axios.get(`/chat/with/${selected._id}`).then(res => {
      console.log('Fetched messages from backend:', res.data);
      setMsgs(res.data);
    });
  }, [selected, user]);

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (m) => {
      if (selected && ((m.from === selected._id && m.to === user._id) || (m.from === user._id && m.to === selected._id))) {
        setMsgs(prev => [...prev, m]);
      }
    });
    return () => socket && socket.off('message');
  }, [socket, selected, user]);

  const send = async () => {
    if (!text) {
      toast.error('Message cannot be empty');
      return;
    }
    if (!selected) {
      toast.error('Select a contact to chat');
      return;
    }
    if (!socket) {
      toast.error('Socket connection not established');
      return;
    }
    const msg = {
      text,
      to: selected._id
    };
    try {
      
      const res = await axios.post('/chat/message', msg);
      console.log('Saved message to backend:', res.data);
      
      socket.emit('sendMessage', res.data);
      setText('');
      setMsgs(prev => [...prev, res.data]);
    } catch (e) {
      toast.error('Failed to send message');
      console.error(e);
    }
  };

  return (
    <div className="min-h-[80vh] flex bg-white/80 rounded-xl shadow-xl border border-calmBlue overflow-hidden">
      
      <div className="w-1/3 min-w-[220px] bg-softLavender border-r border-calmBlue p-4 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4 text-deepBlue">Chats</h3>
        {contacts.map(c => (
          <div
            key={c._id}
            className={`flex items-center gap-3 p-2 mb-2 rounded-lg cursor-pointer transition-all ${selected?._id===c._id ? 'bg-mint shadow' : 'hover:bg-calmBlue/40'}`}
            onClick={() => setSelected(c)}
          >
            {c.avatar ? (
              <img src={c.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <FaUserCircle className="w-8 h-8 text-calmBlue" />
            )}
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-slate-500">{c.role}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-calmBlue bg-white/60">
          {selected?.avatar ? (
            <img src={selected.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <FaUserCircle className="w-10 h-10 text-calmBlue" />
          )}
          <div>
            <div className="font-bold text-deepBlue">{selected?.name || 'Select a contact'}</div>
            <div className="text-xs text-slate-500">{selected?.role}</div>
          </div>
        </div>
        <div className="flex-1 h-96 overflow-y-auto p-4 bg-white/40">
          {msgs.length === 0 && <div className="text-center text-slate-400 mt-10">No messages yet.</div>}
          {msgs.map((m,i) => (
            <div key={i} className={`flex mb-4 ${m.from===user._id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg shadow ${m.from===user._id ? 'bg-mint text-right' : 'bg-calmBlue text-left'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {m.from===user._id ? (
                    user.avatar ? <img src={user.avatar} alt="avatar" className="w-6 h-6 rounded-full" /> : <FaUserCircle className="w-6 h-6 text-mint" />
                  ) : (
                    selected?.avatar ? <img src={selected.avatar} alt="avatar" className="w-6 h-6 rounded-full" /> : <FaUserCircle className="w-6 h-6 text-calmBlue" />
                  )}
                  <span className="font-semibold text-xs">{m.from===user._id ? 'You' : selected?.name}</span>
                  <span className="text-xs text-slate-400 ml-2">{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div>{m.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-calmBlue bg-white/60 flex gap-2">
          <input
            value={text}
            onChange={e=>setText(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-calmBlue focus:outline-none focus:ring-2 focus:ring-mint"
            placeholder={selected ? `Message ${selected.name}` : 'Select a contact to chat'}
            disabled={!selected}
          />
          <button
            onClick={send}
            className="px-5 py-3 rounded-lg bg-mint text-deepBlue font-semibold shadow hover:bg-calmBlue transition"
            disabled={!selected || !text}
          >Send</button>
        </div>
      </div>
    </div>
  );
}
