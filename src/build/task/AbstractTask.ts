
import {ModuleContainer} from "../module/ModuleContainer";
import {Config} from "../module/Config/Entity/Config";

export abstract class AbstractTask
{
	protected moduleContainer: ModuleContainer;
	protected taskConfig: Config;
	protected running: boolean = false;
	protected queued: number = 0;
	protected queueLimit: number = 0;

	public constructor(taskConfig: Object = {})
	{
		// Get default task config
		let defaultConfig = this.getDefaultTaskConfig();

		let configModule = this
			.getModuleContainer().getConfigModule();

		// Merge the default config with overrides
		let mergedConfigObject = configModule
			.merge(defaultConfig, taskConfig);

		// Set task config as Config object
		this.taskConfig = configModule.toConfig(mergedConfigObject);

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
		this.logInfo(taskName + ': started');

		// Execute the task
		this.exec();

		this.running = false;
		this.logInfo(taskName + ': finished');

		this.shutdown();
	}

	protected getDefaultTaskConfig(): Object
	{
		return {};
	}

	protected getTaskConfig(): Config
	{
		return this.taskConfig;
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

				let requiredConfigValue = this.getTaskConfig().getByPath(requiredConfigPath);

				let actualType = typeof requiredConfigValue;

				if (!requiredConfigValue)
				{
					this.logError(this.constructor['name'] + ': Invalid task config. Required key path not found: ' + requiredConfigPath);
					global.process.exit();
				}
				else if (actualType !== requiredType)
				{
					this.logError(this.constructor['name'] + ': Invalid task config value for "' + requiredConfigPath + '". Expected type of ' + requiredType + ', received ' + actualType);
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

	protected logError(message: string): this
	{
		this.getModuleContainer().getLogModule().error(message);

		return this;
	}

	protected logInfo(message: string): this
	{
		this.getModuleContainer().getLogModule().info(message);

		return this;
	}

	protected logSuccess(message: string): this
	{
		this.getModuleContainer().getLogModule().success(message);

		return this;
	}

	protected logWarning(message: string): this
	{
		this.getModuleContainer().getLogModule().warning(message);

		return this;
	}

	protected getModuleContainer(): ModuleContainer
	{
		if (!this.moduleContainer)
		{
			this.moduleContainer = new ModuleContainer();
		}

		return this.moduleContainer;
	}
}