
import {AbstractTask} from "./AbstractTask";
import {TaskInterface} from "./TaskInterface";
import {Config as CoreConfig} from "../Core/Config/Config";
import {Config as CliConfig} from "../Cli/Config/Config";
import {FileSystem} from "../Cli/FileSystem/FileSystem";

export class ConfigTask extends AbstractTask implements TaskInterface
{
	protected exec()
	{
		let configDirPath = CoreConfig.getByPath('configDirPath');
		let outputFilePath = CoreConfig.getByPath('outputFilePath');
		let outputFormat = CoreConfig.getByPath('outputFormat');
		let variableName = CoreConfig.getByPath('variableName');

		// Add trailing slash to configDirPath if needed
		if (configDirPath.charAt(configDirPath.length -1) !== '/')
		{
			configDirPath+= '/';
		}

		CliConfig.addConfigDir(configDirPath);
		CliConfig.addMergeRule(/default-.+/);

		let env = global.process.env.ENV || null;

		if (env)
		{
			CliConfig.addMergeRule(new RegExp(env + '-.+'));
		}

		let mergedConfig = CliConfig.generate();

		// If config file already exists
		// Empty it
		FileSystem.writeFile(outputFilePath, '');

		// If no configs exists, we want to write an empty object to the config file
		// rather than the word 'null'
		if (!mergedConfig)
		{
			mergedConfig = {};
		}

		let fileContents = JSON.stringify(mergedConfig, null, 2);

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
		FileSystem.writeFile(
			outputFilePath,
			fileContents
		);

		return true;
	}

	protected getRequiredTaskConfigPaths(): Object
	{
		return {
			configDirPath: "string",
			outputFilePath: "string",
			outputFormat: "string",
			variableName: "string"
		};
	}

	protected getDefaultTaskConfig(): Object
	{
		let cwd = process.cwd();

		return {
			configDirPath: cwd + '/config',
			outputFilePath: cwd + "/cache/config.js",
			outputFormat: "js",
			variableName: "config"
		};
	}
}