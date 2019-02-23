
export class HttpError
{
	private statusCode: number;
	private message: string;

	public constructor(
		statusCode: number,
	  message: string
	)
	{
		this.statusCode = statusCode;
		this.message = message;
	}

	public getStatusCode(): number
	{
		return this.statusCode;
	}

	public getMessage(): string
	{
		return this.message;
	}

}
