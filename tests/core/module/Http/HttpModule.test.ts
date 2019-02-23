
import {Phusion} from "../../../../src/core/Phusion";
import {HttpRequest} from "../../../../src/core/module/Http/Entity/HttpRequest";
import {HttpResponse} from "../../../../src/core/module/Http/Entity/HttpResponse";
import {MockHttpProvider} from "../../../../src/core/module/Http/Provider/Mock/MockHttpProvider";
import {HttpError} from "../../../../src/core/module/Http/Entity/HttpError";
import * as Moment from 'moment';

declare let Promise: any;

/**
 * Http Module Tests
 */
describe('Http Module', () =>
{
	beforeEach(() =>
	{
		// Clear local storage so tests don't interfere with each other
		window.localStorage.clear();
	});

	test('createHttpRequest() creates and hydrates an Http Request correctly', () =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();

		let url = 'https://api.example.com/user';

		// GET Request (no params)
		let getRequestNoParams = httpModule.createHttpRequest(url, 'get');
		expect(getRequestNoParams).toBeInstanceOf(HttpRequest);
		expect(getRequestNoParams.getUrl()).toBe(url);
		expect(getRequestNoParams.getHeaders()).toBeInstanceOf(Object);
		expect(getRequestNoParams.getMethod()).toBe('get');
		expect(getRequestNoParams.getData()).toBeNull();

		// GET Request (with params)
		let getRequestData = { paramOneKey: "paramOneValue", paramTwoKey: "paramTwoValue" };
		let getRequest = httpModule.createHttpRequest(url, 'get', getRequestData);
		expect(getRequest).toBeInstanceOf(HttpRequest);
		expect(getRequest.getUrl()).toBe(url);
		expect(getRequest.getHeaders()).toBeInstanceOf(Object);
		expect(getRequest.getMethod()).toBe('get');
		expect(getRequest.getData()).toBe(getRequestData);
	});

	test('createHttpResponse() creates and hydrates an Http Response correctly', () =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();

		let url = 'https://api.example.com/user';

		// Request (no params)
		let getRequestNoParams = httpModule.createHttpRequest(url, 'get');

		// Response (no params)
		let responseNoParams = httpModule.createHttpResponse(
			getRequestNoParams,
			200,
			'OK',
			{},
			getRequestNoParams.getData(),
			false,
			null
		);

		expect(responseNoParams).toBeInstanceOf(HttpResponse);
		// Response status code
		let statusCode = responseNoParams.getStatusCode();
		expect(statusCode).toBe(200);

		// Response status text
		let statusText = responseNoParams.getStatusText();
		expect(statusText).toBe('OK');

		// Response isFromCache
		let isFromCache = responseNoParams.isFromCache();
		expect(isFromCache).toBe(false);

		// Response isExpired
		let isExpired = responseNoParams.isExpired();
		expect(isExpired).toBe(false);

		// Response headers
		let headers = responseNoParams.getHeaders();
		expect(headers).toBeInstanceOf(Object);

		// Response request
		let httpRequest = responseNoParams.getHttpRequest();
		expect(httpRequest.getMethod()).toBe('get');
		expect(httpRequest.getUrl()).toBe(url);
		expect(JSON.stringify(httpRequest.getHeaders())).toBe(JSON.stringify({}));
		expect(httpRequest.getData()).toBeNull();


		let requestParams = {
			testParamOne: 'Test param one value!',
			testParamTwo: 'Test param twp value!',
			testParamThree: 'Test param three value!'
		};

		// Request (no params)
		let getRequestParams = httpModule.createHttpRequest(url, 'get', requestParams);

		// Response (no params)
		let responseParams = httpModule.createHttpResponse(
			getRequestParams,
			200,
			'OK',
			{},
			getRequestParams.getData(),
			false,
			null
		);

		expect(responseParams).toBeInstanceOf(HttpResponse);
		// Response status code
		let paramsResponseStatusCode = responseParams.getStatusCode();
		expect(paramsResponseStatusCode).toBe(200);

		// Response status text
		let paramsResponseStatusText = responseParams.getStatusText();
		expect(paramsResponseStatusText).toBe('OK');

		// Response isFromCache
		let paramsResponseIsFromCache = responseParams.isFromCache();
		expect(paramsResponseIsFromCache).toBe(false);

		// Response isExpired
		let paramsResponseIsExpired = responseParams.isExpired();
		expect(paramsResponseIsExpired).toBe(false);

		// Response headers
		let paramsResponseHeaders = responseParams.getHeaders();
		expect(paramsResponseHeaders).toBeInstanceOf(Object);

		// Response request
		let paramsResponseHttpRequest = responseParams.getHttpRequest();
		expect(paramsResponseHttpRequest.getMethod()).toBe('get');
		expect(paramsResponseHttpRequest.getUrl()).toBe(url);
		expect(JSON.stringify(paramsResponseHttpRequest.getHeaders())).toBe(JSON.stringify({}));
		expect(JSON.stringify(paramsResponseHttpRequest.getData())).toBe(JSON.stringify(requestParams));
	});

	test('createHttpResponse() creates and hydrates an Http Error correctly', () =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();

		// Request (no params)
		let errorCode = 500;
		let errorMessage = 'Oops, something went wrong!';
		let error = httpModule.createHttpError(errorCode, errorMessage);

		expect(error).toBeInstanceOf(HttpError);
		expect(error.getStatusCode()).toBe(errorCode);
		expect(error.getMessage()).toBe(errorMessage);
	});

	test('get() returns a Promise', () =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// GET Request (no params)
		let promise = httpModule.get(url, requestParams);

		expect(promise).toBeInstanceOf(Promise);
	});

	test('Promise returned from get() resolves with a hydrated instance of HttpResponse', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// GET Request (no params)
		let promise = httpModule.get(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.getData();
			expect(responseData).toBeInstanceOf(Object);

			// Response status code
			let statusCode = httpResponse.getStatusCode();
			expect(typeof statusCode).toBe('number');

			// Response status text
			let statusText = httpResponse.getStatusText();
			expect(typeof statusText).toBe('string');

			// Response isFromCache
			let isFromCache = httpResponse.isFromCache();
			expect(typeof isFromCache).toBe('boolean');

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(typeof isExpired).toBe('boolean');

			// Response headers
			let headers = httpResponse.getHeaders();
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.getHttpRequest();
			expect(httpRequest).toBeInstanceOf(HttpRequest);

			done();
		})
	});

	test('When promise returned by get() resolves, HttpResponse contains correct values', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// GET Request (no params)
		let promise = httpModule.get(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.getData();
			expect(responseData).toBeInstanceOf(Object);

			let expectedUrl = url + '?testParamOne=' + encodeURIComponent(requestParams['testParamOne'])
				+ '&testParamTwo=' + encodeURIComponent(requestParams['testParamTwo'])
				+ '&testParamThree=' + encodeURIComponent(requestParams['testParamThree']);

			expect(JSON.stringify(responseData)).toBe(JSON.stringify({
				url: expectedUrl,
				method: 'get',
				headers: {},
				data: requestParams
			}));

			// Response status code
			let statusCode = httpResponse.getStatusCode();
			expect(statusCode).toBe(200);

			// Response status text
			let statusText = httpResponse.getStatusText();
			expect(statusText).toBe('OK');

			// Response isFromCache
			let isFromCache = httpResponse.isFromCache();
			expect(isFromCache).toBe(false);

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(isExpired).toBe(false);

			// Response headers
			let headers = httpResponse.getHeaders();
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.getHttpRequest();
			expect(httpRequest.getMethod()).toBe('get');
			expect(httpRequest.getUrl()).toBe(url);
			expect(JSON.stringify(httpRequest.getHeaders())).toBe(JSON.stringify({}));
			expect(httpRequest.getData()).toBe(requestParams);

			done();
		})
	});

	test('post() returns a Promise', () =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// POST Request
		let promise = httpModule.post(url, requestParams);

		expect(promise).toBeInstanceOf(Promise);
	});

	test('Promise returned from post() resolves with a hydrated instance of HttpResponse', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// POST Request
		let promise = httpModule.post(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.getData();
			expect(responseData).toBeInstanceOf(Object);

			// Response status code
			let statusCode = httpResponse.getStatusCode();
			expect(typeof statusCode).toBe('number');

			// Response status text
			let statusText = httpResponse.getStatusText();
			expect(typeof statusText).toBe('string');

			// Response isFromCache
			let isFromCache = httpResponse.isFromCache();
			expect(typeof isFromCache).toBe('boolean');

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(typeof isExpired).toBe('boolean');

			// Response headers
			let headers = httpResponse.getHeaders();
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.getHttpRequest();
			expect(httpRequest).toBeInstanceOf(HttpRequest);

			done();
		})
	});

	test('When promise returned by post() resolves, HttpResponse contains correct values', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// POST Request
		let promise = httpModule.post(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.getData();
			expect(responseData).toBeInstanceOf(Object);

			expect(JSON.stringify(responseData)).toBe(JSON.stringify({
				url: url,
				method: 'post',
				headers: {},
				data: requestParams
			}));

			// Response status code
			let statusCode = httpResponse.getStatusCode();
			expect(statusCode).toBe(200);

			// Response status text
			let statusText = httpResponse.getStatusText();
			expect(statusText).toBe('OK');

			// Response isFromCache
			let isFromCache = httpResponse.isFromCache();
			expect(isFromCache).toBe(false);

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(isExpired).toBe(false);

			// Response headers
			let headers = httpResponse.getHeaders();
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.getHttpRequest();
			expect(httpRequest.getMethod()).toBe('post');
			expect(httpRequest.getUrl()).toBe(url);
			expect(JSON.stringify(httpRequest.getHeaders())).toBe(JSON.stringify({}));
			expect(httpRequest.getData()).toBe(requestParams);

			done();
		})
	});

	test('put() returns a Promise', () =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = httpModule.put(url, requestParams);

		expect(promise).toBeInstanceOf(Promise);
	});

	test('Promise returned from put() resolves with a hydrated instance of HttpResponse', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = httpModule.put(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.getData();
			expect(responseData).toBeInstanceOf(Object);

			// Response status code
			let statusCode = httpResponse.getStatusCode();
			expect(typeof statusCode).toBe('number');

			// Response status text
			let statusText = httpResponse.getStatusText();
			expect(typeof statusText).toBe('string');

			// Response isFromCache
			let isFromCache = httpResponse.isFromCache();
			expect(typeof isFromCache).toBe('boolean');

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(typeof isExpired).toBe('boolean');

			// Response headers
			let headers = httpResponse.getHeaders();
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.getHttpRequest();
			expect(httpRequest).toBeInstanceOf(HttpRequest);

			done();
		})
	});

	test('When promise returned by put() resolves, HttpResponse contains correct values', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = httpModule.put(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.getData();
			expect(responseData).toBeInstanceOf(Object);

			expect(JSON.stringify(responseData)).toBe(JSON.stringify({
				url: url,
				method: 'put',
				headers: {},
				data: requestParams
			}));

			// Response status code
			let statusCode = httpResponse.getStatusCode();
			expect(statusCode).toBe(200);

			// Response status text
			let statusText = httpResponse.getStatusText();
			expect(statusText).toBe('OK');

			// Response isFromCache
			let isFromCache = httpResponse.isFromCache();
			expect(isFromCache).toBe(false);

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(isExpired).toBe(false);

			// Response headers
			let headers = httpResponse.getHeaders();
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.getHttpRequest();
			expect(httpRequest.getMethod()).toBe('put');
			expect(httpRequest.getUrl()).toBe(url);
			expect(JSON.stringify(httpRequest.getHeaders())).toBe(JSON.stringify({}));
			expect(httpRequest.getData()).toBe(requestParams);

			done();
		})
	});

	test('delete() returns a Promise', () =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = httpModule.delete(url, requestParams);

		expect(promise).toBeInstanceOf(Promise);
	});

	test('Promise returned from delete() resolves with a hydrated instance of HttpResponse', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = httpModule.delete(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.getData();
			expect(responseData).toBeInstanceOf(Object);

			// Response status code
			let statusCode = httpResponse.getStatusCode();
			expect(typeof statusCode).toBe('number');

			// Response status text
			let statusText = httpResponse.getStatusText();
			expect(typeof statusText).toBe('string');

			// Response isFromCache
			let isFromCache = httpResponse.isFromCache();
			expect(typeof isFromCache).toBe('boolean');

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(typeof isExpired).toBe('boolean');

			// Response headers
			let headers = httpResponse.getHeaders();
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.getHttpRequest();
			expect(httpRequest).toBeInstanceOf(HttpRequest);

			done();
		})
	});

	test('When promise returned by delete() resolves, HttpResponse contains correct values', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = httpModule.delete(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.getData();
			expect(responseData).toBeInstanceOf(Object);

			expect(JSON.stringify(responseData)).toBe(JSON.stringify({
				url: url,
				method: 'delete',
				headers: {},
				data: requestParams
			}));

			// Response status code
			let statusCode = httpResponse.getStatusCode();
			expect(statusCode).toBe(200);

			// Response status text
			let statusText = httpResponse.getStatusText();
			expect(statusText).toBe('OK');

			// Response isFromCache
			let isFromCache = httpResponse.isFromCache();
			expect(isFromCache).toBe(false);

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(isExpired).toBe(false);

			// Response headers
			let headers = httpResponse.getHeaders();
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.getHttpRequest();
			expect(httpRequest.getMethod()).toBe('delete');
			expect(httpRequest.getUrl()).toBe(url);
			expect(JSON.stringify(httpRequest.getHeaders())).toBe(JSON.stringify({}));
			expect(httpRequest.getData()).toBe(requestParams);

			done();
		})
	});

	test('makeHttpRequest() returns a Promise', () =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		let request = httpModule.createHttpRequest(url, 'post', requestParams);
		let promise = httpModule.makeHttpRequest(request);

		expect(promise).toBeInstanceOf(Promise);
	});

	test('Promise returned from makeHttpRequest() resolves with a hydrated instance of HttpResponse', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let request = httpModule.createHttpRequest(url, 'put', requestParams);
		let promise = httpModule.makeHttpRequest(request);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.getData();
			expect(responseData).toBeInstanceOf(Object);

			// Response status code
			let statusCode = httpResponse.getStatusCode();
			expect(typeof statusCode).toBe('number');

			// Response status text
			let statusText = httpResponse.getStatusText();
			expect(typeof statusText).toBe('string');

			// Response isFromCache
			let isFromCache = httpResponse.isFromCache();
			expect(typeof isFromCache).toBe('boolean');

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(typeof isExpired).toBe('boolean');

			// Response headers
			let headers = httpResponse.getHeaders();
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.getHttpRequest();
			expect(httpRequest).toBeInstanceOf(HttpRequest);

			done();
		})
	});

	test('When promise returned by makeHttpRequest() resolves, HttpResponse contains correct values', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		let request = httpModule.createHttpRequest(url, 'delete', requestParams);
		let promise = httpModule.makeHttpRequest(request);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.getData();
			expect(responseData).toBeInstanceOf(Object);

			expect(JSON.stringify(responseData)).toBe(JSON.stringify({
				url: url,
				method: 'delete',
				headers: {},
				data: requestParams
			}));

			// Response status code
			let statusCode = httpResponse.getStatusCode();
			expect(statusCode).toBe(200);

			// Response status text
			let statusText = httpResponse.getStatusText();
			expect(statusText).toBe('OK');

			// Response isFromCache
			let isFromCache = httpResponse.isFromCache();
			expect(isFromCache).toBe(false);

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(isExpired).toBe(false);

			// Response headers
			let headers = httpResponse.getHeaders();
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.getHttpRequest();
			expect(httpRequest.getMethod()).toBe('delete');
			expect(httpRequest.getUrl()).toBe(url);
			expect(JSON.stringify(httpRequest.getHeaders())).toBe(JSON.stringify({}));
			expect(httpRequest.getData()).toBe(requestParams);

			done();
		})
	});

	test('Changes to the request object in onBeforeRequest() callback are applied', (done: Function) =>
	{
		let phusion = new Phusion();
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		let headerName = 'My-Custom-Header';
		let headerValue = 'Custom header value';
		let header2Name = 'My-Second-Custom-Header';
		let header2Value = 'Second custom header value';

		httpModule.onBeforeRequest((httpRequest: HttpRequest) =>
		{
			return httpRequest.setHeader(headerName, headerValue);
		});

		httpModule.onBeforeRequest((httpRequest: HttpRequest) =>
		{
			return httpRequest.setHeader(header2Name, header2Value);
		});

		let request = httpModule.createHttpRequest(url, 'post', requestParams);
		let promise = httpModule.makeHttpRequest(request);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.getHttpRequest().getHeaders()[headerName]).toBe(headerValue);
			expect(httpResponse.getHttpRequest().getHeaders()[header2Name]).toBe(header2Value);
			done();
		})
	});

	test('Unexpired cached responses are returned', (done: Function) =>
	{
		// Enable response caching
		let applicationConfig = {
			phusion: {
				module: {
					http: {
						responseCaching: {
							enabled: true,
							defaultCacheExpiry: "60s",
						}
					}
				}
			}
		};

		let phusion = new Phusion(applicationConfig);
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let request = httpModule.createHttpRequest(url, 'get');
		let promise = httpModule.makeHttpRequest(request);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.isFromCache()).toBe(false);

			// setTimeout added because requests are cached async to reduce response times
			setTimeout(() =>
			{
				let promise = httpModule.makeHttpRequest(request);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.isFromCache()).toBe(true);

					done();
				})

			}, 1);

		})
	});

	test('Cached responses maintain correct data values', (done: Function) =>
	{
		// Enable response caching
		let applicationConfig = {
			phusion: {
				module: {
					http: {
						responseCaching: {
							enabled: true,
							defaultCacheExpiry: "60s",
						}
					}
				}
			}
		};

		let phusion = new Phusion(applicationConfig);
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let request = httpModule.createHttpRequest(url, 'get');
		let promise = httpModule.makeHttpRequest(request);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.isFromCache()).toBe(false);

			// setTimeout added because requests are cached async to reduce response times
			setTimeout(() =>
			{
				let promise = httpModule.makeHttpRequest(request);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.isFromCache()).toBe(true);

					expect(secondHttpResponse.getStatusCode()).toBe(httpResponse.getStatusCode());
					expect(secondHttpResponse.getStatusText()).toBe(httpResponse.getStatusText());
					expect(secondHttpResponse.getCacheExpiry().valueOf()).toBe(httpResponse.getCacheExpiry().valueOf());
					expect(secondHttpResponse.getHttpRequest()).toBe(httpResponse.getHttpRequest());
					expect(JSON.stringify(secondHttpResponse.getData())).toBe(JSON.stringify(httpResponse.getData()));
					expect(JSON.stringify(secondHttpResponse.getHeaders())).toBe(JSON.stringify(httpResponse.getHeaders()));

					done();
				})

			}, 1);

		})
	});

	test('Responses do not return from cache after expiry', (done: Function) =>
	{
		// Enable response caching
		let applicationConfig = {
			phusion: {
				module: {
					http: {
						responseCaching: {
							enabled: true,
							defaultCacheExpiry: "3s",
						}
					}
				}
			}
		};

		let phusion = new Phusion(applicationConfig);
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let request = httpModule.createHttpRequest(url, 'get');
		let promise = httpModule.makeHttpRequest(request);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.isFromCache()).toBe(false);

			// Time for cache to expire
			setTimeout(() =>
			{
				let promise = httpModule.makeHttpRequest(request);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.isFromCache()).toBe(false);

					done();
				})

			}, 4000);

		})
	});

	test('Responses cache expiry can be overridden per request (expiry set with Moment)', (done: Function) =>
	{
		// Enable response caching
		let applicationConfig = {
			phusion: {
				module: {
					http: {
						responseCaching: {
							enabled: true,
							defaultCacheExpiry: "3s",
						}
					}
				}
			}
		};

		let phusion = new Phusion(applicationConfig);
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let request = httpModule.createHttpRequest(url, 'get');

		let expiry = Moment();
		expiry.minutes(expiry.minutes() + 1);

		let promise = httpModule.makeHttpRequest(request, expiry);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.isFromCache()).toBe(false);

			// Time for default cache to expire (should have picked up our override)
			setTimeout(() =>
			{
				let promise = httpModule.makeHttpRequest(request);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.isFromCache()).toBe(true);

					done();
				})

			}, 4000);

		})
	});

	test('Responses cache expiry can be overridden per request (expiry set with Date)', (done: Function) =>
	{
		// Enable response caching
		let applicationConfig = {
			phusion: {
				module: {
					http: {
						responseCaching: {
							enabled: true,
							defaultCacheExpiry: "3s",
						}
					}
				}
			}
		};

		let phusion = new Phusion(applicationConfig);
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let request = httpModule.createHttpRequest(url, 'get');

		let expiryDate = new Date();
		expiryDate.setMinutes(expiryDate.getMinutes() + 1);
		let promise = httpModule.makeHttpRequest(request, expiryDate);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.isFromCache()).toBe(false);

			// Time for default cache to expire (should have picked up our override)
			setTimeout(() =>
			{
				let promise = httpModule.makeHttpRequest(request);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.isFromCache()).toBe(true);

					done();
				})

			}, 4000);

		})
	});

	test('Responses cache expiry can be overridden per request (expiry set with time string)', (done: Function) =>
	{
		// Enable response caching
		let applicationConfig = {
			phusion: {
				module: {
					http: {
						responseCaching: {
							enabled: true,
							defaultCacheExpiry: "3s",
						}
					}
				}
			}
		};

		let phusion = new Phusion(applicationConfig);
		let httpModule = phusion.getHttpModule();
		httpModule.setProvider(new MockHttpProvider());

		let url = 'https://api.example.com/user';

		let request = httpModule.createHttpRequest(url, 'get');
		let promise = httpModule.makeHttpRequest(request, '60s');

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.isFromCache()).toBe(false);

			// Time for default cache to expire (should have picked up our override)
			setTimeout(() =>
			{
				let promise = httpModule.makeHttpRequest(request);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.isFromCache()).toBe(true);

					done();
				})

			}, 4000);

		})
	});
});

