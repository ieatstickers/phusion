
import {AbstractModule} from "../AbstractModule";
import {CookieModuleInterface} from "./CookieModuleInterface";
import {Cookie} from "./Entity/Cookie";
import * as Moment from 'moment';

export class CookieModule extends AbstractModule implements CookieModuleInterface
{
	public create(key: string, value: any): Cookie
	{
		return new Cookie(key, value);
	}

	public get(key:string): Cookie
	{
		// Get all Cookies organised by key
		let allCookies = this.getAll();

		// Get Cookie for key provided
		let cookie = allCookies[key];

		// If it exists
		if (typeof cookie != 'undefined')
		{
			// Return Cookie
			return cookie;
		}

		return null;
	}

	public getAll(): Object
	{
		let documentCookieString = document.cookie;

		// Get array of cookie strings (one per cookie)
		let cookieStrings = documentCookieString.split(';');

		// Initialise a new object to store them key => value
		let cookieEntityConfig = {};

		// For each cookie string
		for (let cookieString of cookieStrings)
		{
			// Create Cookie object from cookie string
			let cookieEntity = this.toEntity(cookieString);

			// Store in object under it's key
			cookieEntityConfig[cookieEntity.getKey()] = cookieEntity;
		}

		return cookieEntityConfig;
	}

	public set(key:string, value: string, expiry: Moment.Moment | Date | string = null, domain: string = null, path: string = null): this
	{
		// Build cookie string
		let cookieString = key + '=' + value;

		// If a domain was passed in
		if (domain)
		{
			cookieString += ';domain=' + domain;
		}

		// If a path was passed in
		if (path)
		{
			cookieString += ';path=' + path;
		}

		// If an expiry was passed in
		if (expiry)
		{
			let dateString = "";

			// If expiry is a Moment object
			if (Moment.isMoment(expiry))
			{
				dateString = expiry.toDate().toUTCString();
			}
			// If expiry is a Date object
			else if (expiry instanceof Date)
			{
				dateString = expiry.toUTCString();
			}
			// If expiry is a string
			else if (typeof expiry === 'string')
			{
				// Convert time string into expiry date object
				let timeInSeconds = this.getTimeInSecondsFromTimeString(expiry);
				let now = new Date();
				let nowTimeStamp = now.valueOf();
				let expiryTimeStamp = nowTimeStamp + (timeInSeconds * 1000);
				let expiryDate = new Date();
				expiryDate.setTime(expiryTimeStamp);

				// Get expiry date as UTC string
				dateString = expiryDate.toUTCString();
			}
			else
			{
				console.error('Cannot set cookie - expiry format not recognised. Please provide a Moment or Date class instance or a time string.');

				return this;
			}

			// Add expiry to cookie string
			cookieString += ';expires=' + dateString;
		}

		// Set cookie string
		document.cookie = cookieString;

		return this;
	}

	private toEntity(cookieString: string)
	{
		let cookieStringParts = cookieString.split('=');
		let key = cookieStringParts[0];
		key = key.replace(' ', '');
		let value = cookieStringParts[1];

		return this
			.create(key, value);
	}
}
