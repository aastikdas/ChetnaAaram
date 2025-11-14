import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key (set VITE_CLERK_PUBLISHABLE_KEY in .env)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key (set VITE_CLERK_PUBLISHABLE_KEY in your .env)')
}

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element with id "root" not found');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)