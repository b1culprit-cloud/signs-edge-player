const { app, BrowserWindow, powerSaveBlocker } = require('electron');

// 24/7 TV running ke liye screen sleep aur screen saver block karein
powerSaveBlocker.start('prevent-display-sleep');

let mainWindow;

function createPlayerWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    kiosk: true,              // Borderless Fullscreen Kiosk Mode (No Taskbar / Menubar)
    fullscreen: true,
    autoHideMenuBar: true,
    frame: false,
    alwaysOnTop: true,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webgl: true
    }
  });

  // Mouse cursor TV screen par hide karein
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.insertCSS(`
      * { cursor: none !important; user-select: none !important; }
    `);
  });

  // Live Netlify Player Link
  mainWindow.loadURL('https://signs2h.netlify.app/player.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(createPlayerWindow);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
