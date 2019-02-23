
import * as Moment from 'moment';
import {HttpRequest} from "./HttpRequest";

export class HttpResponse
{
	private httpRequest: HttpRequest;
	private statusCode: number;
	private statusText: string;
	private headers: Object = {};
	private data: Object = {};
	private fromCache: boolean;
	private cacheExpiry: Moment.Moment;

	public constructor(
		httpRequest: HttpRequest,
		statusCode: number,
	  statusText: string,
	  headers: Object,
	  data: Object,
	  fromCache: boolean,
	  cacheExpiry: Moment.Moment
	)
	{
		this.httpRequest = httpRequest;
		this.statusCode = statusCode;
		this.statusText = statusText;
		this.headers = headers;
		this.data = data;
		this.fromCache = fromCache;
		this.cacheExpiry = cacheExpiry;
	}

	public getHttpRequest(): HttpRequest
	{
		return this.httpRequest;
	}

	public getStatusCode(): number
	{
		return this.statusCode;
	}

	public getStatusText(): string
	{
		return this.statusText;
	}

	public getHeaders(): Object
	{
		return this.headers;
	}

	public getData(): Object
	{
		return this.data;
	}

	public isFromCache(): boolean
	{
		return this.fromCache;
	}

	public setFromCache(fromCache: boolean): this
	{
		this.fromCache = fromCache;

		return this;
	}

	public getCacheExpiry(): Moment.Moment
	{
		return this.cacheExpiry;
	}

	public setCacheExpiry(cacheExpiry: Moment.Moment): this
	{
		this.cacheExpiry = cacheExpiry;

		return this;
	}

	public isExpired(): boolean
	{
		if (!this.cacheExpiry)
		{
			return false;
		}

		let expiryUnix = this.cacheExpiry.valueOf();
		let nowUnix = (new Date()).valueOf();
		return (nowUnix > expiryUnix);
	}

}
