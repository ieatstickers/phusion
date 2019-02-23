
import * as Moment from "moment";
import {Cookie} from "./Entity/Cookie";

export interface CookieModuleInterface
{
	create(key: string, value: any): Cookie;
	get(key: string): Cookie;
	getAll(): Object;
	set(key:string, value: string, expiry?: Moment.Moment | Date | string, domain?: string, path?: string): this;
}
