export default function SessionCounter({ count, onReset }) {
  return (
    <div className="flex items-center gap-1 animate-fade-in">
      {Array.from({ length: Math.min(count, 8) }, (_, i) => (
        <svg key={i} viewBox="0 0 16 16" className="w-3 h-3 text-amber-500" fill="currentColor">
          <path d="M4 11c0 1.5.5 3 2 3h4c1.5 0 2-1.5 2-3l-1-6H5l-1 6z" />
          <rect x="6" y="2" width="4" height="2" rx="0.5" />
          <path d="M6 13v1h4v-1" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ))}
      {count > 8 && (
        <span className="text-[10px] text-neutral-500 font-mono">+{count - 8}</span>
      )}
      {count > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onReset(); }}
          className="ml-1 text-neutral-700 hover:text-neutral-400 transition-colors cursor-pointer"
          title="Reset sessions"
        >
          <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 1l10 10M11 1l-10 10" />
          </svg>
        </button>
      )}
    </div>
  );
}
