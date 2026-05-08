import { useState, useRef, useEffect, useCallback } from "react";

const POMODORO_MS = 25 * 60 * 1000;
const INTERVAL_MS = 200;
const END_TIME_KEY = "vp_endTime";
const PAUSED_KEY = "vp_pausedTime";

function pad(n) {
  return String(n).padStart(2, "0");
}

export function useTimer(onComplete) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const endTime = localStorage.getItem(END_TIME_KEY);
    if (endTime) {
      const remaining = Number(endTime) - Date.now();
      if (remaining > 0) return Math.min(remaining, POMODORO_MS);
    }
    const paused = localStorage.getItem(PAUSED_KEY);
    if (paused !== null) return Math.min(Number(paused), POMODORO_MS);
    return POMODORO_MS;
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const timeLeftRef = useRef(timeLeft);

  const syncTimeLeft = useCallback((v) => {
    timeLeftRef.current = v;
    setTimeLeft(v);
  }, []);

  const clearTick = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const endTime = Number(localStorage.getItem(END_TIME_KEY));
    if (!endTime) {
      clearTick();
      setIsRunning(false);
      return;
    }
    const remaining = Math.max(0, endTime - Date.now());
    timeLeftRef.current = remaining;
    setTimeLeft(remaining);
    if (remaining <= 0) {
      clearTick();
      setIsRunning(false);
      localStorage.removeItem(END_TIME_KEY);
      localStorage.removeItem(PAUSED_KEY);
      if (onComplete) onComplete();
    }
  }, [clearTick, onComplete]);

  const start = useCallback(() => {
    clearTick();
    const remaining = timeLeftRef.current > 0 ? timeLeftRef.current : POMODORO_MS;
    const endTime = Date.now() + remaining;
    localStorage.setItem(END_TIME_KEY, String(endTime));
    localStorage.removeItem(PAUSED_KEY);
    setIsRunning(true);
    tick();
    intervalRef.current = setInterval(tick, INTERVAL_MS);
  }, [tick, clearTick]);

  const pause = useCallback(() => {
    clearTick();
    setIsRunning(false);
    localStorage.removeItem(END_TIME_KEY);
    localStorage.setItem(PAUSED_KEY, String(timeLeftRef.current));
  }, [clearTick]);

  const reset = useCallback(() => {
    clearTick();
    setIsRunning(false);
    syncTimeLeft(POMODORO_MS);
    localStorage.removeItem(END_TIME_KEY);
    localStorage.removeItem(PAUSED_KEY);
  }, [clearTick, syncTimeLeft]);

  useEffect(() => {
    const endTime = localStorage.getItem(END_TIME_KEY);
    if (endTime && Number(endTime) > Date.now()) {
      setIsRunning(true);
      tick();
      intervalRef.current = setInterval(tick, INTERVAL_MS);
    }
    return clearTick;
  }, []);

  const progress = 1 - timeLeft / POMODORO_MS;
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const formattedTime = `${pad(minutes)}:${pad(seconds)}`;

  return { timeLeft, formattedTime, progress, isRunning, start, pause, reset };
}
