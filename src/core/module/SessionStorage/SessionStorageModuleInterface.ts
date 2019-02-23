import {PhusionAwareInterface} from "../Phusion/PhusionAwareInterface";
import * as Moment from 'moment';
import {SessionStorageItem} from "./Entity/SessionStorageItem";

export interface SessionStorageModuleInterface extends PhusionAwareInterface
{
	clear(): this;
	get(key: string): SessionStorageItem | null;
	remove(key: string): this;
	set(
		key: string,
		value: any,
		expiry?: Moment.Moment | Date | string
	): this;
}
