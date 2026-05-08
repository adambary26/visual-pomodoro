export default function AudioControls({ volume, onVolumeChange, ambientEnabled, onAmbientToggle }) {
  return (
    <div className="flex items-center gap-2 p-1 glass-card rounded-xl">
      <label className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs cursor-pointer">
        <svg viewBox="0 0 16 16" className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 6v4M5 4v8M8 2v12M11 5v6M14 7v2" strokeOpacity={volume > 0.01 ? 1 : 0.3} />
          <path d="M2 6v4" strokeOpacity={volume > 0.01 ? 1 : 0.3} />
          <path d="M5 4v8" strokeOpacity={volume > 0.25 ? 1 : 0.3} />
          <path d="M8 2v12" strokeOpacity={volume > 0.5 ? 1 : 0.3} />
          <path d="M11 5v6" strokeOpacity={volume > 0.75 ? 1 : 0.3} />
          <path d="M14 7v2" strokeOpacity={volume > 0.9 ? 1 : 0.3} />
        </svg>
        <input
          type="range"
          min="0" max="1" step="0.05"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-16 h-1 appearance-none bg-neutral-800 rounded-full cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white/70
            [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:hover:scale-125"
        />
      </label>
      <div className="w-px h-5 bg-neutral-800" />
      <button
        onClick={onAmbientToggle}
        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
          ambientEnabled
            ? "text-sky-400"
            : "text-neutral-500 hover:text-neutral-300"
        }`}
      >
        <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M8 2v1M8 13v1M2 8h1M13 8h1M4.5 4.5l.7.7M10.8 10.8l.7.7M4.5 11.5l.7-.7M10.8 5.2l.7-.7" opacity="0.5" />
          <circle cx="8" cy="8" r="3" />
        </svg>
        Rain
      </button>
    </div>
  );
}
