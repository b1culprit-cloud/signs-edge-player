const { app, BrowserWindow, powerSaveBlocker } = require('electron');

// Screen sleep block karein (24/7 TV running)
powerSaveBlocker.start('prevent-display-sleep');

let mainWindow;

function createPlayerWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    kiosk: true,              // Fullscreen Kiosk Mode (No Borders / No Taskbar)
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

  // Target Player Link (Apna Netlify link yahan lagaein)
  mainWindow.loadURL('https://signs2h.netlify.app/player.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createPlayerWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
