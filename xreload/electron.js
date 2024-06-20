// electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 960,
    frame: true,
    title: 'DevPeeps - XReload',
    transparent: false,
    alwaysOntop: false,
    backgroundColor: '#0f0f0f',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      images: true,
      contextIsolation: false,
      spellcheck: true,
      devTools: true,
      enableRemoteModule: true,
      nativeWindowOpen: true
    },
  });
 
  // window options
  mainWindow.autoHideMenuBar = true;
  mainWindow.menuBarVisible = false;
  mainWindow.minimizable = true;
  mainWindow.maximizable = true;
  mainWindow.resizable = true;
  mainWindow.fullScreenable = true;
  mainWindow.closable = true;
  mainWindow.focusable = true;
  mainWindow.fullScreen = false;
  mainWindow.kiosk = false;
  mainWindow.titleBarStyle = 'default';
  mainWindow.movable = true;

  const startFile = `${path.join(__dirname, '../app/build/index.html')}`;
  mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.loadURL(url.pathToFileURL(startFile).href);
}

// logging
//app.commandLine.appendSwitch('enable-logging', 'file');
app.commandLine.appendSwitch('log-level', '-1');
//app.commandLine.appendSwitch('log-file', './electron.log');

// security
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.commandLine.appendSwitch('force_low_power_gpu', 'true');

// performance
app.commandLine.appendSwitch('disable-http-cache', 'false');
app.commandLine.appendSwitch('disable-gpu', 'false');
app.commandLine.appendSwitch('disable-software-rasterizer', 'false');
app.commandLine.appendSwitch('disable-gpu-compositing', 'false');

// start window
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});