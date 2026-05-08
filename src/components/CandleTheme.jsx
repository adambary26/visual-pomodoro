export default function CandleTheme({ progress, isRunning }) {
  const waxHeight = Math.max(0, 112 * (1 - progress));
  const flameScale = Math.max(0.25, 1 - progress * 0.6);
  const poolOpacity = Math.min(1, progress * 1.8);
  const glowOpacity = isRunning ? 0.3 * (1 - progress) : 0;
  const showDrip = isRunning && progress > 0.1 && progress < 0.8;

  return (
    <svg viewBox="0 0 100 150" className="w-full h-full">
      <defs>
        <radialGradient id="cndGlow" cx="50%" cy="25%" r="55%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cndWax" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f5d6a8" />
          <stop offset="50%" stopColor="#fce4c3" />
          <stop offset="100%" stopColor="#ecc49a" />
        </linearGradient>
        <linearGradient id="cndStripe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="cndFlameOuter" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>

      <ellipse cx="50" cy="26" rx="32" ry="28" fill="url(#cndGlow)" />

      {isRunning && (
        <g style={{ transform: `scale(${flameScale})`, transformOrigin: "50px 28px" }}>
          <ellipse cx="50" cy="18" rx="6" ry="16" fill="url(#cndFlameOuter)" className="animate-flicker" />
          <ellipse cx="50" cy="22" rx="3.5" ry="9" fill="#fef08a" className="animate-flicker-fast" />
          <ellipse cx="50" cy="24" rx="1.5" ry="5" fill="#fff" opacity="0.6" className="animate-flicker-fast" />
        </g>
      )}

      <rect x="36" y={40 + (112 - waxHeight)} width="28" height={waxHeight} rx="3" fill="url(#cndWax)" />
      <rect x="35" y={38 + (112 - waxHeight)} width="30" height="6" rx="2" fill="url(#cndStripe)" />

      <rect x="34" y="136" width="32" height="8" rx="3" fill="#d8b4fe" />
      <line x1="30" y1="143" x2="70" y2="143" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />

      <ellipse cx="50" cy="138" rx={18 + poolOpacity * 22} ry={3 + poolOpacity * 5} fill="#f5d6a8" opacity={poolOpacity} />
      <ellipse cx="50" cy="138" rx={12 + poolOpacity * 16} ry={1.5 + poolOpacity * 3} fill="#ecc49a" opacity={poolOpacity * 0.5} />

      {showDrip && (
        <ellipse cx={40 + (progress % 0.7) * 20} cy={140 + waxHeight * 0.1} rx="2" ry="3" fill="#f5d6a8" className="animate-drip" opacity="0.5" />
      )}
    </svg>
  );
}
