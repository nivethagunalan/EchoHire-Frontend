function WeakAreas({ weakAreas }) {
  if (!weakAreas || weakAreas.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-300/30 dark:border-slate-700/60 bg-white/60 dark:bg-slate-950/70 p-5 backdrop-blur">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Your Weak Areas
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          No weak areas yet. You're doing great 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-red-400/40 bg-white/60 dark:bg-slate-950/70 p-5 backdrop-blur">

      <h3 className="text-lg font-semibold text-red-500 mb-3">
        ⚠️ Weak Areas
      </h3>

      <div className="space-y-3">
        {weakAreas.map((area, index) => {
          // ✅ HANDLE STRING FORMAT
          if (typeof area === 'string') {
            return (
              <div
                key={index}
                className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 p-3 rounded-xl text-sm"
              >
                {area}
              </div>
            );
          }

          // ✅ HANDLE OBJECT FORMAT
          return (
            <div
              key={area.key || index}
              className="bg-red-100 dark:bg-red-900/40 p-4 rounded-xl"
            >
              <p className="font-semibold text-red-600">
                {area.label}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Score: {area.value}/10
              </p>
              <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                {area.suggestion}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default WeakAreas;