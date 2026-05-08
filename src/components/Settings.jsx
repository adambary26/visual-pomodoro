const THEMES = [
  {
    key: "candle",
    label: "Candle",
    icon: (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="8" y="7" width="4" height="10" rx="1" />
        <path d="M10 4 Q10 2 11 3 Q12 4 10 5" />
      </svg>
    ),
  },
  {
    key: "icecube",
    label: "Ice Cube",
    icon: (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M10 3 L16 7 L10 11 L4 7 Z" />
        <path d="M10 11 L16 15 L10 19 L4 15 Z" />
      </svg>
    ),
  },
  {
    key: "plane",
    label: "Plane",
    icon: (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10 L8 9 L12 3 L14 4 L11 10 L17 11 L18 13 L10 12 L8 17 L6 16 L7 11 L2 10 Z" />
      </svg>
    ),
  },
];

export default function Settings({ theme, onThemeChange }) {
  return (
    <div className="flex gap-1.5 p-1 glass-card rounded-xl">
      {THEMES.map((t) => (
        <button
          key={t.key}
          onClick={() => onThemeChange(t.key)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
            theme === t.key
              ? "bg-white text-black shadow-sm"
              : "text-neutral-500 hover:text-neutral-200"
          }`}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}
