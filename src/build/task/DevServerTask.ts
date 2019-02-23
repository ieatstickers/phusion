
import {AbstractTask} from "./AbstractTask";
import {TaskInterface} from "./TaskInterface";
import {Config} from "../module/Config/Entity/Config";

export class DevServerTask extends AbstractTask implements TaskInterface
{
	protected browserSync: any;
	protected express: any;
	protected nodeJsPath: any;
	protected watch: any;

	public run()
	{
		this.logInfo('DevServerTask: started');
		let taskConfig = this.getTaskConfig();
		let browserSyncConfig = taskConfig.getByPath('browserSyncConfig');

		// Create a new instance of Browser Sync
		let browserSync = this.getBrowserSync().create();

		if (browserSyncConfig instanceof Config)
		{
			browserSyncConfig = browserSyncConfig.toObject();
		}

		// Start a BrowserSync proxy (opens in new browser window)
		browserSync.init(browserSyncConfig);
	}

	public getRequiredTaskConfigPaths(): Object
	{
		return {
			browserSyncConfig: "object",
			'browserSyncConfig:serveStatic': 'object'
		};
	}

	protected getDefaultTaskConfig(): Object
	{
		return {
			browserSyncConfig: {
				host: 'localhost',
				port: 3000,
				proxy: 'localhost:3000', // Can be changed to custom URL e.g. my-site.local
				single: true, // SPA Routing
			}
		};
	}

	protected getBrowserSync():any
	{
		if (!this.browserSync)
		{
			this.browserSync = eval('require')('browser-sync');
		}

		return this.browserSync;
	};

}