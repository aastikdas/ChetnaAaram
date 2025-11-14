import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [focus, setFocus] = useState('login');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-softLavender to-violet-600">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white/80 rounded-2xl shadow-xl border-2 border-calmBlue overflow-hidden">
        
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 transition-all duration-500">
          <h1 className="text-4xl font-bold mb-2 text-deepBlue">Welcome to ChetnaAaram</h1>
          <p className="mb-6 text-lg text-slate-700 text-center">A calming mental wellness platform — chat, journaling, mood tracking and gentle support.</p>
          <div className="flex gap-4 mb-6">
            <button
              className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all duration-500 bg-calmBlue border-deepBlue text-deepBlue shadow-lg hover:bg-deepBlue hover:text-white`}
              onClick={()=>navigate('/login')}
            >Login</button>
            <button
              className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all duration-500 bg-calmBlue border-deepBlue text-deepBlue shadow-lg hover:bg-deepBlue hover:text-white`}
              onClick={()=>navigate('/register')}
            >Register</button>
          </div>
        </div>
        
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-yellow-300 to-blue-500 p-8 transition-all duration-500">
            <img
            src='./dash.jpg'
            alt={"Mental Health Dashboard Image"}
            className="rounded-xl shadow-lg w-full h-80 object-cover transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}
