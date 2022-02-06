import { dialog, BrowserWindow } from 'electron';

import type { IpcMainInvokeEvent } from 'electron';

export default async function(event: IpcMainInvokeEvent, title: string = 'Choose a folder') {
	const currentWindow = BrowserWindow.getAllWindows()[0];
	const res = await dialog.showOpenDialog(currentWindow, {
		title,
		properties: ['openDirectory', 'dontAddToRecent'],
	});

	return res.filePaths[0];
};
