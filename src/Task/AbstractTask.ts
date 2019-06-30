
import {Log} from "../Cli/Log/Log";
import {Objects} from "../Core/Objects/Objects";
import {Config} from "../Core/Config/Config";

export abstract class AbstractTask
{
	protected running: boolean = false;
	protected queued: number = 0;
	protected queueLimit: number = 0;

	public constructor(taskConfig: Object = {})
	{
		// Get default task config
		let defaultConfig = this.getDefaultTaskConfig();

		// Merge the default config with overrides
		let mergedConfigObject = Objects.merge(defaultConfig, taskConfig);

		// Set task config as Config object
		Config.setConfigObject(mergedConfigObject);

		this.validateTaskConfig();
	}

	public run()
	{
		// If task is already running
		if (this.running)
		{
			// Queue it up
			this.queue();
			return;
		}

		let taskName = this.constructor['name'];

		// Log task as running
		this.running = true;
		Log.info(taskName + ': started');

		// Execute the task
		this.exec();

		this.running = false;
		Log.success(taskName + ': finished');

		this.shutdown();
	}

	protected getDefaultTaskConfig(): Object
	{
		return {};
	}

	protected getRequiredTaskConfigPaths(): Object
	{
		return {};
	}

	protected validateTaskConfig(): this
	{
		this.validateTaskConfigForRequiredPathsAndTypes();

		return this;
	}

	protected validateTaskConfigForRequiredPathsAndTypes(): this
	{
		let requiredTaskConfigPaths = this.getRequiredTaskConfigPaths();

		for (let requiredConfigPath in requiredTaskConfigPaths)
			if (requiredTaskConfigPaths.hasOwnProperty(requiredConfigPath))
			{
				let requiredType = requiredTaskConfigPaths[requiredConfigPath];

				let requiredConfigValue = Config.getByPath(requiredConfigPath);

				let actualType = typeof requiredConfigValue;

				if (!requiredConfigValue)
				{
					Log.error(this.constructor['name'] + ': Invalid task config. Required key path not found: ' + requiredConfigPath);
					global.process.exit();
				}
				else if (actualType !== requiredType)
				{
					Log.error(this.constructor['name'] + ': Invalid task config value for "' + requiredConfigPath + '". Expected type of ' + requiredType + ', received ' + actualType);
					global.process.exit();
				}
			}

		return this;
	}

	protected queue()
	{
		if (this.queued < this.queueLimit)
		{
			this.queued++;
		}

		return this;
	}

	protected shutdown()
	{
		// Remove one from the queue
		this.queued--;

		// If there are tasks in the queue
		if (this.queued > 0)
		{
			// Run it
			this.run();
		}

		return this;
	}

	protected exec()
	{
		throw new Error('exec() method must be implemented');
	}
}