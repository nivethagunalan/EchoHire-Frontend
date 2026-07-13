import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Landing({ theme, setTheme }) {

  const navigate = useNavigate();

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // ✅ BUTTON FIX
  const handleStart = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br 
      from-[#f3e7e9] via-[#e3d5f5] to-[#f5d0c5] 
      dark:from-[#2b0a0a] dark:via-[#0a1a2f] dark:to-[#1a0f2e]
      text-black dark:text-white transition">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5">
        <div className="flex items-center gap-3">
          <img src={logo} className="h-12 w-12 rounded-full shadow-lg" />
          <h1 className="text-xl font-bold">EchoHire</h1>
        </div>

        <button
          onClick={handleThemeToggle}
          className="px-4 py-2 rounded-xl bg-black/10 dark:bg-white/10"
        >
          {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
        </button>
      </nav>

      {/* HERO */}
      <section className="text-center mt-14 px-6">
        <h1 className="text-5xl font-bold leading-tight">
          Crack Your Dream Job 🚀 <br />
          with <span className="text-purple-500">AI Interview Practice</span>
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Practice real interview questions, get instant AI feedback, and improve your skills faster than ever.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleStart}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold shadow-lg"
          >
            Start Interview 🚀
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 rounded-xl border border-gray-400"
          >
            🌻 Create Account
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-20 px-6 max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {[
          { title: "AI Questions", icon: "🤖" },
          { title: "Instant Feedback", icon: "⚡" },
          { title: "Skill Analytics", icon: "📊" },
          { title: "Resume Based", icon: "📄" }
        ].map((f, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white/60 dark:bg-slate-900/60 shadow">
            <div className="text-3xl">{f.icon}</div>
            <p className="mt-3 font-semibold">{f.title}</p>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-20 text-center px-6">
        <h2 className="text-3xl font-bold">How it works</h2>

        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            "Choose your role & difficulty",
            "Answer AI-generated questions",
            "Get feedback & improve"
          ].map((step, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/60 shadow">
              <p className="font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center pb-16">
        <h2 className="text-3xl font-bold">Ready to ace your interview?</h2>

        <button
          onClick={handleStart}
          className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white"
        >
          Get Started Now 🚀
        </button>
      </section>

      <footer className="text-center pb-6 text-sm text-gray-500">
        © 2026 EchoHire
      </footer>
    </div>
  );
}

export default Landing;