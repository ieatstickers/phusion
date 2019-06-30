
import {HttpRequest} from "../HttpRequest";
import {HttpResponse} from "../HttpResponse";

export interface HttpProviderInterface
{
	makeHttpRequest(
		request: HttpRequest
	): Promise<HttpResponse>
}
