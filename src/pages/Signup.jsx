import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:5000/signup', {
        name,
        email,
        password
      });

      toast.success("Account created 🎉");

      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);

    } catch (err) {
      toast.error(err?.response?.data?.error || "Signup failed");
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
          Create Account 🚀
        </h2>

        <input
          placeholder="Full Name"
          className="w-full mb-3 p-3 rounded-xl border"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-3 rounded-xl border"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-xl border"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white p-3 rounded-xl font-semibold"
        >
          Sign Up
        </motion.button>

        <p className="text-sm text-center mt-4 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;