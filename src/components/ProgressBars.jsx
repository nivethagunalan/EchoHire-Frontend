function ProgressBars({ bars }) {
  if (!bars || bars.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        No skill data yet
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-300/30 dark:border-slate-700/60 bg-white/60 dark:bg-slate-950/70 p-4 backdrop-blur space-y-4">

      <h3 className="text-sm font-semibold text-gray-700 dark:text-white">
        🧠 Skills Overview
      </h3>

      {bars.map(({ label, value }) => (
        <div key={label}>
          <div className="flex justify-between text-xs mb-1">
            <span>{label}</span>
            <span>{value}%</span>
          </div>

          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 transition-all duration-700"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}

    </div>
  );
}

export default ProgressBars;