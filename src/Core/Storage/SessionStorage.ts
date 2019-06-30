
import {StorageItem} from "./StorageItem";
import * as Moment from "moment";
import {StorageApi} from "./StorageApi";

export class SessionStorage
{
	public static clear()
	{
		return StorageApi.clear(window.sessionStorage);
	}

	public static get(key: string): StorageItem | null
	{
		return StorageApi.get(key, window.sessionStorage);
	}

	public static remove(key: string)
	{
		return StorageApi.remove(key, window.sessionStorage);
	}

	public static set(
		key: string,
		value: any,
		expiry: Moment.Moment | Date | string = null
	)
	{
		return StorageApi.set(key, value, expiry, window.sessionStorage);
	}
}
