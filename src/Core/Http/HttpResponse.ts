
import * as Moment from 'moment';
import {HttpRequest} from "./HttpRequest";

export class HttpResponse
{
	public httpRequest: HttpRequest;
	public statusCode: number;
	public statusText: string;
	public headers: Object = {};
	public data: Object;
	public fromCache: boolean;
	public cacheExpiry: Moment.Moment;

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
