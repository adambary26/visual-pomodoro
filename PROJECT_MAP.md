# Visual Pomodoro — Project Map

## [TECH_STACK]
- React 19.2.5 + @vitejs/plugin-react 6.0.1
- Vite 8.0.11
- Tailwind CSS 4.2.4 (@tailwindcss/vite 4.2.4)
- Web Audio API (HTMLAudioElement for file playback)
- localStorage persistence (settings + timer resume)
- Desktop: Electron 36.9.5 (Windows app)
- Deployed: Vercel (static SPA, optional)

## [SYSTEM_FLOW]
```
App (theme, volume, ambientEnabled state)
├── Settings        (theme picker: candle / icecube / plane)
├── ThemeComponent  (active theme SVG)
│   ├── CandleTheme  — wax ∝ 1-progress, flame flickers + shrinks
│   ├── IceCubeTheme — ice scale/opacity ∝ 1-progress, water pool rises
│   └── PlaneTheme   — plane pos along bezier ∝ progress, trail drawn progressively
├── TimerDisplay    (MM:SS, Start/Pause/Reset)
└── AudioControls   (volume slider, Rain ON/OFF)
```

**Data flow:**
- `useTimer`: Date.now()-based countdown (200ms interval), localStorage `vp_endTime` for resume
- `progress = 1 - timeLeft / 25min` → passed to theme components
- `onComplete` → plays chime.wav via `new Audio()`
- Ambient rain.wav loops via `new Audio()` with `.loop = true`
- Settings (theme, volume, ambientEnabled) saved to `vp_settings` on change

## [ARCHITECTURE]
```
src/
├── main.jsx                 Entry: renders <App/>
├── App.jsx                  State owner: theme, volume, ambient, audio + glass card layout + progress ring
├── index.css                Tailwind v4 + design tokens + glassmorphism + animations
├── assets/
│   ├── candle.svg           (reference)
│   ├── ice-cube.svg         (reference)
│   ├── map-path.svg         (reference)
│   ├── plane.svg            (reference)
│   ├── chime.wav            Notification (2-tone C5→E5, 0.6s)
│   └── rain.wav             Ambient brown noise (4s loopable)
├── components/
│   ├── TimerDisplay.jsx     Digital clock + progress ring + icon buttons
│   ├── CandleTheme.jsx      SVG wax melt + flame + drip effect
│   ├── IceCubeTheme.jsx     SVG ice shrink + pool + ripple
│   ├── PlaneTheme.jsx       SVG bezier path + starfield + plane
│   ├── AudioControls.jsx    Volume bars icon + custom slider + Rain toggle
│   └── Settings.jsx         Pill toggle with SVG icons (candle/ice/plane)
├── hooks/
│   └── useTimer.js          Date.now countdown + localStorage resume
electron/
    ├── main.cjs             Electron main process (window, lifecycle)
    └── preload.cjs          Context bridge (platform info)
scripts/
    ├── generate-audio.mjs   WAV generator (Node.js, build tooling)
    └── dev-electron.mjs     Dev launcher (starts Vite + Electron)
```

## [ORPHANS & PENDING]
- [DONE] Project scaffold (Vite + Tailwind + deps)
- [DONE] SVG assets (candle, ice-cube, map-path, plane)
- [DONE] WAV assets (chime.wav, rain.wav)
- [DONE] useTimer.js — Date.now() + localStorage persistence + resume
- [DONE] TimerDisplay.jsx — MM:SS + Play/Pause/Reset
- [DONE] CandleTheme.jsx — wax melts, flame flickers
- [DONE] IceCubeTheme.jsx — cube shrinks, pool rises
- [DONE] PlaneTheme.jsx — plane flies bezier path with trail
- [DONE] AudioControls.jsx — volume + ambient toggle
- [DONE] Settings.jsx — theme picker
- [DONE] App.jsx — all wiring, state, audio
- [DONE] index.css — Tailwind + animations
- [DONE] vercel.json — SPA rewrites
- [DONE] .gitignore
- [DONE] Build passes
- [DONE] electron/main.cjs — BrowserWindow, dev/prod loading
- [DONE] electron/preload.cjs — contextBridge
- [DONE] scripts/dev-electron.mjs — Vite + Electron dev launcher
- [DONE] npm run electron:dev — launches native Windows window
- [TODO] Push to GitHub
- [TODO] Deploy to Vercel (optional)
