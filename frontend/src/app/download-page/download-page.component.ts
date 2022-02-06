import { ElectronService } from '../services/electron.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'app-download-page',
	templateUrl: './download-page.component.html',
	styleUrls: ['./download-page.component.scss']
})
export class DownloadPageComponent implements OnInit, OnDestroy {
	public hasValidURL: boolean = false;
	public hasInput: boolean = false;
	public inputURL: string = '';
	public destinationPath: string = '';
	public inProgress: boolean = false;
	public workState: string = 'Waiting';
	public currentVideo: SafeUrl = '';

	private readonly _cdr: ChangeDetectorRef;
	private readonly _electron: ElectronService;
	private readonly _urlPattern: RegExp;
	private readonly _sanitizer: DomSanitizer;

	public constructor(cdr: ChangeDetectorRef, electron: ElectronService, sanitizer: DomSanitizer) {
		this._urlPattern = /https?:\/\/(?:www\.)?(reddit\.com\/r\/[a-zA-Z0-9_]{2,24}\/comments\/[a-zA-Z0-9]{6,8}\/[a-z0-9_]{1,}|v\.redd\.it\/[a-z0-9]{8,})/i;
		this._cdr = cdr;
		this._electron = electron;
		this._sanitizer = sanitizer;
	};

	public async ngOnInit(): Promise<void> {
		this.destinationPath = await this._electron.getPath('downloads');

		const clipboardText = this._electron.clipboard.readText();
		if (this._urlPattern.test(clipboardText)) {
			this.inputURL = clipboardText;
			this._verifyURL();
		}

		this._electron.ipc.on('work-state', this.onWorkStateChange.bind(this));
		this._electron.ipc.on('set-video', this.onSetVideo.bind(this));
	};

	public ngOnDestroy(): void {
		this._electron.ipc.removeListener('work-state', this.onWorkStateChange.bind(this));
	};

	public onInputChange(event: Event): void {
		const input = (<HTMLInputElement>event.target).value
		this.inputURL = input ?? '';
		this._verifyURL();
	};

	public async chooseDestination(): Promise<void> {
		const folder = await this._electron.ipc.invoke('choose-folder', 'Choose a download destination');
		if (folder) {
			this.destinationPath = folder;
		}
	};

	public async submitURL(): Promise<void> {
		if (this.hasValidURL) {
			this.currentVideo = '';
			this.inProgress = true;
			await this._electron.ipc.invoke('start-download', this.inputURL, this.destinationPath);
			this._reset();
		}
	};

	public onWorkStateChange(event: any, state: string): void {
		this.workState = state;
		this._cdr.detectChanges();
	};

	public onSetVideo(event: any, path: string): void {
		this.currentVideo = this._sanitizer.bypassSecurityTrustUrl(path);
		this._cdr.detectChanges();

		console.log(path);
		console.log(this.currentVideo);
	};

	private _reset(): void {
		this.hasValidURL = false;
		this.hasInput = false;
		this.inputURL = '';
		this.inProgress = false;
	};

	private _verifyURL(): void {
		if (this.inputURL) {
			this.hasInput = true;
			this.hasValidURL = this._urlPattern.test(this.inputURL);
		} else {
			this.hasInput = false;
		}
	};
};
