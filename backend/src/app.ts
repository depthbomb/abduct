import args from '#args';
import { INDEX_PATH, PRELOAD_PATH } from '#constants';
import { app, Menu, BrowserWindow, ipcMain } from 'electron';

import beep from '#ipc/beep';
import getPath from '#ipc/getPath';
import showError from '#ipc/showError';
import chooseFolder from '#ipc/chooseFolder';
import openExternal from '#ipc/openExternal';
import startDownload from '#ipc/startDownload';

const DEV_MODE = args.flags.dev;

/**
 * IPC messages
 */
 ipcMain.handle('beep', beep);
 ipcMain.handle('get-path', getPath);
 ipcMain.handle('show-error', showError);
 ipcMain.handle('choose-folder', chooseFolder);
 ipcMain.handle('open-external', openExternal);
 ipcMain.handle('start-download', startDownload);
/* ---------------------------------------------------------------- */

app.once('ready', async () => {
	Menu.setApplicationMenu(null);

	if (process.platform === 'win32') app.setAppUserModelId(app.name);

	const mainWindow = new BrowserWindow({
		show: false,
		width: 500,
		height: 500,
		resizable: false,
		maximizable: false,
		title: 'Abduct',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: false,
			preload: PRELOAD_PATH,
			devTools: DEV_MODE,
		}
	});

	if (DEV_MODE) {
		mainWindow.loadURL('http://localhost:4200');
	} else {
		mainWindow.loadFile(INDEX_PATH);
	}

	mainWindow.once('ready-to-show', () => mainWindow.show());

	if (DEV_MODE) {
		mainWindow.webContents.openDevTools();
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
