import { nanoid } from 'nanoid';
import { join } from 'node:path';
import http from '#services/http';
import { promisify } from 'node:util';
import { FFMPEG_PATH } from '#constants';
import sanitize from 'sanitize-filename';
import { unlink } from 'node:fs/promises';
import { exec as cpExec } from 'node:child_process';
import { shell, dialog, BrowserWindow } from 'electron';

import type { IpcMainInvokeEvent } from 'electron';

export default async function(event: IpcMainInvokeEvent, url: string, destinationPath: string): Promise<any> {
	if (!url.endsWith('.json')) {
		url = url + '.json';
	}

	const exec = promisify(cpExec);
	const mainWindow = BrowserWindow.getAllWindows()[0];

	mainWindow.webContents.send('work-state', 'Checking URL');

	const { data } = await http.get(url);
	const postData = data[0].data.children[0].data;

	if (postData.secure_media) {
		mainWindow.webContents.send('work-state', 'Downloading media files');

		const videoFile = join(destinationPath, `${nanoid()}.mp4`);
		const audioFile = join(destinationPath, `${nanoid()}.mp4`);

		const media = postData.secure_media.reddit_video;
		const outputFile = join(destinationPath, `${sanitize(postData.title)}.mp4`);
		const videoURL = media.fallback_url;
		const audioURL = videoURL.replace(/DASH_\d{2,4}/, 'DASH_audio');

		await http.downloadFile(videoURL, videoFile);
		await http.downloadFile(audioURL, audioFile);

		mainWindow.webContents.send('work-state', 'Combining media files');

		try {
			const { stderr, stdout} = await exec(`${FFMPEG_PATH} -i "${videoFile}" -i "${audioFile}" -c:v copy -c:a aac "${outputFile}" -y`);

			console.log(stdout);
			console.log(stderr);

			shell.beep();

			mainWindow.webContents.send('set-video', outputFile);

			return { success: true, message: null };
		} catch (err: unknown) {
			await dialog.showMessageBox(mainWindow, {
				title: 'Error',
				message: 'There was a problem downloading the video.',
				type: 'error'
			});

			return { success: false, message: err };
		} finally {
			await unlink(videoFile);
			await unlink(audioFile);
		}
	} else {
		return { success: false, message: 'The Reddit URL you provided is not a video post.' };
	}
};
