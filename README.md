# Visual Pomodoro 🕯️

This is my first project — a desktop Pomodoro timer that turns 25 minutes into a visual experience. Instead of just counting down, it uses animated themes to show time passing: a candle melting, an ice cube dissolving, or a plane tracing a path across the sky.

Built with React, Vite, Tailwind CSS, and packaged with Electron for Windows.

## Features

- **3 Visual Themes** — Candle (flame flickers, wax melts), Ice Cube (cube shrinks, water pool rises), Plane (flies a bezier path with trail)
- **Animated Progress Ring** — fills as time counts down
- **Ambient Sound** — toggle rain sounds while you work
- **Persistence** — timer and settings survive page reload (localStorage)
- **Glassmorphism UI** — dark mode, frosted glass cards, subtle glow effects
- **Electron Desktop App** — standalone Windows executable

## Getting Started

```bash
npm install
npm run dev        # dev server at localhost:5173
npm run build      # production build to dist/
npm run electron:dev   # dev mode in Electron window
npm run electron:build # package as Windows app
```

## Tech Stack

React 19 + Vite 8 + Tailwind CSS 4 + Electron 36 + Web Audio API

## Links

- GitHub: [adambary26/visual-pomodoro](https://github.com/adambary26/visual-pomodoro)
