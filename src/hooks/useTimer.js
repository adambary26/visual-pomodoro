import { useState, useRef, useEffect, useCallback } from "react";

const INTERVAL_MS = 200;

function pad(n) {
  return String(n).padStart(2, "0");
}

export function useTimer({ durationMinutes, localStoragePrefix, onComplete }) {
  const DURATION_MS = durationMinutes * 60 * 1000;
  const END_TIME_KEY = `vp_${localStoragePrefix}EndTime`;
  const PAUSED_KEY = `vp_${localStoragePrefix}Paused`;

  const [timeLeft, setTimeLeft] = useState(() => {
    const endTime = localStorage.getItem(END_TIME_KEY);
    if (endTime) {
      const remaining = Number(endTime) - Date.now();
      if (remaining > 0) return Math.min(remaining, DURATION_MS);
    }
    const paused = localStorage.getItem(PAUSED_KEY);
    if (paused !== null) return Math.min(Number(paused), DURATION_MS);
    return DURATION_MS;
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const timeLeftRef = useRef(timeLeft);
  const durRef = useRef(DURATION_MS);
  durRef.current = DURATION_MS;
  const endKeyRef = useRef(END_TIME_KEY);
  endKeyRef.current = END_TIME_KEY;
  const pausedKeyRef = useRef(PAUSED_KEY);
  pausedKeyRef.current = PAUSED_KEY;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

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
    const ek = endKeyRef.current;
    const pk = pausedKeyRef.current;
    const endTime = Number(localStorage.getItem(ek));
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
      localStorage.removeItem(ek);
      localStorage.removeItem(pk);
      if (onCompleteRef.current) onCompleteRef.current();
    }
  }, [clearTick]);

  const start = useCallback(() => {
    clearTick();
    const remaining = timeLeftRef.current > 0 ? timeLeftRef.current : durRef.current;
    const endTime = Date.now() + remaining;
    localStorage.setItem(endKeyRef.current, String(endTime));
    localStorage.removeItem(pausedKeyRef.current);
    setIsRunning(true);
    tick();
    intervalRef.current = setInterval(tick, INTERVAL_MS);
  }, [tick, clearTick]);

  const pause = useCallback(() => {
    clearTick();
    setIsRunning(false);
    localStorage.removeItem(endKeyRef.current);
    localStorage.setItem(pausedKeyRef.current, String(timeLeftRef.current));
  }, [clearTick]);

  const reset = useCallback(() => {
    clearTick();
    setIsRunning(false);
    syncTimeLeft(durRef.current);
    localStorage.removeItem(endKeyRef.current);
    localStorage.removeItem(pausedKeyRef.current);
  }, [clearTick, syncTimeLeft]);

  useEffect(() => {
    clearTick();
    setIsRunning(false);
    const ek = endKeyRef.current;
    const pk = pausedKeyRef.current;
    const dur = durRef.current;
    const endTime = localStorage.getItem(ek);
    if (endTime && Number(endTime) > Date.now()) {
      setIsRunning(true);
      tick();
      intervalRef.current = setInterval(tick, INTERVAL_MS);
    } else {
      const paused = localStorage.getItem(pk);
      const v = paused !== null ? Math.min(Number(paused), dur) : dur;
      timeLeftRef.current = v;
      setTimeLeft(v);
    }
    return clearTick;
  }, [localStoragePrefix, durationMinutes]);

  const progress = Math.min(1, Math.max(0, 1 - timeLeft / durRef.current));
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const formattedTime = `${pad(minutes)}:${pad(seconds)}`;

  return { timeLeft, formattedTime, progress, isRunning, start, pause, reset };
}
