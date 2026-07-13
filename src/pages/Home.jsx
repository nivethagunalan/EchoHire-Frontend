import { useEffect, useMemo, useState } from 'react';
import logo from '../assets/logo.png';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import Charts from '../components/Charts';
import ProgressBars from '../components/ProgressBars';
import WeakAreas from '../components/WeakAreas';
import { fetchHistory, submitInterview } from '../services/api';
import toast from 'react-hot-toast';
import HistoryPanel from '../components/HistoryPanel';

const defaultStats = {
  scoreTrend: [7, 7.5, 8, 8.3, 8.7]
};

function Home({ theme, setTheme, setUser }) {

  const [role, setRole] = useState('Frontend');
  const [difficulty, setDifficulty] = useState('Medium');
  const [mode, setMode] = useState('Technical');

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');

  const [history, setHistory] = useState([]);
  const [weakAreas, setWeakAreas] = useState([]);

  const [chatMessages, setChatMessages] = useState([
    { id: 'welcome', sender: 'ai', text: 'Welcome to AI Interview Simulator 🚀' }
  ]);

  const [skillScores, setSkillScores] = useState({
    technical: 8,
    communication: 8,
    confidence: 8
  });

  const [sessionId, setSessionId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ FETCH HISTORY
  useEffect(() => {
    fetchHistory()
      .then(data => {
        setHistory(Array.isArray(data) ? data : []);
      })
      .catch(() => setHistory([]));
  }, []);

  const panelData = useMemo(() => ({
    scoreTrend: history.length
      ? history.map(h => h.score || 0).reverse()
      : defaultStats.scoreTrend,
    bars: [
      { label: 'Communication', value: skillScores.communication * 10 },
      { label: 'Technical', value: skillScores.technical * 10 },
      { label: 'Confidence', value: skillScores.confidence * 10 }
    ]
  }), [history, skillScores]);

  // ======================
  // START INTERVIEW
  // ======================
  const handleStartInterview = async () => {
    setIsLoading(true);

    try {
      const result = await submitInterview({
        role,
        difficulty,
        answer: "start",
        resume_text: resumeText,
        mode
      });

      setSessionId(result.session_id);

      const cleanQuestion = result.question.replace(/\*\*/g, "");

      setChatMessages([
        { id: Date.now(), sender: 'ai', text: cleanQuestion }
      ]);

      toast.success("Interview started 🚀");

    } catch {
      toast.error("Failed to start interview");
    } finally {
      setIsLoading(false);
    }
  };

  // ======================
  // SEND ANSWER
  // ======================
  const handleSendAnswer = async () => {

    if (!inputText.trim()) return;
    if (!sessionId) {
      toast.error("Start interview first");
      return;
    }

    setIsLoading(true);

    try {
      const lastQ = chatMessages.at(-1)?.text || "";

      const result = await submitInterview({
        role,
        difficulty,
        answer: inputText,
        question: lastQ,
        resume_text: resumeText,
        session_id: sessionId
      });

      const cleanQ = result.question.replace(/\*\*/g, "");

      if (result.weak_areas?.length) {
        setWeakAreas(result.weak_areas.map((w, i) => ({
          key: i,
          label: w,
          value: 6,
          suggestion: "Practice more"
        })));
      }

      setHistory(prev => [
        {
          score: result.score,
          question: cleanQ,
          session_id: sessionId
        },
        ...prev
      ].slice(0, 10));

      setChatMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'user', text: inputText },
        { id: Date.now()+1, sender: 'ai', text: cleanQ },
        {
          id: Date.now()+2,
          sender: 'ai',
          text: `Score: ${result.score}/10\n${result.feedback}`
        }
      ]);

      setInputText('');

    } catch {
      toast.error("Error sending answer");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (item) => {
    setChatMessages([
      { id: 1, sender: 'ai', text: item.question },
      { id: 2, sender: 'ai', text: `Score: ${item.score}/10` }
    ]);
  };

  return (
    <div className="h-screen flex flex-col 
      bg-gradient-to-br 
      from-[#f3e7e9] via-[#e3d5f5] to-[#f5d0c5] 
      dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]">

      {/* ✅ HEADER FIXED */}
      <header className="flex justify-between items-center px-6 py-3 border-b border-white/10">

        <div className="flex items-center gap-3">
          <img src={logo} className="h-10 w-10 rounded-full" />
          <h1 className="font-bold text-lg text-black dark:text-white">
            EchoHire
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-3 py-1 bg-black/10 dark:bg-white/10 rounded"
          >
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>

          <button
            onClick={() => {
              localStorage.removeItem('token');
              setUser(null);
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-xl"
          >
            Logout
          </button>
        </div>

      </header>

      {/* MAIN */}
      <main className="flex flex-1">

        {/* LEFT SIDEBAR */}
        <div className="w-[340px] flex flex-col border-r border-white/10 h-full">

          {/* CONTROLS */}
          <div className="p-4">
            <Sidebar
              role={role}
              difficulty={difficulty}
              mode={mode}
              resumeFile={resumeFile}
              isLoading={isLoading}
              onRoleChange={setRole}
              onDifficultyChange={setDifficulty}
              onModeChange={setMode}
              onResumeChange={setResumeFile}
              onStartInterview={handleStartInterview}
            />
          </div>

          {/* 🔥 FULL HEIGHT HISTORY */}
         <div className="flex-1 px-4 pb-4">

  <div className="
    bg-white/60 dark:bg-slate-900/70
    backdrop-blur-xl
    rounded-3xl p-4 h-full
    border border-gray-200 dark:border-white/10
    shadow-inner
  ">

    <h2 className="text-lg font-semibold mb-4">
      📜 Interview History
    </h2>

    <HistoryPanel
      history={history}
      onSelectSession={handleSelectHistory}
    />

  </div>
</div>

        </div>

        {/* CENTER CHAT */}
        <div className="flex-1 flex flex-col">

          <div className="flex-1 p-6 overflow-hidden">
            <div className="h-full rounded-3xl border border-white/10 
              bg-white/50 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg">

              <ChatWindow
                messages={chatMessages}
                inputText={inputText}
                onInputChange={setInputText}
                isLoading={isLoading}
                onSend={handleSendAnswer}
              />

            </div>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="w-[360px] p-4 space-y-4 overflow-y-auto">

          <Charts data={panelData} />

          <WeakAreas weakAreas={weakAreas} />

          <ProgressBars bars={panelData.bars} />

        </div>

      </main>

    </div>
  );
}

export default Home;