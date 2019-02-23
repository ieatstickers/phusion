import {AbstractModule} from "../AbstractModule";
import {SessionStorageItem} from "./Entity/SessionStorageItem";
import * as Moment from 'moment';
import {SessionStorageModuleInterface} from "./SessionStorageModuleInterface";

export class SessionStorageModule extends AbstractModule implements SessionStorageModuleInterface
{
	public clear(): this
	{
		window.sessionStorage.clear();
		return this;
	}

	public get(key: string): SessionStorageItem | null
	{
		// Get the stringified cache value
		let storageItemJson = window.sessionStorage.getItem(key);

		if (!storageItemJson)
		{
			return null;
		}

		let storageItemObject: Object;

		// Try to parse the JSON value
		try
		{
			storageItemObject = JSON.parse(storageItemJson);
		}
		catch (exception)
		{
			// If it fails to parse, log an error and return null
			console.error('Failed to parse cache value found for key: ' + key + '.');
			return null;
		}

		// As the JSON parsed successfully, we can now convert the returned Object
		// into a StorageItem entity
		let storageItemEntity = this.getStorageItemEntityFromObject(storageItemObject);

		// If the cache item is not expired
		if (storageItemEntity && !storageItemEntity.isExpired())
		{
			// Return it
			return storageItemEntity;
		}

		// If it has expired, delete it from local storage and return null
		this.remove(key);
		return null;
	}

	public remove(key: string): this
	{
		window.sessionStorage.removeItem(key);
		return this;
	}

	/**
	 * expiry either needs to be a Date object or a string in the following format:
	 * colon (:) delimited string e.g. 5w:3d:2h:4m:3s
	 * can be any combination of w | d | h | m | s
	 *
	 */
	public set(
		key: string,
		value: any,
		expiry: Moment.Moment | Date | string = null
	): this
	{
		let unixCreated = Moment().valueOf();
		let unixExpiry = null;

		if (expiry)
		{
			if (
					 Moment.isMoment(expiry)
				|| expiry instanceof Date
			)
			{
				unixExpiry = expiry.valueOf();
			}
			else if (typeof expiry == 'string')
			{
				let expiryTimeInSeconds = this.getTimeInSecondsFromTimeString(expiry);
				unixExpiry = unixCreated + (expiryTimeInSeconds * 1000); // Multiplied by 1000 to convert to milliseconds
			}
		}

		let cacheData = {
			"key": key,
			"value": value,
			"created": unixCreated,
			"expiry": unixExpiry
		};
		let cacheValue = JSON.stringify(cacheData);

		window.sessionStorage.setItem(key, cacheValue);

		return this;
	}

	private getStorageItemEntityFromObject(object: Object): SessionStorageItem
	{
		let storageItem = this.getStorageItemEntity();

		let value = object['value'];

		try
		{
			value = JSON.parse(value);
		}
		catch (e)
		{
			// Do nothing, leave value as it is
		}

		storageItem.setKey(object['key'] ? object['key'] : null);
		storageItem.setValue(value ? value : null);
		storageItem.setExpiry(object['expiry'] ? Moment(object['expiry']) : null);
		storageItem.setCreated(object['created'] ? Moment(object['created']) : null);

		return storageItem;
	}

	private getStorageItemEntity(): SessionStorageItem
	{
		return new SessionStorageItem();
	}
}
