import { useState } from "react";

const FOCUS_OPTIONS = [15, 20, 25, 30, 45];
const BREAK_OPTIONS = [5, 10, 15];

export default function TimerDisplay({
  formattedTime, isRunning,
  focusDuration, breakDuration, mode,
  onStart, onPause, onReset, onDurationChange,
}) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="font-mono text-6xl font-light tracking-[0.1em] tabular-nums text-white/90">
        {formattedTime}
      </div>
      <div className="flex gap-3 relative">
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
        <button
          onClick={() => setShowSettings((v) => !v)}
          className={`btn-secondary px-3 py-2.5 glass-card transition-all duration-200 cursor-pointer ${
            showSettings ? "text-white bg-glass-hover" : "text-neutral-500 hover:text-neutral-300"
          }`}
          title="Timer settings"
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="8" cy="8" r="2.5" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.5 3.5l1.5 1.5M11 11l1.5 1.5M3.5 12.5l1.5-1.5M11 5l1.5-1.5" />
          </svg>
        </button>

        {showSettings && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 glass-card-strong rounded-xl p-4 min-w-[220px] animate-fade-in shadow-2xl">
              <div className="text-[10px] font-medium text-neutral-500 tracking-wider uppercase mb-2">Focus</div>
              <div className="flex gap-1.5 flex-wrap mb-3">
                {FOCUS_OPTIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => { onDurationChange({ focus: d }); setShowSettings(false); }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                        focusDuration === d
                          ? "bg-green-500/20 text-green-400"
                          : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >{d}min</button>
                ))}
              </div>
              <div className="text-[10px] font-medium text-neutral-500 tracking-wider uppercase mb-2">Break</div>
              <div className="flex gap-1.5 flex-wrap">
                {BREAK_OPTIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => { onDurationChange({ brk: d }); setShowSettings(false); }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                        breakDuration === d
                          ? "bg-sky-500/20 text-sky-400"
                          : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >{d}min</button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
