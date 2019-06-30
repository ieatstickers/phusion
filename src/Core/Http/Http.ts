
import {HttpRequest} from "./HttpRequest";
import {HttpResponse} from "./HttpResponse";
import * as Moment from "moment";
import {HttpApi} from "./HttpApi";

export class Http
{
	public static responseCachingOptions: Object = { defaultCacheExpiry: "30s", localStorageKey: "phusion_http_response_cache" };

	public static get(url: string, data: Object = null, cacheExpiry: Moment.Moment | Date | string = null): Promise<HttpResponse>
	{
		let request = new HttpRequest(url, 'get', data);
		return HttpApi.makeHttpRequest(request, cacheExpiry);
	}

	public static post(url: string, data: Object, cacheExpiry: Moment.Moment | Date | string = null): Promise<HttpResponse>
	{
		let request = new HttpRequest(url, 'post', data);
		return HttpApi.makeHttpRequest(request, cacheExpiry);
	}

	public static put(url: string, data: Object, cacheExpiry: Moment.Moment | Date | string = null): Promise<HttpResponse>
	{
		let request = new HttpRequest(url, 'put', data);
		return HttpApi.makeHttpRequest(request, cacheExpiry);
	}

	public static delete(url: string, data: Object = null, cacheExpiry: Moment.Moment | Date | string = null): Promise<HttpResponse>
	{
		let request = new HttpRequest(url, 'delete', data);
		return HttpApi.makeHttpRequest(request, cacheExpiry);
	}

	public static makeRequest(
		method: string,
		url: string,
		data: Object = null,
		cacheExpiry: Moment.Moment | Date | string = null
	): Promise<HttpResponse>
	{
		let request = new HttpRequest(url, method, data);
		return HttpApi.makeHttpRequest(request, cacheExpiry);
	}

	public static onBeforeRequest(callbackFunction: Function)
	{
		HttpApi.onBeforeRequest(callbackFunction);
	}

	public static enableResponseCaching(responseCachingOptions: Object = null)
	{
		HttpApi.enableResponseCaching(responseCachingOptions);
	}
}
