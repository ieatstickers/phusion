import {Config} from "./Entity/Config";

export interface ConfigModuleInterface
{
	generateConfig(configDirPath: string, outputFilePath: string, outputFormat?:string, variableName?: string): boolean;

	getObjectValueByKeyPath(keyPath: string, object: Object): any;

	merge(...objectsToMerge): Object;

	toConfig(object: Object): Config;
}