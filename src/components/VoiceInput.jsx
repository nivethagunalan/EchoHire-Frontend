import { useEffect, useState } from 'react';

function VoiceInput({ onTranscript, disabled }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const instance = new SpeechRecognition();
    instance.continuous = false;
    instance.interimResults = false;
    instance.lang = 'en-US';

    instance.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setListening(false);
    };
    instance.onend = () => setListening(false);
    setRecognition(instance);
    setSupported(true);
  }, [onTranscript]);

  const toggleListen = () => {
    if (!recognition || disabled) return;
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListen}
      disabled={!supported || disabled}
      className={`inline-flex items-center gap-2 rounded-3xl border px-4 py-3 text-sm font-medium transition ${listening ? 'border-rose-400 bg-rose-500/15 text-rose-200' : 'border-slate-700/60 bg-slate-900/70 text-slate-200'} ${!supported ? 'cursor-not-allowed opacity-50' : 'hover:border-sky-300/80 hover:bg-slate-800/80'}`}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-lg">🎤</span>
      {listening ? 'Listening...' : supported ? 'Voice input' : 'Speech unavailable'}
    </button>
  );
}

export default VoiceInput;
