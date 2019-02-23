
import * as Moment from 'moment';
import {HttpProviderInterface} from "./Provider/HttpProviderInterface";
import {HttpError} from "./Entity/HttpError";
import {HttpRequest} from "./Entity/HttpRequest";
import {HttpResponse} from "./Entity/HttpResponse";

export interface HttpModuleInterface
{
	createHttpError(
		code: number,
		message: string
	): HttpError

	createHttpRequest(
		url: string,
		method: string,
		data?: Object
	): HttpRequest

	createHttpResponse(
		httpRequest: HttpRequest,
		statusCode: number,
		statusText: string,
		headers: Object,
		data: Object,
		fromCache: boolean,
		cacheExpiry: Moment.Moment
	): HttpResponse

	get(url:string, data?: Object, cacheExpiry?: Moment.Moment | string): Promise<HttpResponse>

	post(url:string, data: Object, cacheExpiry?: Moment.Moment | string): Promise<HttpResponse>

	put(url:string, data: Object, cacheExpiry?: Moment.Moment | string): Promise<HttpResponse>

	delete(url:string, data?: Object, cacheExpiry?: Moment.Moment | string): Promise<HttpResponse>

	makeHttpRequest(
		httpRequest: HttpRequest,
		cacheExpiry?: Moment.Moment | Date | string
	): Promise<HttpResponse>;

	setProvider(httpProvider: HttpProviderInterface): this;

	onBeforeRequest(callbackFunction: Function): this;
}
