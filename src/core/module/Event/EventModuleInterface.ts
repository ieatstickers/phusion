
import {PhusionAwareInterface} from "../Phusion/PhusionAwareInterface";

export interface EventModuleInterface extends PhusionAwareInterface
{
	dispatch(channel: string, data?: any): this;
	on(channel: string, callback: Function): this;
}

