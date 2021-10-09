
import {StorageApi} from "./StorageApi";

export class SessionStorage
{
	public static clear()
	{
		return StorageApi.clear(window.sessionStorage);
	}

	public static get(key: string): any
	{
		return StorageApi.get(key, window.sessionStorage);
	}

	public static remove(key: string)
	{
		return StorageApi.remove(key, window.sessionStorage);
	}

	public static set(
		key: string,
		value: any
	)
	{
		return StorageApi.set(key, value, window.sessionStorage);
	}
}
