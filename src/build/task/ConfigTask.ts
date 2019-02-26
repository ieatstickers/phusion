
import {AbstractTask} from "./AbstractTask";
import {TaskInterface} from "./TaskInterface";

export class ConfigTask extends AbstractTask implements TaskInterface
{
	protected exec()
	{
		let taskConfig = this.getTaskConfig();

		let configDirPath = taskConfig.getByPath('configDirPath');
		let outputFilePath = taskConfig.getByPath('outputFilePath');
		let outputFormat = taskConfig.getByPath('outputFormat');
		let variableName = taskConfig.getByPath('variableName');

		// Add trailing slash to configDirPath if needed
		if (configDirPath.charAt(configDirPath.length -1) !== '/')
		{
			configDirPath+= '/';
		}

		this.getModuleContainer().getConfigModule().generateConfig(configDirPath, outputFilePath, outputFormat, variableName);
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