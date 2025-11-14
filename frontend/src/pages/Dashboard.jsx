import { Link } from 'react-router-dom';

const tabs = [
  {
    title: 'Chat with Helpers',
    to: '/chat',
    desc: 'Start a private, compassionate chat. Share thoughts and get timely replies from helpers or your support network.',
    color: 'from-rose-200 to-red-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.86L3 21l1.14-3.42A8 8 0 113 12c0-1.657.672-3.157 1.757-4.243A5.978 5.978 0 018 6c1.657 0 3.157.672 4.243 1.757A5.978 5.978 0 0114 12z" />
      </svg>
    )
  },
  {
    title: 'Thought Garden',
    to: '/journal',
    desc: 'Write, reflect and revisit your thoughts. Private journals to track progress over time.',
    color: 'from-green-200 to-green-300',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l9-5-9-5-9 5 9 5z" opacity="0.3" />
      </svg>
    )
  },
  {
    title: 'Notifications',
    to: '/notifications',
    desc: 'Keep track of reminders, alerts and important updates.',
    color: 'from-yellow-100 to-yellow-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    )
  },
  {
    title: 'Support Bot',
    to: '/bot',
    desc: 'An empathetic assistant available 24/7 to guide you through small worries and exercises.',
    color: 'from-cyan-100 to-cyan-200',
    icon: (
      <img src="bot.png" alt="Support Bot Icon" />
    )
  },
  {
    title: 'Calm Cinema',
    to: '/calm-cinema',
    desc: 'Short guided meditations and tutorials to watch.',
    color: 'from-indigo-100 to-indigo-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14v-4zM4 6h8v12H4z" />
      </svg>
    )
  },
  {
    title: 'Mindful Moves',
    to: '/mindful-moves',
    desc: 'Exercises, breathing and grounding routines to practice.',
    color: 'from-emerald-100 to-emerald-200',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2v4a3 3 0 006 0v-4c0-1.105-1.343-2-3-2zM12 3v2" />
      </svg>
    )
  },
  // Appointments and prescriptions removed to keep the UI non-clinical
];

export default function Dashboard({ user }){
  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome {user ? `, ${user.name}` : '(error: no username)'}</h1>
          <p className="text-slate-600 mt-2">Choose where you'd like to go — each card highlights what you can do inside.</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">Logged in</div>
          <div className="text-lg font-semibold">{user?.email || 'error'}</div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className={`group relative flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r ${t.color} bg-white/80 hover:shadow-2xl transform transition hover:-translate-y-3 focus:outline-none focus:ring-4 focus:ring-indigo-200`}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-lg bg-white/60 flex items-center justify-center shadow-md">
                {t.icon}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-black">{t.title}</h3>
              <p className="mt-1 text-sm text-slate-700 line-clamp-3">{t.desc}</p>
            </div>

            <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
