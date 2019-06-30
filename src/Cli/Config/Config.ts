import {Objects} from "../../Core/Objects/Objects";
import {FileSystem} from "../FileSystem/FileSystem";
import {Strings} from "../../Core/Strings/Strings";

export class Config
{
	protected static configObject: Object = {};
	protected static configDirs: Array<string> = [];
	protected static mergeRules: Array<RegExp> = [];

	public static addConfigDir(configDir: string)
	{
		this.configDirs.push(configDir);
	}

	public static setConfigDirs(configDirs: Array<string>)
	{
		this.configDirs = configDirs;
	}

	public static setConfigArray(configArray: Object)
	{
		this.configObject = configArray;
	}

	public static addMergeRule(regex: RegExp)
	{
		this.mergeRules.push(regex);
	}

	public static setMergeRules(mergeRules: Array<RegExp>)
	{
		this.mergeRules = mergeRules;
	}

	public static generate()
	{
		// Init config cache
		let configCache = {};
		let mergedConfig = {};

		// For each rule
		for (let mergeRuleRegex of this.mergeRules)
		{
			// For each config directory
			for (let configDirectory of this.configDirs)
			{
				// if there is a cache for the directory
				if (typeof configCache[configDirectory] !== 'undefined')
				{
					// loop through file cache
					for (let filePath in configCache[configDirectory])
						if (configCache[configDirectory].hasOwnProperty(filePath))
					{
						let configArray = configCache[configDirectory][filePath];
						// For each file, merge if it matches the rule
						if (filePath.match(mergeRuleRegex))
						{
							mergedConfig = Objects.merge(mergedConfig, configArray);
						}
					}
				}
				else
				{
					// If directory doesn't exist
					if (!FileSystem.fileExists(configDirectory))
					{
						throw new Error("Config directory not found: configDirectory");
					}

					// Get all files from the directory
					let files = FileSystem.getDirContents(configDirectory);

					// For each file
					for (let file of files)
					{
						if (
							file == '.'
							||
							file == '..'
							||
							(
								!Strings.endsWith(file, '.yml')
								&&
								!Strings.endsWith(file, '.yaml')
							)
					)
						{
							continue;
						}

						// Read it in
						let fileAsArray = FileSystem.readYaml(configDirectory + '/' + file);

						if (!fileAsArray)
						{
							continue;
						}

						if (typeof configCache[configDirectory] == 'undefined')
						{
							configCache[configDirectory] = {};
						}

						// Cache it
						configCache[configDirectory][file] = fileAsArray;

						// For each file, merge if it matches the rule
						if (file.match(mergeRuleRegex))
						{
							mergedConfig = Objects.merge(mergedConfig, fileAsArray);
						}
					}
				}
			}
		}

		this.configObject = mergedConfig;
		return mergedConfig;
	}

	public static toObject()
	{
		return this.configObject;
	}

	public static getByPath(configPath: string)
	{
		return Objects.getByKeyPath(configPath, this.configObject);
	}
}
