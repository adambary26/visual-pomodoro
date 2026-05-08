const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const path = require("node:path");

const isDev = process.env.ELECTRON_DEV === "true";

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 520,
    height: 680,
    resizable: false,
    title: "Visual Pomodoro",
    backgroundColor: "#0a0a0a",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }

  win.on("closed", () => {
    win = null;
  });
}

ipcMain.on("notify", (_, { title, body }) => {
  new Notification({ title, body }).show();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
