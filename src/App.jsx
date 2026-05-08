import { useState, useCallback, useEffect, useRef } from "react";
import { useTimer } from "./hooks/useTimer.js";
import Settings from "./components/Settings.jsx";
import TimerDisplay from "./components/TimerDisplay.jsx";
import SessionCounter from "./components/SessionCounter.jsx";
import CandleTheme from "./components/CandleTheme.jsx";
import IceCubeTheme from "./components/IceCubeTheme.jsx";
import PlaneTheme from "./components/PlaneTheme.jsx";
import AudioControls from "./components/AudioControls.jsx";
import chimeUrl from "./assets/chime.wav";
import rainUrl from "./assets/rain.wav";

const STORAGE_KEY = "vp_settings";
const SESSION_KEY = "vp_sessions";

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {}
}

const THEMES = { candle: CandleTheme, icecube: IceCubeTheme, plane: PlaneTheme };
const RING_RADIUS = 110;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function App() {
  const saved = loadSettings();
  const [theme, setTheme] = useState(saved.theme || "candle");
  const [volume, setVolume] = useState(saved.volume ?? 0.5);
  const [ambientEnabled, setAmbientEnabled] = useState(saved.ambientEnabled ?? false);
  const [focusDuration, setFocusDuration] = useState(saved.focusDuration || 25);
  const [breakDuration, setBreakDuration] = useState(saved.breakDuration || 5);
  const [mode, setMode] = useState("focus");
  const [sessionCount, setSessionCount] = useState(() => {
    try { return Number(localStorage.getItem(SESSION_KEY)) || 0; } catch { return 0; }
  });
  const ambientRef = useRef(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const countRef = useRef(sessionCount);
  countRef.current = sessionCount;

  const handleComplete = useCallback(() => {
    const chime = new Audio(chimeUrl);
    chime.volume = volume;
    chime.play();

    if (modeRef.current === "focus") {
      const newCount = countRef.current + 1;
      setSessionCount(newCount);
      try { localStorage.setItem(SESSION_KEY, String(newCount)); } catch {}
      setMode("break");
      window.electronAPI?.sendNotification("Break time!", "Well done! Take a 5-minute break.");
    } else {
      setMode("focus");
      window.electronAPI?.sendNotification("Focus time!", "Break's over! Let's get back to work.");
    }
  }, [volume]);

  const { formattedTime, progress, isRunning, start, pause, reset } = useTimer({
    durationMinutes: mode === "focus" ? focusDuration : breakDuration,
    localStoragePrefix: mode,
    onComplete: handleComplete,
  });

  const handleThemeChange = useCallback((t) => {
    setTheme(t);
    saveSettings({ theme: t, volume, ambientEnabled, focusDuration, breakDuration });
  }, [volume, ambientEnabled, focusDuration, breakDuration]);

  const handleVolumeChange = useCallback((v) => {
    setVolume(v);
    if (ambientRef.current) ambientRef.current.volume = v;
    saveSettings({ theme, volume: v, ambientEnabled, focusDuration, breakDuration });
  }, [theme, ambientEnabled, focusDuration, breakDuration]);

  const handleAmbientToggle = useCallback(() => {
    setAmbientEnabled((prev) => {
      const next = !prev;
      if (next) {
        const rain = new Audio(rainUrl);
        rain.loop = true;
        rain.volume = volume;
        rain.play();
        ambientRef.current = rain;
      } else if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current = null;
      }
      saveSettings({ theme, volume, ambientEnabled: next, focusDuration, breakDuration });
      return next;
    });
  }, [theme, volume, focusDuration, breakDuration]);

  const handleDurationChange = useCallback(({ focus, brk }) => {
    if (focus !== undefined) setFocusDuration(focus);
    if (brk !== undefined) setBreakDuration(brk);
    saveSettings({ theme, volume, ambientEnabled, focusDuration: focus ?? focusDuration, breakDuration: brk ?? breakDuration });
  }, [theme, volume, ambientEnabled, focusDuration, breakDuration]);

  const handleReset = useCallback(() => {
    reset();
    setMode("focus");
  }, [reset]);

  const handleResetSessions = useCallback(() => {
    setSessionCount(0);
    try { localStorage.setItem(SESSION_KEY, "0"); } catch {}
  }, []);

  useEffect(() => {
    return () => {
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current = null;
      }
    };
  }, []);

  const ThemeComponent = THEMES[theme];
  const ringOffset = RING_CIRCUMFERENCE * (1 - progress);
  const ringColor = mode === "focus" ? "rgba(34,197,94,0.5)" : "rgba(14,165,233,0.5)";

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 select-none relative overflow-hidden font-[family-name:var(--font-display)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/40 via-neutral-950 to-neutral-950 pointer-events-none" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-500/5 via-transparent to-sky-500/5 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6 w-full max-w-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-[11px] font-light tracking-[0.35em] uppercase text-neutral-600 animate-fade-in">
            {mode === "focus" ? "Focus" : "Break"}
          </h1>
          <SessionCounter count={sessionCount} onReset={handleResetSessions} />
        </div>

        <div className="glass-card-strong rounded-2xl p-6 py-8 w-full animate-fade-in-delay flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center w-64 h-64">
            <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
              <circle
                cx="120" cy="120" r={RING_RADIUS}
                fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4"
              />
              <circle
                cx="120" cy="120" r={RING_RADIUS}
                fill="none" stroke={ringColor} strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={ringOffset}
                className="progress-ring-circle progress-ring"
              />
            </svg>
            <div className="relative flex items-center justify-center w-48 h-48">
              <ThemeComponent progress={progress} isRunning={isRunning} />
            </div>
          </div>

          <TimerDisplay
            formattedTime={formattedTime}
            isRunning={isRunning}
            focusDuration={focusDuration}
            breakDuration={breakDuration}
            mode={mode}
            onStart={start}
            onPause={pause}
            onReset={handleReset}
            onDurationChange={handleDurationChange}
          />
        </div>

        <div className="animate-fade-in-slow flex flex-col items-center gap-3 w-full">
          <Settings theme={theme} onThemeChange={handleThemeChange} />
          <AudioControls
            volume={volume}
            onVolumeChange={handleVolumeChange}
            ambientEnabled={ambientEnabled}
            onAmbientToggle={handleAmbientToggle}
          />
        </div>
      </div>
    </div>
  );
}
