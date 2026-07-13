import MessageBubble from './MessageBubble';
import VoiceInput from './VoiceInput';

function ChatWindow({
  messages,
  inputText,
  onInputChange,
  isLoading,
  onSend,
  voiceEnabled,
  onVoiceToggle
}) {
  return (
    <div className="flex flex-col h-full min-h-0">

      {/* HEADER */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <div>
          <p className="text-xs text-sky-400 uppercase tracking-wider">
            Live Interview
          </p>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Chat Flow
          </h2>
        </div>

        <button
          onClick={onVoiceToggle}
          className="text-sm px-3 py-1 rounded-xl bg-white/20 dark:bg-slate-800"
        >
          🎤 {voiceEnabled ? 'On' : 'Off'}
        </button>
      </div>

      {/* CHAT */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-3">
          <input
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type your answer..."
            className="flex-1 p-3 rounded-xl bg-white/70 dark:bg-slate-800 text-black dark:text-white"
          />

          <button
            onClick={onSend}
            disabled={isLoading}
            className="px-5 rounded-xl bg-gradient-to-r from-sky-400 to-purple-500 text-white"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>

    </div>
  );
}

export default ChatWindow;