import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


// Example avatar URLs or SVG
const botAvatar = '🤖'; // Replace with SVG or image if you want
const userAvatar = '🧑'; // Replace with SVG or image if you want

export default function BotPage() {
  const [text, setText] = useState('');
  const [chat, setChat] = useState([]); // [{from: 'user'|'bot', text: '...'}]
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom whenever chat updates
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat, loading]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setChat((prev) => [...prev, { from: 'user', text }]);
    setLoading(true);
    try {
      const res = await axios.post('/bot/ask', { question: text });
      setChat((prev) => [...prev, { from: 'bot', text: res.data.answer }]);
    } catch (err) {
      setChat((prev) => [...prev, { from: 'bot', text: 'Sorry, the bot is unavailable.' }]);
      console.error('Bot error:', err);
    }
    setText('');
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h3 className="text-xl mb-2">Support Bot</h3>
      <div className="bg-white/60 rounded shadow p-4 min-h-[350px] max-h-[60vh] flex flex-col gap-3 overflow-y-auto" style={{scrollBehavior: 'smooth'}}>
        {chat.length === 0 && (
          <div className="text-center text-slate-400">Start a conversation with the bot.</div>
        )}
        {chat.map((msg, i) => (
  <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[70%] p-3 rounded-lg shadow ${msg.from === 'user' ? 'bg-mint text-right' : 'bg-calmBlue text-left'}`}>
      <span className="font-semibold text-xs">{msg.from === 'user' ? 'You' : 'Bot'}</span>
      <div>
        {msg.from === 'bot'
          ? <ReactMarkdown>{msg.text}</ReactMarkdown>
          : msg.text}
      </div>
    </div>
  </div>
))}
        {loading && (
          <div className="flex items-end gap-2 justify-start">
            <span className="text-2xl">{botAvatar}</span>
            <div className="max-w-[70%] p-3 rounded-lg shadow bg-calmBlue text-left text-xs text-slate-500 flex items-center gap-2">
              <span className="loading-dots"> 
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-150">.</span>
                <span className="animate-bounce delay-300">.</span>
              </span>
              Bot is typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>
      <form onSubmit={send} className="flex gap-2 mt-4">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 p-2 rounded border border-calmBlue resize-none"
          rows={2}
          placeholder="Type your question..."
          disabled={loading}
        />
        <button 
          className="px-5 py-2 rounded bg-mint font-semibold"
          disabled={loading || !text.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
