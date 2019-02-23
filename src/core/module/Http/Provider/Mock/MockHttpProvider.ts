
import {HttpProviderInterface} from "../HttpProviderInterface";
import * as Moment from 'moment';
import {AbstractHttpProvider} from "../AbstractHttpProvider";
import {HttpResponse} from "../../Entity/HttpResponse";
import {HttpRequest} from "../../Entity/HttpRequest";

declare let Promise: any;

export class MockHttpProvider extends AbstractHttpProvider implements HttpProviderInterface
{

	public makeHttpRequest(
		httpRequest: HttpRequest,
		cacheExpiry: Moment.Moment | string = null
	): Promise<HttpResponse>
	{
		let self = this;

		return new Promise(function(resolve: Function, reject: Function)
		{
			let data = httpRequest.getData();

			let url = httpRequest.getUrl();

			// If GET or DELETE request
			if (
				(httpRequest.getMethod() == 'get' || httpRequest.getMethod() == 'get')
				&& data && Object.keys(data).length > 0
			)
			{
				let queryString = self.getQueryStringFromParams(data);

				// Append query string
				url+= queryString;
			}

			// Build Phusion HttpResponse object
			let phusionResponse = self.getPhusion().getHttpModule().createHttpResponse(
				httpRequest,
				200,
				'OK',
				{},
				{
					url: url,
					method: httpRequest.getMethod(),
					headers: httpRequest.getHeaders(),
					data: httpRequest.getData()
				},
				false,
				null
			);

			return resolve(phusionResponse);
		})
	}
}
