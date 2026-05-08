export default function TimerDisplay({ formattedTime, isRunning, onStart, onPause, onReset }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="font-mono text-6xl font-light tracking-[0.1em] tabular-nums text-white/90">
        {formattedTime}
      </div>
      <div className="flex gap-3">
        <button
          onClick={isRunning ? onPause : onStart}
          className="btn-primary px-7 py-2.5 bg-white text-neutral-900 hover:bg-white/90 active:bg-white/80"
        >
          <span className="flex items-center gap-2">
            {isRunning ? (
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><rect x="4" y="3" width="3" height="10" rx="0.5"/><rect x="9" y="3" width="3" height="10" rx="0.5"/></svg>
            ) : (
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor"><path d="M5 3L13 8L5 13Z"/></svg>
            )}
            {isRunning ? "Pause" : "Start"}
          </span>
        </button>
        <button
          onClick={onReset}
          className="btn-secondary px-5 py-2.5 glass-card text-neutral-400 hover:text-white hover:bg-glass-hover active:bg-glass-hover"
        >
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 8a6 6 0 0 1 11.3-3M14 8a6 6 0 0 1-11.3 3"/><path d="M13 1v4h-4M3 15v-4h4"/></svg>
            Reset
          </span>
        </button>
      </div>
    </div>
  );
}
