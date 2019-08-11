
import {HttpProviderInterface} from "../HttpProviderInterface";
import {AbstractHttpProvider} from "../AbstractHttpProvider";
import {HttpRequest} from "../../HttpRequest";
import {HttpResponse} from "../../HttpResponse";
import {HttpError} from "../../HttpError";

declare let Promise: any;

export class AxiosHttpProvider extends AbstractHttpProvider implements HttpProviderInterface
{
	private axios: any;

	public makeHttpRequest(
		httpRequest: HttpRequest
	): Promise<HttpResponse>
	{
		let self = this;

		return new Promise(function(resolve: Function, reject: Function)
		{
			// Make request with axios, call resolve/reject functions from axios callback functions
			let axios = self.getAxios();

			let data = httpRequest.data;

			let params = new URLSearchParams();

			for (let key in data)
			{
				params.append(key, data[key]);
			}

			let url = httpRequest.url;

			// If GET or DELETE request
			if (
				(httpRequest.method.toLowerCase() == 'get' || httpRequest.method.toLowerCase() == 'delete')
				&& data && Object.keys(data).length > 0
			)
			{
				let queryString = self.getQueryStringFromParams(data);

				// Append query string
				url+= queryString;
			}

			let promise = axios({
				url: url,
				method: httpRequest.method,
				headers: httpRequest.headers,
				data: params
			});

			// If promise is resolved
			promise.then(function(axiosResponse)
			{
				// Build Phusion HttpResponse object
				let phusionResponse = new HttpResponse(
					httpRequest,
					axiosResponse['status'],
					axiosResponse['statusText'],
					axiosResponse['headers'],
					axiosResponse['data'],
					false,
					null
				);

				// Call resolve function and inject Phusion response object
				return resolve(phusionResponse);
			});

			// If promise is rejected
			promise.catch(function(axiosResponse)
			{
				// Build Phusion HttpError object
				let phusionResponse = new HttpError(
					axiosResponse['code'],
					axiosResponse['message']
				);

				// Call reject function and inject Phusion response object
				return reject(phusionResponse);
			});
		})
	}

	private getAxios(): any
	{
		if (!this.axios)
		{
			let axios = require('axios');

			this.axios = axios.create({
				timeout: 20000,
				validateStatus: function (status) {
					// Resolves the promise regardless of the status code
					return true;
				},
			});
		}

		return this.axios;
	}
}
