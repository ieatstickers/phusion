
import * as Moment from 'moment';
import {Time} from "../Time/Time";
import {StorageItem} from "./StorageItem";

export class StorageApi
{
	public static clear(storageProvider: Storage)
	{
		storageProvider.clear();
		return this;
	}

	public static get(key: string, storageProvider: Storage): StorageItem | null
	{
		let storageItemJson = storageProvider.getItem(key);


		if (storageItemJson === null || storageItemJson === undefined)
		{
			return null;
		}

		let storageItemObject: Object;

		try
		{
			storageItemObject = JSON.parse(storageItemJson);
		}
		catch (exception) {}

		if (
			!storageItemObject
			||
			!storageItemObject['key']
			||
			!storageItemObject['created']
			||
			!storageItemObject['value']
		)
		{
			storageItemObject = {
				key: key,
				expiry: null,
				created: null,
				value: storageItemJson
			};
		}

		let storageItemEntity = this.create(storageItemObject);

		if (
			storageItemEntity
			&&
			storageItemEntity.expiry
			&&
			storageItemEntity.isExpired()
		)
		{
			this.remove(key, storageProvider);
			return null;
		}

		return storageItemEntity;
	}

	public static remove(key: string, storageProvider: Storage)
	{
		storageProvider.removeItem(key);
		return this;
	}

	public static set(
		key: string,
		value: any,
		expiry: Moment.Moment | Date | string,
		storageProvider: Storage
	)
	{
		let unixCreated = Moment().valueOf();
		let unixExpiry = null;

		if (expiry)
		{
			if (typeof expiry == 'string')
			{
				let expiryTimeInSeconds = Time.timeStringToSeconds(expiry);
				unixExpiry = unixCreated + (expiryTimeInSeconds * 1000); // Multiplied by 1000 to convert to milliseconds
			}
			else if (Moment.isMoment(expiry) || expiry instanceof Date)
			{
				unixExpiry = expiry.valueOf();
			}
		}

		let cacheData = {
			"key": key,
			"value": value,
			"created": unixCreated,
			"expiry": unixExpiry
		};
		let cacheValue = JSON.stringify(cacheData);

		storageProvider.setItem(key, cacheValue);

		return this;
	}

	private static create(object: Object): StorageItem
	{
		let storageItem = new StorageItem();

		let value = object['value'];

		try {
			value = JSON.parse(value);
		}
		catch (e)
		{
			// Do nothing, leave value as is
		}

		storageItem.key = object['key'] ? object['key'] : null;
		storageItem.value = value ? value : null;
		storageItem.expiry = object['expiry'] ? Moment(object['expiry']) : null;
		storageItem.created = object['created'] ? Moment(object['created']) : null;

		return storageItem;
	}
}
