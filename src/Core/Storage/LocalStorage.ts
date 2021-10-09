
import {StorageApi} from "./StorageApi";

export class LocalStorage
{
	public static clear()
	{
		return StorageApi.clear(window.localStorage);
	}

	public static get(key: string): any
	{
		return StorageApi.get(key, window.localStorage);
	}

	public static remove(key: string)
	{
		return StorageApi.remove(key, window.localStorage);
	}

	public static set(
		key: string,
		value: any
	)
	{
		return StorageApi.set(key, value, window.localStorage);
	}
}
