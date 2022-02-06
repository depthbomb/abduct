import { shell } from 'electron';

import type { IpcMainInvokeEvent } from 'electron';

export default async function(event: IpcMainInvokeEvent, url: string) {
	return shell.openExternal(url);
};
