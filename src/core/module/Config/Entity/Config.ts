
import {PhusionInterface} from "../../../PhusionInterface";

export class Config
{
	private configObject: Object = {};
	private phusion: PhusionInterface;

	public constructor(
		configObject: Object,
		phusion: PhusionInterface
	)
	{
		this.configObject = configObject;
		this.phusion = phusion;
	}

	public getByPath(
		configPath: string
	): any
	{
		// Parse config for value
		let configValue = this
			.getPhusion()
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
			return new Config(configValue, this.getPhusion());
		}

		return configValue;
	}

	public toObject(): Object
	{
		return this.configObject;
	}

	private getPhusion(): PhusionInterface
	{
		return this.phusion;
	}
}
