import {Objects} from "../Objects/Objects";

export class Config
{
	private static configObject: Object = {};

	public static getByPath(
		configPath: string
	): any
	{
		// Parse config for value
		return Objects.getByKeyPath(configPath, this.configObject);
	}

	public static setConfigObject(configObject: Object)
	{
		this.configObject = configObject;
	}

	public static toObject(): Object
	{
		return this.configObject;
	}
}
