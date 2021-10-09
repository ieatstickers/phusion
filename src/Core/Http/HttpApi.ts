
import {HttpRequest} from "./HttpRequest";
import {HttpResponse} from "./HttpResponse";
import {HttpProviderInterface} from "./Provider/HttpProviderInterface";
import {AxiosHttpProvider} from "./Provider/Axios/AxiosHttpProvider";
import {HttpError} from "./HttpError";

declare let Promise: any;

export class HttpApi
{
	private static httpProvider: HttpProviderInterface;
	private static defaultHttpProvider: HttpProviderInterface;
	private static beforeRequestCallbacks: Array<Function> = [];
	private static onSuccessCallbacks: Array<Function> = [];

	public static makeHttpRequest(
		httpRequest: HttpRequest
	): Promise<HttpResponse>
	{
		let validMethods = [ 'get', 'post', 'put', 'delete', 'options' ];

		if (validMethods.indexOf(httpRequest.method.toLowerCase()) == -1)
		{
			throw new Error('Invalid HTTP method: ' + httpRequest.method);
		}

		httpRequest = this.applyBeforeRequestHooks(httpRequest);

		return new Promise((function (resolve: Function, reject: Function)
		{
			// Make request through provider
			let promise = this.getProvider().makeHttpRequest(httpRequest);

			promise.then((function(httpResponse: HttpResponse)
			{
				this.applyOnSuccessHooks(httpResponse);

				return resolve(httpResponse);
			}).bind(this));

			promise.catch(function(httpError: HttpError)
			{
				return reject(httpError);
			});

		}).bind(this));
	}

	public static onBeforeRequest(callbackFunction: Function)
	{
		this.beforeRequestCallbacks.push(callbackFunction);
	}

	public static onSuccess(callbackFunction: Function)
	{
		this.onSuccessCallbacks.push(callbackFunction);
	}

	public static setProvider(httpProvider: HttpProviderInterface)
	{
		this.httpProvider = httpProvider;
		this.defaultHttpProvider = null;
	}

	private static getProvider(): HttpProviderInterface
	{
		if (this.httpProvider)
		{
			return this.httpProvider
		}

		if (!this.defaultHttpProvider)
		{
			this.defaultHttpProvider = new AxiosHttpProvider();
		}

		return this.defaultHttpProvider;
	}

	private static applyBeforeRequestHooks(httpRequest: HttpRequest): HttpRequest
	{
		let beforeRequestCallbacks = this.beforeRequestCallbacks;

		// For each of the beforeRequest hooks
		for (let key in beforeRequestCallbacks)
			if (beforeRequestCallbacks.hasOwnProperty(key))
		{
			// Get callback
			let callback = beforeRequestCallbacks[key];

			// Get the result
			let result = callback.bind(null, httpRequest)();

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

	private static applyOnSuccessHooks(httpResponse: HttpResponse)
	{
		let onSuccessCallbacks = this.onSuccessCallbacks;

		// For each of the beforeRequest hooks
		for (let key in onSuccessCallbacks)
			if (onSuccessCallbacks.hasOwnProperty(key))
		{
			// Get callback
			let callback = onSuccessCallbacks[key];

			// Run callback
			callback.bind(null, httpResponse)();
		}

		return httpResponse;
	}

}
