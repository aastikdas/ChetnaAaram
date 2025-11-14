import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function JournalPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('calm');
  const [stress, setStress] = useState(3);
  const [list, setList] = useState([]);

  const getMoodFromStress = (stress) => {
    if (stress <= 2) return "calm";
    if (stress <= 5) return "happy";
    if (stress <= 7) return "anxious";
    return "sad";
  };

  useEffect(() => { fetchList(); }, []);

  async function fetchList() {
    try {
      const res = await axios.get('/journal');
      setList(res.data);
    } catch (err) { }
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/journal', { title, content, mood, stressLevel: stress });
      toast.success('Saved');
      setTitle(''); setContent('');
      fetchList();
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-slate-800">Thought Garden</h2>

      
      <form
        onSubmit={submit}
        className=" p-6 rounded-2xl shadow-lg space-y-4 bg-gradient-to-br from-red-300 to-yellow-200"
      >
        <div className="flex flex-col gap-2">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-mint focus:outline-none transition"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your thoughts..."
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-mint focus:outline-none transition resize-none h-32"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <div className="flex gap-3 mt-2">
            {["calm", "happy", "anxious", "sad"].map((m) => {
              
              const moodEmoji = {
                calm: "😌",
                happy: "😄",
                anxious: "😟",
                sad: "😢",
              };
              const moodColor = {
                calm: "bg-blue-400",
                happy: "bg-green-400",
                anxious: "bg-yellow-400",
                sad: "bg-gray-400",
              };

              return (
                <div
                  key={m}
                  className={`flex items-center justify-center p-2 rounded-lg font-semibold cursor-default ${mood === m ? `${moodColor[m]} text-white` : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {moodEmoji[m]} {m.charAt(0).toUpperCase() + m.slice(1)}
                </div>
              );
            })}
          </div>


          <div className="flex flex-1 items-center gap-2">
            <label className="text-sm font-medium w-20">Stress Level</label>
            <input
              type="range"
              min="0"
              max="10"
              value={stress}
              onChange={(e) => {
                const newStress = Number(e.target.value);
                setStress(newStress);
                setMood(getMoodFromStress(newStress));
              }}
              className="flex-1 accent-mint"
            />

            <span className="w-8 text-sm text-gray-600">{stress}</span>
          </div>

          <button
            type="submit"
            className={`px-6 py-2 bg-mint text-black rounded-lg font-semibold hover:shadow-lg transition ${!title.trim() || !content.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={!title.trim() || !content.trim()}
          >
            Save
          </button>

        </div>
      </form>

      
      <div className="mt-8 space-y-4">
        {list.map(item => (
          <div
            key={item._id}
            className=" bg-gradient-to-br from-blue-300 to-violet-400 p-4 rounded-2xl shadow hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-black"
          >
            <div className="flex flex-col gap-1">
              <div className="text-sm text-black">{new Date(item.createdAt).toLocaleString()}</div>
              <div className="font-semibold text-lg">{item.title}</div>
              <div className="">{item.content}</div>
            </div>

            <div className="flex flex-col md:items-end gap-2 mt-3 md:mt-0">
              
              <span className={`px-3 py-1 rounded-full font-semibold text-white 
            ${item.mood === 'calm' ? 'bg-blue-400' :
                  item.mood === 'happy' ? 'bg-green-400' :
                    item.mood === 'anxious' ? 'bg-yellow-400' :
                      'bg-gray-400'}`}>
                {item.mood === 'calm' ? '😌 Calm' :
                  item.mood === 'happy' ? '😄 Happy' :
                    item.mood === 'anxious' ? '😟 Anxious' : '😢 Sad'}
              </span>

              
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-red-400 rounded-full"
                  style={{ width: `${(item.stressLevel / 10) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">{item.stressLevel}/10</span>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
