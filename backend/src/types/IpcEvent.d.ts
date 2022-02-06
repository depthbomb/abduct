export abstract class BaseIpcEvent {
	public abstract execute(...args: any[]): Promise<any>;
};
