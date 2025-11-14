# 🌿 ChetnaAaram – Frontend

This is the **frontend** of the **ChetnaAaram** project — a mental awareness and calmness web application.  
Built with **Vite**, **React**, and **Tailwind CSS**, it provides a fast and modern UI experience.

---

## 🚀 Tech Stack

- ⚡ **Vite** – Next-generation frontend tooling
- ⚛️ **React** – UI library for building dynamic interfaces
- 🎨 **Tailwind CSS** – Utility-first CSS framework
- 🌐 **Axios / Fetch** – For API calls
- 🔗 **Socket.io Client** 
- 🔐 **Clerk** – Authentication (Sign-in/Sign-up) is handled by Clerk (client).

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone 
cd frontend
```
### 2. Install Install dependencies 
```bash
npm install
```

### 3. Create environment file
```bash
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
```
### 4. Run the development server
```bash
npm run dev
```

### Notes about authentication
- This project uses Clerk for frontend authentication. The app is already wrapped with `ClerkProvider` in `src/main.jsx`.
- Install the Clerk React SDK with:
```bash
npm install @clerk/clerk-react
```
- The login UI is provided by Clerk components (SignIn modal and UserButton). Protected routes use Clerk's session tokens attached to API requests.
