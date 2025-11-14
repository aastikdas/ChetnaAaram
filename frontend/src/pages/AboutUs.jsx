import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Real-time Chat',
    description: 'Connect instantly with trained helpers or peers using our secure, Socket.io-powered chat system. Enjoy private 1-on-1 conversations, group support, and a WhatsApp-like interface.'
  },
  {
    title: 'Journaling & Mood Tracking',
    description: 'Maintain a personal journal, track your mood, and reflect on your wellness journey. All entries are private and can be shared with a trusted supporter if you choose.'
  },
  {
    title: 'Notifications',
    description: 'Stay updated with real-time notifications for new messages and reminders. Never miss an important update.'
  },
  {
    title: 'Support Bot',
    description: 'Access instant support with our AI-powered therapeutic bot. Get calming advice, quick tips, and answers to common mental health questions.'
  },
  {
    title: 'File Uploads',
    description: 'Upload and download files securely. Share documents with a trusted contact or keep personal records organized.'
  }
];

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-mint via-softLavender to-calmBlue p-8">
      <div className="max-w-6xl w-full bg-white/90 rounded-2xl shadow-xl border-2 border-calmBlue p-8 mb-8">
        <h1 className="text-4xl font-bold text-center text-deepBlue mb-6">About ChetnaAaram</h1>
        <p className="text-lg text-center text-slate-700 mb-8">ChetnaAaram is a modern mental health platform designed to support your wellness journey. Explore our features below:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="
                  transition-all duration-1000 
                  rounded-xl border border-black 
                  bg-gradient-to-br from-purple-200 to-blue-500 
                  p-6 shadow hover:shadow-lg 
                  hover:from-blue-500 hover:to-purple-200 
                  hover:bg-gradient-to-br
                  hover:border-calmBlue
                  hover:bg-mint/40
                  cursor-pointer
                "

            >
              <div className="text-2xl font-semibold text-deepBlue mb-2">{f.title}</div>
              <div className="text-slate-700 text-base">{f.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center bg-gray-300 rounded-lg p-6 shadow-lg">
          <p className="text-lg font-semibold text-deepBlue mb-4">Ready to begin your journey?</p>
          <Link to="/login" className="px-6 py-3 rounded-lg bg-green-500 text-deepBlue font-bold shadow hover:bg-green-400 transition-all mr-4">Login</Link>
          <Link to="/register" className="px-6 py-3 rounded-lg bg-orange-400 text-deepBlue font-bold shadow hover:bg-orange-700 transition-all">Register</Link>
        </div>
      </div>
    </div>
  );
}
