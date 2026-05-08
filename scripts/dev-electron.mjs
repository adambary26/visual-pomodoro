import { spawn } from "node:child_process";

const vite = spawn("npx", ["vite", "--port", "5173"], {
  stdio: "inherit",
  shell: true,
});

function startElectron() {
  const electron = spawn("npx", ["electron", "."], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ELECTRON_DEV: "true" },
  });
  electron.on("close", () => {
    vite.kill();
    process.exit();
  });
}

setTimeout(startElectron, 3000);

process.on("SIGINT", () => {
  vite.kill();
  process.exit();
});
