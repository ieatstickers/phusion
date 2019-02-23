import {AbstractModule} from "../AbstractModule";
import {ConfigModuleInterface} from "./ConfigModuleInterface";
import {Config} from "./Entity/Config";
import {DefaultMergeHandler} from "./MergeHandler/Default/DefaultMergeHandler";
import {EnvironmentMergeHandler} from "./MergeHandler/Environment/EnvironmentMergeHandler";

export class ConfigModule extends AbstractModule implements ConfigModuleInterface
{
	protected masterConfig: Object = {};

	public toConfig(object: Object): Config
	{
		return new Config(object, this.getModuleContainer());
	}

	public generateConfig(configDirPath: string, outputFilePath: string, outputFormat: string = 'js', variableName: string = 'config'): boolean
	{
		// Reset master config
		this.masterConfig = {};

		let fileSystemModule = this.getModuleContainer().getFileSystemModule();
		let configMergeHandlerArray = this.getConfigMergeHandlers();

		// For each merge handler
		for (let mergeHandlerKey in configMergeHandlerArray)
			if (configMergeHandlerArray.hasOwnProperty(mergeHandlerKey))
			{
				// Define merge handler in current iteration
				let mergeHandlerClass = configMergeHandlerArray[mergeHandlerKey];
				let mergeHandler = new mergeHandlerClass();

				// If configs should be merged
				if (mergeHandler.shouldMerge())
				{
					// Create regex object
					let regex = new RegExp(mergeHandler.getRegexPattern());

					// Get array of file names in config directory
					let fileArray;

					try
					{
						// Try to read all files from the config directory
						fileArray = fileSystemModule.getFiles(configDirPath);
					}
					catch (e)
					{
						// If config directory doesn't exists, the readdirSync method will throw an error
						// If this happens, we just skip to the next merge handler
						continue;
					}

					// For each file in the config directory
					for (let fileKey in fileArray)
						if (fileArray.hasOwnProperty(fileKey))
						{
							let fileName = fileArray[fileKey];

							// Check if the filename matches the regex pattern
							let fileMatches = regex.test(fileName);

							// If it matches
							if (fileMatches)
							{
								// Build config file path (relative to this file)
								let configFilePath = configDirPath + '/' + fileName;

								// Convert yaml contents to js object
								let configObject = fileSystemModule.readYaml(configFilePath);

								// If yaml file is empty, it will return null
								// Without this conditional, if a yaml file is empty it will
								// overwrite all previously merged configs
								if (!configObject)
								{
									configObject = {};
								}

								// Recursively merge config object into master config
								this.masterConfig = this.merge(this.masterConfig, configObject);
							}

						}
				}
			}

		// If config file already exists
		// Empty it
		fileSystemModule.writeFile(outputFilePath, '');

		// If no configs exists, we want to write an empty object to the config file
		// rather than the word 'null'
		if (!this.masterConfig)
		{
			this.masterConfig = {};
		}

		let fileContents = JSON.stringify(this.masterConfig, null, 2);

		// Format file contents depending on format provided
		if (outputFormat == 'json')
		{
			// Do nothing (file contents formatted for json by default)
		}
		if (outputFormat === 'node')
		{
			fileContents = '\nmodule.exports = ' + fileContents + ';\n';
		}
		else if (outputFormat == 'js')
		{
			fileContents = '\nvar ' + variableName + ' = ' + fileContents + ';\n';
		}

		// Write new generated config to output file
		fileSystemModule.writeFile(
			outputFilePath,
			fileContents
		);

		return true;
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
			} else
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
			Object.keys(source).forEach(function (key: string)
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

	private isObject(item: any): boolean
	{
		return typeof item === 'object';
	};

	private getConfigMergeHandlers(): Array<any>
	{
		return [
			DefaultMergeHandler,
			EnvironmentMergeHandler
		];
	}
}