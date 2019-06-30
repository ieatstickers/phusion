
import {HttpRequest} from "./HttpRequest";
import {HttpResponse} from "./HttpResponse";
import * as Moment from "moment";
import {LocalStorage} from "../Storage/LocalStorage";
import {Time} from "../Time/Time";
import {Http} from "./Http";

export class HttpResponseCache
{
	public static getCachedResponseByRequest(httpRequest: HttpRequest)
	{
		let cachedResponseLocalStorageKey = Http.responseCachingOptions['localStorageKey'];

		// Get object from local storage that contains all cached response objects
		let cachedHttpResponses = LocalStorage.get(cachedResponseLocalStorageKey);

		// If a StorageItem entity is returned
		if (cachedHttpResponses)
		{
			// Build key e.g. get_http://api.example.com/user
			let targetKey = httpRequest.method + '_' + httpRequest.url;

			// Get object containing cached response objects from StorageItem entity
			let httpResponses = cachedHttpResponses.value;

			// Access target key
			let cachedHttpResponse = httpResponses[targetKey];

			if (!cachedHttpResponse)
			{
				return null;
			}

			// If cached response exists
			// Create HttpResponse entity
			let httpResponseEntity = new HttpResponse(
				httpRequest,
				cachedHttpResponse['statusCode'],
				cachedHttpResponse['statusText'],
				cachedHttpResponse['headers'],
				cachedHttpResponse['data'],
				true,
				Moment(cachedHttpResponse['cacheExpiry'])
			);

			// If it's expired, remove it
			if (httpResponseEntity.isExpired())
			{
				// Remove key
				delete httpResponses[targetKey];

				// Store in local storage
				LocalStorage.set(cachedResponseLocalStorageKey, httpResponses);
			}
			// Else return it
			else
			{
				return httpResponseEntity;
			}

		}

		return null;
	}

	public static cacheHttpResponseAsync(httpResponse: HttpResponse, cacheExpiry: Moment.Moment | Date | string)
	{
		let self = this;
		let cachedResponseLocalStorageKey = Http.responseCachingOptions['localStorageKey'];

		// Use set timeout to make the method async
		setTimeout(function()
		{
			// Get cached responses from local storage
			let cachedResponses = self.getResponseCache();

			// Build key e.g. get_http://api.example.com/user
			let httpRequest = httpResponse.httpRequest;
			let key = httpRequest.method + '_' + httpRequest.url;

			// Set cache expiry
			if (Moment.isMoment(cacheExpiry))
			{
				httpResponse.cacheExpiry = cacheExpiry;
			}
			else if (cacheExpiry instanceof Date)
			{
				httpResponse.cacheExpiry = Moment(cacheExpiry.valueOf());
			}
			else
			{
				let expiryTimeInSeconds = Time.timeStringToSeconds(cacheExpiry);
				let unixNow = Moment().valueOf();
				let unixExpiry = unixNow + (expiryTimeInSeconds * 1000); // Multiplied by 1000 to convert to milliseconds
				httpResponse.cacheExpiry = Moment(unixExpiry);
			}

			// Set httpResponse at that key
			cachedResponses[key] = httpResponse;

			// Save cached responses object in local storage
			LocalStorage.set(cachedResponseLocalStorageKey, cachedResponses);
		}, 0);

		return this;
	}

	public static clearExpiredResponsesFromCacheAsync()
	{
		let self = this;

		// Use set timeout to make the method async
		setTimeout(function()
		{
			// Get all cached responses from local storage
			let responseCache = self.getResponseCache();

			// For each response
			for (let key in responseCache) if (responseCache.hasOwnProperty(key))
			{
				let cachedResponseObject = responseCache[key];

				let httpResponseEntity = new HttpResponse(
					cachedResponseObject['httpRequest'],
					cachedResponseObject['statusCode'],
					cachedResponseObject['statusText'],
					cachedResponseObject['headers'],
					cachedResponseObject['data'],
					cachedResponseObject['fromCache'],
					Moment(cachedResponseObject['cacheExpiry'])
				);

				// If it's expired
				if (httpResponseEntity.isExpired())
				{
					// Remove it
					delete responseCache[key];
				}
			}

			LocalStorage.set(Http.responseCachingOptions['localStorageKey'], responseCache);

		}, 0);

		return this;
	}

	private static getResponseCache(): Object
	{
		let cachedResponseLocalStorageKey = Http.responseCachingOptions['localStorageKey'];

		let cachedHttpResponsesStorageItem = LocalStorage.get(cachedResponseLocalStorageKey);

		if (cachedHttpResponsesStorageItem)
		{
			return cachedHttpResponsesStorageItem.value;
		}

		return {};
	}
}
