export default function PlaneTheme({ progress, isRunning }) {
  const pathLength = 700;
  const dashOffset = pathLength * (1 - progress);

  const t = progress;
  const x = 40 + t * 320;
  const y = 160 - 120 * Math.sin(t * Math.PI);
  const angle = -Math.atan2(
    120 * Math.PI * Math.cos(t * Math.PI) / 200,
    320 / 200
  ) * (180 / Math.PI);

  const trailOpacity = isRunning ? 0.9 : 0.3;
  const planeOpacity = isRunning ? 1 : 0.3;

  return (
    <svg viewBox="0 0 400 220" className="w-full h-full">
      <defs>
        <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <radialGradient id="plGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="220" fill="url(#skyGrad)" rx="12" />

      {isRunning && (
        <>
          <circle cx="340" cy="25" r="2" fill="#fff" opacity="0.3" className="animate-float" />
          <circle cx="290" cy="18" r="1.5" fill="#fff" opacity="0.2" style={{ animationDelay: "0.5s" }} />
          <circle cx="100" cy="22" r="1" fill="#fff" opacity="0.15" style={{ animationDelay: "1s" }} />
        </>
      )}

      <text x="20" y="30" fill="#3b82f6" fontSize="9" fontFamily="monospace" opacity="0.6">Departure</text>
      <text x="326" y="30" fill="#22c55e" fontSize="9" fontFamily="monospace" opacity="0.6">Arrival</text>

      <ellipse cx="400" cy="220" rx="200" ry="80" fill="url(#plGlow)" />

      <path d="M 40 160 Q 120 20 200 100 T 360 160" fill="none" stroke="#1e3a5f" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.5" />
      <path d="M 40 160 Q 120 20 200 100 T 360 160" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray={pathLength} strokeDashoffset={dashOffset} strokeLinecap="round" opacity={trailOpacity} />

      <circle cx="40" cy="160" r="4" fill="#3b82f6" opacity={isRunning ? 0.8 : 0.3} />
      <circle cx="40" cy="160" r="2" fill="#60a5fa" />
      <circle cx="360" cy="160" r="4" fill="#22c55e" opacity={isRunning ? 0.8 : 0.3} />
      <circle cx="360" cy="160" r="2" fill="#4ade80" />
      <text x="36" y="180" fill="#3b82f6" fontSize="7" fontFamily="monospace" opacity="0.5">A</text>
      <text x="356" y="180" fill="#22c55e" fontSize="7" fontFamily="monospace" opacity="0.5">B</text>

      <g transform={`translate(${x}, ${y}) rotate(${angle})`} opacity={planeOpacity}>
        <path d="M 0 -9 L 11 0 L 0 9 L -5 4 L -3 0 L -5 -4 Z" fill="#93c5fd" stroke="#3b82f6" strokeWidth="0.8" />
      </g>

      <text x="330" y="205" fill="#525252" fontSize="8" fontFamily="monospace">
        {Math.round(progress * 100)}%
      </text>
    </svg>
  );
}
