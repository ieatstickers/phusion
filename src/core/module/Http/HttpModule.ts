
import {AbstractModule} from '../AbstractModule';
import {HttpModuleInterface} from './HttpModuleInterface';
import {HttpRequest} from "./Entity/HttpRequest";
import {HttpResponse} from "./Entity/HttpResponse";
import {HttpProviderInterface} from "./Provider/HttpProviderInterface";
import {AxiosHttpProvider} from "./Provider/Axios/AxiosHttpProvider";
import {HttpError} from "./Entity/HttpError";
import * as Moment from "moment";

declare let Promise: any;

export class HttpModule extends AbstractModule implements HttpModuleInterface
{
	private httpProvider: HttpProviderInterface;
	private defaultHttpProvider: HttpProviderInterface;
	private beforeRequestCallbacks: Array<Function> = [];

	public get(url: string, data: Object = null, cacheExpiry: Moment.Moment | Date | string = null): Promise<HttpResponse>
	{
		let request = this.createHttpRequest(url, 'get', data);
		return this.makeHttpRequest(request, cacheExpiry);
	}

	public post(url: string, data: Object, cacheExpiry: Moment.Moment | Date | string = null): Promise<HttpResponse>
	{
		let request = this.createHttpRequest(url, 'post', data);
		return this.makeHttpRequest(request, cacheExpiry);
	}

	public put(url: string, data: Object, cacheExpiry: Moment.Moment | Date | string = null): Promise<HttpResponse>
	{
		let request = this.createHttpRequest(url, 'put', data);
		return this.makeHttpRequest(request, cacheExpiry);
	}

	public delete(url: string, data: Object = null, cacheExpiry: Moment.Moment | Date | string = null): Promise<HttpResponse>
	{
		let request = this.createHttpRequest(url, 'delete', data);
		return this.makeHttpRequest(request, cacheExpiry);
	}

	public makeHttpRequest(
		httpRequest: HttpRequest,
		cacheExpiry: Moment.Moment  | Date | string = null
	): Promise<HttpResponse>
	{
		let cachedResponse = this.getCachedResponseByRequest(httpRequest);

		if (cachedResponse)
		{
			return new Promise(function (resolve: Function, reject: Function)
			{
				return resolve(cachedResponse);
			});
		}

		httpRequest = this.applyBeforeRequestHooks(httpRequest);

		return new Promise((function (resolve: Function, reject: Function)
		{
			// Make request through provider
			let promise = this.getProvider().makeHttpRequest(httpRequest);

			promise.then((function(httpRequest: HttpResponse)
			{
				let config = this.getPhusion().getConfig();

				let isResponseCachingEnabled = config.getByPath('phusion:module:http:responseCaching:enabled');

				if (isResponseCachingEnabled)
				{
					if (!cacheExpiry)
					{
						cacheExpiry = config
							.getByPath('phusion:module:http:responseCaching:defaultCacheExpiry');
					}

					this
						.getPhusion()
						.getHttpModule()
						.cacheHttpResponseAsync(httpRequest, cacheExpiry);

					this
						.getPhusion()
						.getHttpModule()
						.clearExpiredResponsesFromCacheAsync();
				}
				else
				{
					if (cacheExpiry)
					{
						console.warn('Cache expiry argument passed when making HTTP request. This cannot be used as response caching is not enabled. To enable, set phusion:module:http:responseCaching:defaultCacheExpiry to true.', httpRequest);
					}
				}

				return resolve(httpRequest);
			}).bind(this));

			promise.catch(function(httpError: HttpError)
			{
				return reject(httpError);
			});

		}).bind(this));
	}

	public setProvider(httpProvider: HttpProviderInterface): this
	{
		this.httpProvider = httpProvider.setPhusion(this.getPhusion());
		this.defaultHttpProvider = null;

		return this;
	}

	public createHttpError(
		code: number,
	  message: string
	): HttpError
	{
		return new HttpError(
			code,
			message
		)
	}

	public createHttpRequest(
		url: string,
	  method: string,
		data: Object = null
	): HttpRequest
	{
		return new HttpRequest(
			url,
			method,
			{},
			data
		)
	}

	public createHttpResponse(
		httpRequest: HttpRequest,
		statusCode: number,
	  statusText: string,
	  headers: Object,
	  data: Object,
	  fromCache: boolean,
	  cacheExpiry: Moment.Moment
	): HttpResponse
	{
		return new HttpResponse(
			httpRequest,
			statusCode,
			statusText,
			headers,
			data,
			fromCache,
			cacheExpiry
		)
	}

	public onBeforeRequest(callbackFunction: Function): this
	{
		this.beforeRequestCallbacks.push(callbackFunction);
		return this;
	}

	private getProvider(): HttpProviderInterface
	{
		if (this.httpProvider)
		{
			return this.httpProvider
		}

		if (!this.defaultHttpProvider)
		{
			this.defaultHttpProvider = (new AxiosHttpProvider()).setPhusion(this.getPhusion());
		}

		return this.defaultHttpProvider;
	}

