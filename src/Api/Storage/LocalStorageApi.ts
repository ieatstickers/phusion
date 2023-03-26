
import {StorageApi} from "./StorageApi";

export class LocalStorageApi
{
	public static clear(): void
	{
		return StorageApi.clear(window.localStorage);
	}

	public static get(key: string): any
	{
		return StorageApi.get(key, window.localStorage);
	}

	public static remove(key: string): void
	{
		return StorageApi.remove(key, window.localStorage);
	}

	public static set(
		key: string,
		value: any
	): void
	{
		return StorageApi.set(key, value, window.localStorage);
	}
}
