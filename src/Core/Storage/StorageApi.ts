
export class StorageApi
{
	public static clear(storageProvider: Storage)
	{
		storageProvider.clear();
		return this;
	}

	public static get(key: string, storageProvider: Storage): any
	{
		let storageItemRawValue = storageProvider.getItem(key);

		if (storageItemRawValue === null || storageItemRawValue === undefined)
		{
			return null;
		}

		let storageValue = storageItemRawValue;

		try
		{
			storageValue = JSON.parse(storageItemRawValue);
		}
		catch (exception) {}

		return storageValue;
	}

	public static remove(key: string, storageProvider: Storage)
	{
		storageProvider.removeItem(key);
		return this;
	}

	public static set(
		key: string,
		value: any,
		storageProvider: Storage
	)
	{
		const cacheValue = typeof value === 'object' ? JSON.stringify(value) : value;
		storageProvider.setItem(key, cacheValue);

		return this;
	}
}
