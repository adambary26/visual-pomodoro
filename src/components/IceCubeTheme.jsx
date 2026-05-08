export default function IceCubeTheme({ progress, isRunning }) {
  const iceScale = Math.max(0.08, 1 - progress * 0.92);
  const iceOpacity = Math.max(0.1, 1 - progress * 0.9);
  const poolOpacity = Math.min(1, progress * 1.6);
  const poolWidth = 28 + progress * 44;
  const glowOpacity = isRunning ? 0.2 * (1 - progress) : 0;
  const showRipple = isRunning && progress > 0.2;

  return (
    <svg viewBox="0 0 120 140" className="w-full h-full">
      <defs>
        <linearGradient id="iceBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0f9ff" />
          <stop offset="40%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <linearGradient id="iceTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <radialGradient id="iceGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="waterPool" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <ellipse cx="60" cy="65" rx="55" ry="50" fill="url(#iceGlow)" />

      <g style={{ transform: `scale(${iceScale})`, transformOrigin: "60px 65px" }}>
        <polygon points="60,18 98,40 98,82 60,104 22,82 22,40" fill="url(#iceBody)" stroke="#38bdf8" strokeWidth="1.5" opacity={iceOpacity} />
        <polygon points="60,18 98,40 60,62 22,40" fill="url(#iceTop)" stroke="#38bdf8" strokeWidth="1" opacity={iceOpacity} />
        <polygon points="22,40 60,62 60,104 22,82" fill="#93c5fd" stroke="#38bdf8" strokeWidth="1" opacity={iceOpacity * 0.5} />
        <polygon points="98,40 60,62 60,104 98,82" fill="#38bdf8" stroke="#38bdf8" strokeWidth="1" opacity={iceOpacity * 0.25} />

        <line x1="60" y1="18" x2="60" y2="104" stroke="#fff" strokeWidth="1" opacity={iceOpacity * 0.3} />
        <line x1="22" y1="40" x2="98" y2="40" stroke="#fff" strokeWidth="1" opacity={iceOpacity * 0.4} />
      </g>

      <ellipse cx="60" cy="120" rx={poolWidth / 2} ry={4 + progress * 7} fill="url(#waterPool)" opacity={poolOpacity} />
      <ellipse cx="60" cy="120" rx={poolWidth / 2 - 4} ry={2 + progress * 3} fill="#e0f2fe" opacity={poolOpacity * 0.5} />

      {showRipple && (
        <ellipse cx={45 + Math.sin(progress * 10) * 10} cy="118" rx="3" ry="1.5" fill="#e0f2fe" opacity={(progress - 0.2) * 0.8}>
          <animate attributeName="rx" values="3;6;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
        </ellipse>
      )}
    </svg>
  );
}
