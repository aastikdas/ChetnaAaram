import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { SignIn, useUser } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';

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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint via-softLavender to-calmBlue">
      <div className="w-full max-w-3xl flex bg-gradient-to-br from-green-300 to-blue-200 rounded-2xl shadow-xl border-2 border-black overflow-hidden">
        <div className="w-2/3 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <SignIn path="/login" routing="path" fallbackRedirectUrl="/dashboard" />
          </div>
        </div>
        <div className="hidden md:flex w-1/3 items-center justify-center mr-10">
          <img src='./login.jpg' alt="Mental health illustration" className="rounded-xl shadow-lg w-full h-80 object-cover" />
        </div>
        
        
      </div>
    </div>
  );
}
