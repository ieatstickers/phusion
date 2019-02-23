import {ModuleContainer} from "../../ModuleContainer";

export class Config
{
	private configObject: Object = {};
	private moduleContainer: ModuleContainer;

	public constructor(
		configObject: Object,
		moduleContainer: ModuleContainer
	)
	{
		this.configObject = configObject;
		this.moduleContainer = moduleContainer;
	}

	public getByPath(
		configPath: string
	): any
	{
		// Parse config for value
		let configValue = this
			.getModuleContainer()
			.getConfigModule()
			.getObjectValueByKeyPath(configPath, this.configObject);

		// If the value is an object
		if (
			!(Array.isArray(configValue))
			&&
			configValue instanceof Object
		)
		{
			// Return new instance of the Config class, constructed with the config value found
			return new Config(configValue, this.getModuleContainer());
		}

		return configValue;
	}

	public toObject(): Object
	{
		return this.configObject;
	}

	private getModuleContainer(): ModuleContainer
	{
		return this.moduleContainer;
	}
}
