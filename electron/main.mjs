import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { fileURLToPath, URL } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

function createWindow() {
   const win = new BrowserWindow({
      width: 1200,
      height: 800,
      icon: join(__dirname, 'icon.ico'), // Windows/Linux
      webPreferences: {
         preload: join(__dirname, 'preload.mjs'),
         contextIsolation: true,
      },
   });

   if (!app.isPackaged) {
      win.loadURL('http://localhost:5173');
   } else {
      win.loadFile(join(__dirname, '../dist/index.html'));
   }
}

app.whenReady().then(createWindow);
