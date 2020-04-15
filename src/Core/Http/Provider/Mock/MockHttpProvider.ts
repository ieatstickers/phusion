
import {HttpProviderInterface} from "../HttpProviderInterface";
import Moment from 'moment';
import {AbstractHttpProvider} from "../AbstractHttpProvider";
import {HttpResponse} from "../../HttpResponse";
import {HttpRequest} from "../../HttpRequest";

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
			let data = httpRequest.data;

			let url = httpRequest.url;

			// If GET or DELETE request
			if (
				(httpRequest.method == 'get' || httpRequest.method == 'get')
				&& data && Object.keys(data).length > 0
			)
			{
				let queryString = self.getQueryStringFromParams(data);

				// Append query string
				url+= queryString;
			}

			// Build Phusion HttpResponse object
			let phusionResponse = new HttpResponse(
				httpRequest,
				200,
				'OK',
				{},
				{
					url: url,
					method: httpRequest.method,
					headers: httpRequest.headers,
					data: httpRequest.data
				},
				false,
				null
			);

			return resolve(phusionResponse);
		})
	}
}
