import { app } from 'electron';
import { join } from 'node:path';

export const APP_NAME = 'Abduct' as const;
export const COMPANY_NAME = 'Caprine Logic' as const;

export const ROOT_PATH = __dirname;
export const COMPANY_PATH = join(app.getPath('documents'), COMPANY_NAME);
export const INDEX_PATH = join(ROOT_PATH, 'index.html');
export const PRELOAD_PATH = join(ROOT_PATH, 'preload.js');
export const FFMPEG_PATH = join(ROOT_PATH, '../', '../', 'bin', 'ffmpeg.exe');

export const USER_AGENT = 'Abduct for Reddit (axios)';
