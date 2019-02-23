
import {PhusionAwareInterface} from "../Phusion/PhusionAwareInterface";
import {Config} from "./Entity/Config";

export interface ConfigModuleInterface extends PhusionAwareInterface
{
	getConfig(): Config;
	getObjectValueByKeyPath(keyPath:string, object: Object):any;
	merge(...objectsToMerge): Object;
}
