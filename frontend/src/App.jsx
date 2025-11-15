import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import JournalPage from './pages/JournalPage';
import NotificationsPage from './pages/NotificationsPage';
import BotPage from './pages/BotPage';
import AboutUs from './pages/AboutUs';
import CalmCinema from './pages/CalmCinema';
import MindfulMoves from './pages/MindfulMoves';
import SocketProvider from './context/SocketProvider';
import axios from 'axios';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth, useUser } from '@clerk/clerk-react';


function PrivateRoute({ children }) {
  const location = useLocation();
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <div className="text-center mt-10">Checking authentication...</div>;
  if (!isSignedIn) {
    toast.error('You must login first!');
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}

export default function App() {
  const { getToken, isLoaded } = useAuth();
  const { user } = useUser();
  // Normalize Clerk user object to a simple shape used by pages:
  // name, email, id. Clerk's user object may expose different fields
  // (fullName, firstName/lastName, primaryEmailAddress), so try several.
  const appUser = user ? {
    id: user.id || user?.user?.id,
    // include _id to remain compatible with components expecting Mongo-style _id
    _id: user.id || user?.user?.id,
    name: user.fullName || [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || (user.primaryEmailAddress && user.primaryEmailAddress.emailAddress) || user.email || undefined,
    email: (user.primaryEmailAddress && user.primaryEmailAddress.emailAddress) || user.email || undefined,
  } : null;
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [theme, setTheme] = useState('light');


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);


  axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

  useEffect(() => {
    let interceptor;
    if (!isLoaded) return;
    interceptor = axios.interceptors.request.use(async (config) => {
      try {
        const t = await getToken();
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${t}`;
      } catch (e) {
        
      }
      return config;
    });
    return () => { if (interceptor !== undefined) axios.interceptors.request.eject(interceptor); };
  }, [getToken, isLoaded]);



  return (
    <BrowserRouter>
      <Toaster />
  <SocketProvider getToken={getToken} userId={appUser?._id}>
        <div className="min-h-screen w-full">
          <div className="">
          <nav className="flex items-center justify-between m-auto p-4 w-2/3 bg-gradient-to-br from-indigo-400 to-green-300 rounded-full shadow-lg mt-4 sticky top-4 hover:shadow-xl transition-all duration-300 shadow-red-200">
            <Link
              to={isLoaded && user ? "/dashboard" : "/"}
              aria-label="Chetna Aaram Home"
              className="inline-flex items-center gap-3 font-extrabold text-2xl md:text-3xl transform transition-transform duration-300 hover:scale-105"
            >
              <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-pink-500 to-yellow-400 shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
                  <path d="M12 2C13.1046 2 14 2.89543 14 4V10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10V4C10 2.89543 10.8954 2 12 2Z" fill="white" opacity="0.95" />
                  <path d="M6 12C7.10457 12 8 12.8954 8 14V20C8 21.1046 7.10457 22 6 22C4.89543 22 4 21.1046 4 20V14C4 12.8954 4.89543 12 6 12Z" fill="white" opacity="0.9" />
                  <path d="M18 12C19.1046 12 20 12.8954 20 14V20C20 21.1046 19.1046 22 18 22C16.8954 22 16 21.1046 16 20V14C16 12.8954 16.8954 12 18 12Z" fill="white" opacity="0.9" />
                </svg>
                
              </span>

              
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-400">
                ChetnaAaram
              </span>
            </Link>
            <div className="space-x-3">
              {/* <button
                onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                className="px-3 py-1 rounded bg-white/60"
              >
                Toggle Theme
              </button> */}
              <SignedOut>
                <Link to="/login" className="px-3 py-1 rounded bg-white/60">Login</Link>
                <Link to="/register" className="px-3 py-1 rounded bg-white/60">Register</Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <Link
                to="/about-us"
                aria-label="About ChetnaAaram"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-300  to-yellow-200 font-semibold shadow-lg hover:scale-105 transform transition-transform duration-200 ring-1 ring-white/20"
              >
                <span>About Us</span>
              </Link>
            </div>
          </nav>
          </div>
          
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/register/*" element={<Register />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                    <Dashboard user={appUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                    <ChatPage user={appUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/journal"
              element={
                <PrivateRoute>
                    <JournalPage user={appUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/bot"
              element={
                <PrivateRoute>
                    <BotPage user={appUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/calm-cinema"
              element={
                <PrivateRoute>
                    <CalmCinema user={appUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/mindful-moves"
              element={
                <PrivateRoute>
                    <MindfulMoves user={appUser} />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </SocketProvider>
    </BrowserRouter>
  );
}