	private getCachedResponseByRequest(httpRequest: HttpRequest)
	{
		let cachedResponseLocalStorageKey = this
			.getPhusion()
			.getConfig()
			.getByPath('phusion:module:http:responseCaching:localStorageKey');

		// Get local storage module
		let localStorage = this.getPhusion().getLocalStorageModule();

		// Get object from local storage that contains all cached response objects
		let cachedHttpResponses = localStorage.get(cachedResponseLocalStorageKey);

		// If a StorageItem entity is returned
		if (cachedHttpResponses)
		{
			// Build key e.g. get_http://api.example.com/user
			let targetKey = httpRequest.getMethod() + '_' + httpRequest.getUrl();

			// Get object containing cached response objects from StorageItem entity
			let httpResponses = cachedHttpResponses.getValue();

			// Access target key
			let cachedHttpResponse = httpResponses[targetKey];

			if (!cachedHttpResponse)
			{
				return null;
			}

			// If cached response exists
			// Create HttpResponse entity
			let httpResponseEntity = this.createHttpResponse(
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
				localStorage.set(cachedResponseLocalStorageKey, httpResponses);
			}
			// Else return it
			else
			{
				return httpResponseEntity;
			}

		}

		return null;
	}

	private cacheHttpResponseAsync(httpResponse: HttpResponse, cacheExpiry: Moment.Moment | Date | string): this
	{
		let self = this;

		// Use set timeout to make the method async
		setTimeout(function()
		{
			// Get cached responses from local storage
			let cachedResponses = self.getHttpResponseCache();

			// Build key e.g. get_http://api.example.com/user
			let httpRequest = httpResponse.getHttpRequest();
			let key = httpRequest.getMethod() + '_' + httpRequest.getUrl();

			// Set cache expiry
			if (Moment.isMoment(cacheExpiry))
			{
				httpResponse.setCacheExpiry(cacheExpiry);
			}
			else if (cacheExpiry instanceof Date)
			{
				let momentExpiry = Moment(cacheExpiry.valueOf());
				httpResponse.setCacheExpiry(momentExpiry);
			}
			else
			{
				let expiryTimeInSeconds = self.getTimeInSecondsFromTimeString(cacheExpiry);
				let unixNow = Moment().valueOf();
				let unixExpiry = unixNow + (expiryTimeInSeconds * 1000); // Multiplied by 1000 to convert to milliseconds
				let expiryMomentObject = Moment(unixExpiry);
				httpResponse.setCacheExpiry(expiryMomentObject);
			}

			// Set httpResponse at that key
			cachedResponses[key] = httpResponse;

			let localStorage = self.getPhusion().getLocalStorageModule();
			let cachedResponseLocalStorageKey = self
				.getPhusion()
				.getConfig()
				.getByPath('phusion:module:http:responseCaching:localStorageKey');

			// Save cached responses object in local storage
			localStorage.set(cachedResponseLocalStorageKey, cachedResponses);
		}, 0);

		return this;
	}

	private getHttpResponseCache(): Object
	{
		let cachedResponseLocalStorageKey = this
			.getPhusion()
			.getConfig()
			.getByPath('phusion:module:http:responseCaching:localStorageKey');

		let localStorage = this.getPhusion().getLocalStorageModule();

		let cachedHttpResponsesStorageItem = localStorage.get(cachedResponseLocalStorageKey);

		if (cachedHttpResponsesStorageItem)
		{
			return cachedHttpResponsesStorageItem.getValue();
		}

		return {};
	}

	private clearExpiredResponsesFromCacheAsync(): this
	{
		let self = this;

		// Use set timeout to make the method async
		setTimeout(function()
		{
			// Get all cached responses from local storage
			let responseCache = self.getHttpResponseCache();

			// For each response
			for (let key in responseCache) if (responseCache.hasOwnProperty(key))
			{
				let cachedResponseObject = responseCache[key];

				let httpResponseEntity = self.createHttpResponse(
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

			// Persist in local storage
			let localStorage = self.getPhusion().getLocalStorageModule();

			let localStorageKey = self
				.getPhusion()
				.getConfig()
				.getByPath('phusion:module:http:responseCaching:localStorageKey');

			localStorage.set(localStorageKey, responseCache);

		}, 0);

		return this;
	}

	private applyBeforeRequestHooks(httpRequest: HttpRequest): HttpRequest
	{
		let beforeRequestCallbacks = this.getBeforeRequestCallbacks();

		let phusion = this.getPhusion();

		// For each of the beforeRequest hooks
		for (let key in beforeRequestCallbacks)
		{
			// Get callback
			let callback = beforeRequestCallbacks[key];

			// Get the result
			let result = callback.bind({
				getPhusion: function() { return phusion; }
			}, httpRequest)();

			// If the result isn't an instance HttpRequest
			if (!(result instanceof HttpRequest))
			{
				console.error('onBeforeRequest hook must return an instance of HttpRequest - received ' + typeof result + '. Changes made to the request in this beforeRequest hook will not be applied: ', callback);
				continue;
			}

			httpRequest = result;
		}

		return httpRequest;
	}

	private getBeforeRequestCallbacks(): Array<Function>
	{
		return this.beforeRequestCallbacks;
	}

}
