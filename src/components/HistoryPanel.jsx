function HistoryPanel({ history = [], onSelectSession }) {
  return (
    <div className="h-full flex flex-col">

      {/* LIST */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">

        {history.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No history yet
          </p>
        )}

        {history.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelectSession(item)}
            className="
              p-4 rounded-2xl cursor-pointer
              bg-white/80 dark:bg-slate-800/80
              backdrop-blur-lg
              border border-gray-200 dark:border-white/10
              shadow-sm hover:shadow-md
              hover:scale-[1.02]
              transition
            "
          >
            {/* SCORE */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Score: {item.score}/10
            </p>

            {/* QUESTION */}
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-3">
              {item.question}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default HistoryPanel;