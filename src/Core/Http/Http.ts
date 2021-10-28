
import {HttpRequest} from "./HttpRequest";
import {HttpResponse} from "./HttpResponse";
import {HttpApi} from "./HttpApi";

export class Http
{
	public static get(url: string, data: Object = null): Promise<HttpResponse>
	{
		let request = new HttpRequest(url, 'get', data);
		return HttpApi.makeHttpRequest(request);
	}

	public static post(url: string, data: Object): Promise<HttpResponse>
	{
		let request = new HttpRequest(url, 'post', data);
		return HttpApi.makeHttpRequest(request);
	}

	public static put(url: string, data: Object): Promise<HttpResponse>
	{
		let request = new HttpRequest(url, 'put', data);
		return HttpApi.makeHttpRequest(request);
	}

	public static delete(url: string, data: Object = null): Promise<HttpResponse>
	{
		let request = new HttpRequest(url, 'delete', data);
		return HttpApi.makeHttpRequest(request);
	}

	public static makeRequest(
		method: string,
		url: string,
		data: Object = null
	): Promise<HttpResponse>
	{
		let request = new HttpRequest(url, method, data);
		return HttpApi.makeHttpRequest(request);
	}

	public static onBeforeRequest(callbackFunction: Function)
	{
		HttpApi.onBeforeRequest(callbackFunction);
	}

	public static onSuccess(callbackFunction: Function)
	{
		HttpApi.onSuccess(callbackFunction);
	}
}
