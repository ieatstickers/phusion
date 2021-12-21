
import Moment from 'moment';
import {Time} from "../Time/Time";

export class Cookies
{
	public static get(key:string): any
	{
		// Get all Cookies organised by key
		let allCookies = Cookies.getAll();

		// Get Cookies for key provided
		let cookie = allCookies[key];

		// If it exists
		if (typeof cookie != 'undefined')
		{
			// Return Cookies
			return cookie;
		}

		return null;
	}

	public static getAll(): Object
	{
		let documentCookieString = document.cookie;

		// Get array of cookie strings (one per cookie)
		let cookieStrings = documentCookieString.split(';');

		// Initialise a new object to store them key => value
		let cookies = {};

		// For each cookie string
		for (let cookieString of cookieStrings)
		{
			let cookieStringParts = cookieString.split('=');
			let key = cookieStringParts[0];
			key = key.replace(' ', '');

			// Store in object under it's key
			cookies[key] = cookieStringParts[1];
		}

		return cookies;
	}

	public static set(
		key:string,
		value: string,
		expiry: Moment.Moment | Date | string = null,
		domain: string = null,
		path: string = null
	)
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
				let timeInSeconds = Time.timeStringToSeconds(expiry);
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
	}

	public static remove(key: string, domain: string = null, path: string = null)
	{
		let date = new Date(0);
		this.set(key, null, date, domain, path);
	}
}
