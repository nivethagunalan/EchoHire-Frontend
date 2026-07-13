import { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { loginUser } from '../services/api';

function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Enter email & password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email,
        password
      });

      localStorage.setItem('token', res.token);

      setUser({
        email,
        token: res.token
      });

      toast.success("Login successful 🚀");

      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-orange-200 dark:from-[#2b0a0a] dark:via-[#0a1a2f] dark:to-[#1a0f2e]">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[420px]"
      >

        <img src={logo} className="h-20 mx-auto mb-4 rounded-full" />

        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Welcome Back 👋
        </h2>

        {/* ✅ EMAIL FIX */}
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-xl border focus:ring-2 focus:ring-purple-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* ✅ PASSWORD FIX */}
        <div className="relative mb-4">
          <input
            type={show ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-3 text-sm text-gray-500"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white p-3 rounded-xl font-semibold"
        >
          {loading ? "Logging in..." : "Login 🚀"}
        </motion.button>

        <p className="text-sm text-center mt-5 dark:text-gray-300">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-purple-600 font-semibold">
            🌻 Sign up
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default Login;