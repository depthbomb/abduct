import { dialog, BrowserWindow } from 'electron';

import type { IpcMainInvokeEvent } from 'electron';

export default async function(event: IpcMainInvokeEvent, title: string, message: string) {
	const currentWindow = BrowserWindow.getAllWindows()[0];
	await dialog.showMessageBox(currentWindow, {
		title,
		message,
		type: 'error'
	});
};
