import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import { Toaster } from 'react-hot-toast';

function App() {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // ✅ FIX LOGIN PERSIST
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>

          <Route path="/" element={
            <Landing theme={theme} setTheme={setTheme} />
          } />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              user ? (
                <Home
                  theme={theme}
                  setTheme={setTheme}
                  setUser={setUser}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;