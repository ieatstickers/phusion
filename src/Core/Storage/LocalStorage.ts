
import {StorageItem} from "./StorageItem";
import * as Moment from "moment";
import {StorageApi} from "./StorageApi";

export class LocalStorage
{
	public static clear()
	{
		return StorageApi.clear(window.localStorage);
	}

	public static get(key: string): StorageItem | null
	{
		return StorageApi.get(key, window.localStorage);
	}

	public static remove(key: string)
	{
		return StorageApi.remove(key, window.localStorage);
	}

	public static set(
		key: string,
		value: any,
		expiry: Moment.Moment | Date | string = null
	)
	{
		return StorageApi.set(key, value, expiry, window.localStorage);
	}
}
