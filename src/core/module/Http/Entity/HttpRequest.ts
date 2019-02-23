
export class HttpRequest
{
	private url: string;
	private method: string;
	private headers: Object = {};
	private data: Object;

	public constructor(
		url: string,
		method: string,
		headers: Object,
		data: Object
	)
	{
		this.url = url;
		this.method = method;
		this.headers = headers;
		this.data = data;
	}

	public getUrl(): string
	{
		return this.url;
	}

	public getMethod(): string
	{
		return this.method;
	}

	public getHeaders(): Object
	{
		return this.headers;
	}

	public setHeader(name: string, value: string): this
	{
		this.headers[name] = value;

		return this;
	}

	public getData(): Object
	{
		return this.data;
	}

}
