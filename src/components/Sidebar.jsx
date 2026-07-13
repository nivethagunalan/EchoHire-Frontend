import ResumeUpload from './ResumeUpload';

const roles = ['Frontend', 'Backend', 'Full Stack', 'HR'];
const difficulties = ['Easy', 'Medium', 'Hard'];
const modes = ['HR', 'Technical', 'Resume'];

function Sidebar({
  role,
  difficulty,
  mode,
  resumeFile,
  history,
  isLoading,
  onRoleChange,
  onDifficultyChange,
  onModeChange,
  onResumeChange,
  onStartInterview
}) {
  return (
    <aside className="flex h-full flex-col justify-between 
      rounded-3xl border border-white/10 
      bg-white/60 dark:bg-slate-900/70 
      p-5 shadow-xl backdrop-blur-xl space-y-6">

      {/* TOP */}
      <div className="space-y-6 overflow-y-auto pr-1">

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
            Setup
          </p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Interview Config
          </h2>
        </div>

        {/* MODE */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600 dark:text-slate-400">
            Interview Mode
          </p>

          <div className="grid grid-cols-3 gap-2">
            {modes.map((item) => (
              <button
                key={item}
                onClick={() => onModeChange(item)}
                className={`rounded-xl px-3 py-2 text-sm transition-all
                  ${
                    mode === item
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white scale-105'
                      : 'bg-white/70 dark:bg-slate-800/60 text-gray-700 dark:text-slate-300 hover:scale-105'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* ROLE */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600 dark:text-slate-400">
            Select Role
          </p>

          <div className="grid grid-cols-2 gap-2">
            {roles.map((item) => (
              <button
                key={item}
                disabled={mode === 'Resume'} // 🔥 disable in resume mode
                onClick={() => onRoleChange(item)}
                className={`rounded-xl px-3 py-2 text-sm transition-all
                  ${
                    role === item
                      ? 'bg-gradient-to-r from-sky-400 to-violet-500 text-white'
                      : 'bg-white/70 dark:bg-slate-800/60 text-gray-700 dark:text-slate-300'
                  }
                  ${mode === 'Resume' ? 'opacity-40 cursor-not-allowed' : ''}
                `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* DIFFICULTY */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600 dark:text-slate-400">
            Difficulty
          </p>

          <div className="grid grid-cols-3 gap-2">
            {difficulties.map((item) => (
              <button
                key={item}
                onClick={() => onDifficultyChange(item)}
                className={`rounded-xl px-3 py-2 text-sm transition-all
                  ${
                    difficulty === item
                      ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
                      : 'bg-white/70 dark:bg-slate-800/60 text-gray-700 dark:text-slate-300'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* RESUME */}
        <div className="space-y-2">
          <ResumeUpload
            resumeFile={resumeFile}
            onFileSelect={onResumeChange}
          />

          {resumeFile && (
            <p className="text-xs text-green-500 truncate">
              Uploaded: {resumeFile.name}
            </p>
          )}
        </div>
      </div>

      {/* START BUTTON */}
      <button
        onClick={onStartInterview}
        disabled={isLoading}
        className="w-full rounded-2xl bg-gradient-to-r from-sky-400 to-violet-500 py-3 text-white font-semibold shadow hover:scale-105 transition"
      >
        {isLoading ? 'Starting...' : 'Start Interview'}
      </button>
    </aside>
  );
}

export default Sidebar;