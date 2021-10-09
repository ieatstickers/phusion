
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

		let storageValue: any = storageItemRawValue;

		try
		{
			storageValue = JSON.parse(storageItemRawValue);
		}
		catch (exception) {}
    
    if (
      typeof storageValue === 'object'
      && storageValue.key !== undefined
      && storageValue.value !== undefined
      && storageValue.created !== undefined
      && storageValue.expiry !== undefined
    )
    {
      return storageValue.value;
    }

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
