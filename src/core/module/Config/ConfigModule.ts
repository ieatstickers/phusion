
import {ConfigModuleInterface} from "./ConfigModuleInterface";
import {PhusionInterface} from "../../PhusionInterface";
import {Config} from "./Entity/Config";
import {AbstractModule} from "../AbstractModule";

export class ConfigModule extends AbstractModule implements ConfigModuleInterface
{
	private config: Config;

	public constructor(applicationConfig: Object, phusion: PhusionInterface)
	{
		super(phusion);
		// Get default config options
		let defaultConfig = require('./../../../../config');
		// Merge with application config
		let mergedAppConfig = this.merge(defaultConfig, applicationConfig);
		// Create Config object with merged application config
		this.config = new Config(mergedAppConfig, this.getPhusion());
	}

	public getConfig(): Config
	{
		return this.config;
	}

	public getObjectValueByKeyPath(keyPath: string, object: Object): any
	{
		if (!object)
		{
			return null;
		}

		// Split path into array of keys
		let keysArray = keyPath.split(":");

		// Get the total number of keys
		let keyCount = keysArray.length;

		let count = 1;

		// For each key
		for (let key of keysArray)
		{
			// If key exists
			if (object.hasOwnProperty(key))
			{
				// If this is the last key to be accessed
				if (count == keyCount)
				{
					// Return it
					return object[key];
				}

				// If the key doesn't exist
				if (!object[key])
				{
					return null;
				}

				// Adjust object pointer for next key iteration
				object = object[key];

				// Increment count
				count++;
			}
			else
			{
				return null;
			}
		}
	};

	public merge(...objectsToMerge): Object
	{
		return this.deepMergeObjects({}, ...objectsToMerge);
	}

	private deepMergeObjects(target: Object, ...sourceObjects: Array<Object>): Object
	{
		// If no sources passed in, return target
		if (!sourceObjects.length)
		{
			return target;
		}

		// Get first source item
		const source = sourceObjects.shift();

		// Assign functions that need to be used inside "forEach" function below
		let deepMergeObjects = this.deepMergeObjects.bind(this);
		let isMergebleObject = this.isMergeableObject.bind(this);

		// If target and source are both mergeble
		if (this.isMergeableObject(target) && this.isMergeableObject(source))
		{
			// For each object key in source object
			Object.keys(source).forEach(function(key: string)
			{
				// If value at current key is a mergeable object
				if (isMergebleObject(source[key]))
				{
					// If key doesn't exist on target
					if (!target[key])
					{
						// Set to empty object
						target[key] = {};
					}

					// Deep merge target value and source value
					deepMergeObjects(target[key], source[key]);
				}
				// Else, if value is not a mergable object
				else
				{
					// Set value
					target[key] = source[key];
				}
			});
		}

		return deepMergeObjects(target, ...sourceObjects);
	};

	private isMergeableObject(item): boolean
	{
		return this.isObject(item) && !Array.isArray(item);
	};

	private isObject (item: any): boolean
	{
		return typeof item === 'object';
	};
}
