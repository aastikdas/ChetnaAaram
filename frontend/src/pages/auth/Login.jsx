import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { SignIn, useUser } from '@clerk/clerk-react';

export default function Login(){
  const nav = useNavigate();
  const { isSignedIn } = useUser();
  const [isWaiting, setIsWaiting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const pingRef = useRef();
  const countdownRef = useRef();

  useEffect(() => {
    if (isSignedIn) nav('/dashboard');
  }, [isSignedIn, nav]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    let mounted = true;
    const WAIT_SECONDS = 180;

    const startWaiting = () => {
      if (!mounted) return;
      setIsWaiting(true);
      setSecondsLeft(WAIT_SECONDS);

      countdownRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            clearInterval(countdownRef.current);
            setIsWaiting(false);
            if (pingRef.current) clearInterval(pingRef.current);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      pingRef.current = setInterval(async () => {
        try {
          await axios.get('/health');
          clearInterval(pingRef.current);
          clearInterval(countdownRef.current);
          setIsWaiting(false);
          setSecondsLeft(0);
          toast.success('Service is ready. You can login now.');
        } catch (e) {
          
        }
      }, 8000);
    };

    return () => {
      mounted = false;
      if (pingRef.current) clearInterval(pingRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint via-softLavender to-calmBlue">
      <div className="w-full max-w-3xl flex bg-gradient-to-br from-green-300 to-blue-200 rounded-2xl shadow-xl border-2 border-black overflow-hidden">
        
        <div className="w-full md:w-2/3 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <SignIn path="/login" routing="path" fallbackRedirectUrl="/dashboard" />
          </div>
        </div>
        
        <div className="hidden md:flex w-1/3 items-center justify-center mr-10">
          <img src='./login.jpg' alt="Mental health illustration" className="rounded-xl shadow-lg w-full h-80 object-cover" />
        </div>
        {isWaiting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative max-w-lg w-full mx-4 bg-white rounded-xl p-8 shadow-2xl text-center">
              <h3 className="text-2xl font-bold mb-2">Waking up the service</h3>
              <p className="text-sm text-slate-700 mb-4">Our backend is waking up (this can take a minute). Please stay on this page — you'll be able to login shortly.</p>
              <div className="text-4xl font-mono mb-4">{formatTime(secondsLeft)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
