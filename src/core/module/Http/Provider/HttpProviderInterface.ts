
import {PhusionAwareInterface} from "../../Phusion/PhusionAwareInterface";
import {HttpRequest} from "../Entity/HttpRequest";
import {HttpResponse} from "../Entity/HttpResponse";

export interface HttpProviderInterface extends PhusionAwareInterface
{
	makeHttpRequest(
		request: HttpRequest
	): Promise<HttpResponse>
}
