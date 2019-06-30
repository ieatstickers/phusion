
export class HttpRequest
{
	public url: string;
	public method: string;
	public headers: Object = {};
	public data: Object;

	public constructor(
		url: string,
		method: string,
		data: Object = null,
		headers: Object = {}
	)
	{
		this.url = url;
		this.method = method;
		this.data = data;
		this.headers = headers;
	}
}
