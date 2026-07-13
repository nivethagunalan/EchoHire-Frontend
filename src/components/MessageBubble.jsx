function MessageBubble({ sender, text }) {
  const isAI = sender === 'ai';

  return (
    <div
      className={`flex items-end gap-3 ${
        isAI ? 'justify-start' : 'justify-end'
      }`}
    >
      {/* AI Avatar */}
      {isAI && (
        <div className="w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm shadow-md">
          🤖
        </div>
      )}

      {/* Message */}
      <div
        className={`
          max-w-[70%]
          px-4 py-3
          rounded-2xl
          text-sm
          leading-relaxed
          shadow-md
          transition-all duration-200
          ${
            isAI
              ? 'bg-white/80 dark:bg-slate-800 text-gray-900 dark:text-white border border-slate-300/40 dark:border-slate-700'
              : 'bg-gradient-to-r from-sky-400 to-violet-500 text-white'
          }
        `}
      >
        {text.split('\n').map((line, i) => (
          <p key={i} className="whitespace-pre-wrap">
            {line}
          </p>
        ))}
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-sm shadow-md">
          👤
        </div>
      )}
    </div>
  );
}

export default MessageBubble;