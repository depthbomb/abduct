import { app } from 'electron';

import type { IpcMainInvokeEvent } from 'electron';

type PathNames = 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps';

export default async function(event: IpcMainInvokeEvent, name: PathNames) {
	return app.getPath(name);
};
