
import {PhusionAwareInterface} from "../Phusion/PhusionAwareInterface";
import * as Moment from 'moment';
import {LocalStorageItem} from "./Entity/LocalStorageItem";

export interface LocalStorageModuleInterface extends PhusionAwareInterface
{
	clear(): this;
	get(key: string): LocalStorageItem;
	remove(key: string): this;
	set(
		key: string,
		value: any,
		expiry?: Moment.Moment | Date | string
	): this;
}
