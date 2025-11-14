import React from 'react';
import { SignUp, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register(){
  const { isSignedIn } = useUser();
  const nav = useNavigate();
  React.useEffect(() => { if (isSignedIn) nav('/dashboard'); }, [isSignedIn, nav]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-softLavender to-red-400">
      <div className="w-full max-w-3xl flex bg-gradient-to-br from-yellow-200 to-mint  rounded-2xl shadow-xl border-2 border-black overflow-hidden">
        
        <div className="w-full md:w-2/3 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <SignUp path="/register" routing="path" fallbackRedirectUrl="/dashboard" />
          </div>
        </div>
        
        <div className="hidden md:flex w-1/3 items-center justify-center mr-8 ">
          <img src='./register2.jpg' alt="Mental health illustration" className="rounded-xl shadow-lg w-full h-80 object-cover" />
        </div>
      </div>
    </div>
  );
}
