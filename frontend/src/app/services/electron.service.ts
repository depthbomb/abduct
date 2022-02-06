import { Injectable } from '@angular/core';

import type { Clipboard, IpcRenderer } from 'electron';

@Injectable({
	providedIn: 'root'
})
export class ElectronService {
	public readonly ipc: IpcRenderer;
	public readonly clipboard: Clipboard;
	public readonly getPath: (name: string) => Promise<string>;

	constructor() {
		const { clipboard, ipcRenderer } = window.require('electron');
		this.ipc = ipcRenderer;
		this.clipboard = clipboard;
		this.getPath = (name: string) => new Promise(resolve => ipcRenderer.invoke('get-path', name).then((res: string) => resolve(res)));
	};
};
