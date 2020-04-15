
import {HttpRequest} from "../../../src/Core/Http/HttpRequest";
import {HttpResponse} from "../../../src/Core/Http/HttpResponse";
import {MockHttpProvider} from "../../../src/Core/Http/Provider/Mock/MockHttpProvider";
import Moment from 'moment';
import {Http} from "../../../src/Core/Http/Http";
import {HttpApi} from "../../../src/Core/Http/HttpApi";

declare let Promise: any;

/**
 * Http Tests
 */
describe('Core/Http', () =>
{
	beforeEach(() =>
	{
		HttpApi.setProvider(new MockHttpProvider());
		// Clear local storage so tests don't interfere with each other
		window.localStorage.clear();
	});


	test('get() returns a Promise', () =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// GET Request (no params)
		let promise = Http.get(url, requestParams);

		expect(promise).toBeInstanceOf(Promise);
	});

	test('Promise returned from get() resolves with a hydrated instance of HttpResponse', (done: Function) =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// GET Request (no params)
		let promise = Http.get(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.data;
			expect(responseData).toBeInstanceOf(Object);

			// Response status code
			let statusCode = httpResponse.statusCode;
			expect(typeof statusCode).toBe('number');

			// Response status text
			let statusText = httpResponse.statusText;
			expect(typeof statusText).toBe('string');

			// Response isFromCache
			let isFromCache = httpResponse.fromCache;
			expect(typeof isFromCache).toBe('boolean');

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(typeof isExpired).toBe('boolean');

			// Response headers
			let headers = httpResponse.headers;
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.httpRequest;
			expect(httpRequest).toBeInstanceOf(HttpRequest);

			done();
		})
	});

	test('When promise returned by get() resolves, HttpResponse contains correct values', (done: Function) =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// GET Request (no params)
		let promise = Http.get(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.data;
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
			let statusCode = httpResponse.statusCode;
			expect(statusCode).toBe(200);

			// Response status text
			let statusText = httpResponse.statusText;
			expect(statusText).toBe('OK');

			// Response isFromCache
			let isFromCache = httpResponse.fromCache;
			expect(isFromCache).toBe(false);

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(isExpired).toBe(false);

			// Response headers
			let headers = httpResponse.headers;
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.httpRequest;
			expect(httpRequest.method).toBe('get');
			expect(httpRequest.url).toBe(url);
			expect(JSON.stringify(httpRequest.headers)).toBe(JSON.stringify({}));
			expect(httpRequest.data).toBe(requestParams);

			done();
		})
	});

	test('post() returns a Promise', () =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// POST Request
		let promise = Http.post(url, requestParams);

		expect(promise).toBeInstanceOf(Promise);
	});

	test('Promise returned from post() resolves with a hydrated instance of HttpResponse', (done: Function) =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// POST Request
		let promise = Http.post(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.data;
			expect(responseData).toBeInstanceOf(Object);

			// Response status code
			let statusCode = httpResponse.statusCode;
			expect(typeof statusCode).toBe('number');

			// Response status text
			let statusText = httpResponse.statusText;
			expect(typeof statusText).toBe('string');

			// Response isFromCache
			let isFromCache = httpResponse.fromCache;
			expect(typeof isFromCache).toBe('boolean');

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(typeof isExpired).toBe('boolean');

			// Response headers
			let headers = httpResponse.headers;
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.httpRequest;
			expect(httpRequest).toBeInstanceOf(HttpRequest);

			done();
		})
	});

	test('When promise returned by post() resolves, HttpResponse contains correct values', (done: Function) =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// POST Request
		let promise = Http.post(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.data;
			expect(responseData).toBeInstanceOf(Object);

			expect(JSON.stringify(responseData)).toBe(JSON.stringify({
				url: url,
				method: 'post',
				headers: {},
				data: requestParams
			}));

			// Response status code
			let statusCode = httpResponse.statusCode;
			expect(statusCode).toBe(200);

			// Response status text
			let statusText = httpResponse.statusText;
			expect(statusText).toBe('OK');

			// Response isFromCache
			let isFromCache = httpResponse.fromCache;
			expect(isFromCache).toBe(false);

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(isExpired).toBe(false);

			// Response headers
			let headers = httpResponse.headers;
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.httpRequest;
			expect(httpRequest.method).toBe('post');
			expect(httpRequest.url).toBe(url);
			expect(JSON.stringify(httpRequest.headers)).toBe(JSON.stringify({}));
			expect(httpRequest.data).toBe(requestParams);

			done();
		})
	});

	test('put() returns a Promise', () =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = Http.put(url, requestParams);

		expect(promise).toBeInstanceOf(Promise);
	});

	test('Promise returned from put() resolves with a hydrated instance of HttpResponse', (done: Function) =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = Http.put(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.data;
			expect(responseData).toBeInstanceOf(Object);

			// Response status code
			let statusCode = httpResponse.statusCode;
			expect(typeof statusCode).toBe('number');

			// Response status text
			let statusText = httpResponse.statusText;
			expect(typeof statusText).toBe('string');

			// Response isFromCache
			let isFromCache = httpResponse.fromCache;
			expect(typeof isFromCache).toBe('boolean');

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(typeof isExpired).toBe('boolean');

			// Response headers
			let headers = httpResponse.headers;
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.httpRequest;
			expect(httpRequest).toBeInstanceOf(HttpRequest);

			done();
		})
	});

	test('When promise returned by put() resolves, HttpResponse contains correct values', (done: Function) =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = Http.put(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.data;
			expect(responseData).toBeInstanceOf(Object);

			expect(JSON.stringify(responseData)).toBe(JSON.stringify({
				url: url,
				method: 'put',
				headers: {},
				data: requestParams
			}));

			// Response status code
			let statusCode = httpResponse.statusCode;
			expect(statusCode).toBe(200);

			// Response status text
			let statusText = httpResponse.statusText;
			expect(statusText).toBe('OK');

			// Response isFromCache
			let isFromCache = httpResponse.fromCache;
			expect(isFromCache).toBe(false);

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(isExpired).toBe(false);

			// Response headers
			let headers = httpResponse.headers;
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.httpRequest;
			expect(httpRequest.method).toBe('put');
			expect(httpRequest.url).toBe(url);
			expect(JSON.stringify(httpRequest.headers)).toBe(JSON.stringify({}));
			expect(httpRequest.data).toBe(requestParams);

			done();
		})
	});

	test('delete() returns a Promise', () =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = Http.delete(url, requestParams);

		expect(promise).toBeInstanceOf(Promise);
	});

	test('Promise returned from delete() resolves with a hydrated instance of HttpResponse', (done: Function) =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = Http.delete(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.data;
			expect(responseData).toBeInstanceOf(Object);

			// Response status code
			let statusCode = httpResponse.statusCode;
			expect(typeof statusCode).toBe('number');

			// Response status text
			let statusText = httpResponse.statusText;
			expect(typeof statusText).toBe('string');

			// Response isFromCache
			let isFromCache = httpResponse.fromCache;
			expect(typeof isFromCache).toBe('boolean');

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(typeof isExpired).toBe('boolean');

			// Response headers
			let headers = httpResponse.headers;
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.httpRequest;
			expect(httpRequest).toBeInstanceOf(HttpRequest);

			done();
		})
	});

	test('When promise returned by delete() resolves, HttpResponse contains correct values', (done: Function) =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = Http.delete(url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.data;
			expect(responseData).toBeInstanceOf(Object);

			expect(JSON.stringify(responseData)).toBe(JSON.stringify({
				url: url,
				method: 'delete',
				headers: {},
				data: requestParams
			}));

			// Response status code
			let statusCode = httpResponse.statusCode;
			expect(statusCode).toBe(200);

			// Response status text
			let statusText = httpResponse.statusText;
			expect(statusText).toBe('OK');

			// Response isFromCache
			let isFromCache = httpResponse.fromCache;
			expect(isFromCache).toBe(false);

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(isExpired).toBe(false);

			// Response headers
			let headers = httpResponse.headers;
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.httpRequest;
			expect(httpRequest.method).toBe('delete');
			expect(httpRequest.url).toBe(url);
			expect(JSON.stringify(httpRequest.headers)).toBe(JSON.stringify({}));
			expect(httpRequest.data).toBe(requestParams);

			done();
		})
	});

	test('makesRequest() returns a Promise', () =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		let promise = Http.makeRequest('post', url, requestParams);

		expect(promise).toBeInstanceOf(Promise);
	});

	test('Promise returned from makeRequest() resolves with a hydrated instance of HttpResponse', (done: Function) =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		// PUT Request
		let promise = Http.makeRequest('put', url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.data;
			expect(responseData).toBeInstanceOf(Object);

			// Response status code
			let statusCode = httpResponse.statusCode;
			expect(typeof statusCode).toBe('number');

			// Response status text
			let statusText = httpResponse.statusText;
			expect(typeof statusText).toBe('string');

			// Response isFromCache
			let isFromCache = httpResponse.fromCache;
			expect(typeof isFromCache).toBe('boolean');

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(typeof isExpired).toBe('boolean');

			// Response headers
			let headers = httpResponse.headers;
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.httpRequest;
			expect(httpRequest).toBeInstanceOf(HttpRequest);

			done();
		})
	});

	test('When promise returned by makeRequest() resolves, HttpResponse contains correct values', (done: Function) =>
	{
		let url = 'https://api.example.com/user';

		let requestParams = {
			testParamOne: 'Test param one value',
			testParamTwo: 'Test param two value',
			testParamThree: 'Test param three value'
		};

		let promise = Http.makeRequest('delete', url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse).toBeInstanceOf(HttpResponse);

			// Response Data
			let responseData = httpResponse.data;
			expect(responseData).toBeInstanceOf(Object);

			expect(JSON.stringify(responseData)).toBe(JSON.stringify({
				url: url,
				method: 'delete',
				headers: {},
				data: requestParams
			}));

			// Response status code
			let statusCode = httpResponse.statusCode;
			expect(statusCode).toBe(200);

			// Response status text
			let statusText = httpResponse.statusText;
			expect(statusText).toBe('OK');

			// Response isFromCache
			let isFromCache = httpResponse.fromCache;
			expect(isFromCache).toBe(false);

			// Response isExpired
			let isExpired = httpResponse.isExpired();
			expect(isExpired).toBe(false);

			// Response headers
			let headers = httpResponse.headers;
			expect(headers).toBeInstanceOf(Object);

			// Response request
			let httpRequest = httpResponse.httpRequest;
			expect(httpRequest.method).toBe('delete');
			expect(httpRequest.url).toBe(url);
			expect(JSON.stringify(httpRequest.headers)).toBe(JSON.stringify({}));
			expect(httpRequest.data).toBe(requestParams);

			done();
		})
	});

	test('Changes to the request object in onBeforeRequest() callback are applied', (done: Function) =>
	{
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

		Http.onBeforeRequest((httpRequest: HttpRequest) =>
		{
			httpRequest.headers[headerName] = headerValue;
			return httpRequest;
		});

		Http.onBeforeRequest((httpRequest: HttpRequest) =>
		{
			httpRequest.headers[header2Name] =  header2Value;
			return httpRequest;
		});

		let promise = Http.makeRequest('post', url, requestParams);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.httpRequest.headers[headerName]).toBe(headerValue);
			expect(httpResponse.httpRequest.headers[header2Name]).toBe(header2Value);
			done();
		})
	});

	test('Unexpired cached responses are returned', (done: Function) =>
	{
		// Enable response caching
		Http.enableResponseCaching({ defaultCacheExpiry: "60s" });

		let url = 'https://api.example.com/user';

		let promise = Http.makeRequest('get', url);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.fromCache).toBe(false);

			// setTimeout added because requests are cached async to reduce response times
			setTimeout(() =>
			{
				let promise = Http.makeRequest('get', url);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.fromCache).toBe(true);

					done();
				})

			}, 1);

		})
	});

	test('Cached responses maintain correct data values', (done: Function) =>
	{
		// Enable response caching
		Http.enableResponseCaching({ defaultCacheExpiry: "60s" });

		let url = 'https://api.example.com/user';

		let promise = Http.makeRequest('get', url);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.fromCache).toBe(false);

			// setTimeout added because requests are cached async to reduce response times
			setTimeout(() =>
			{
				let promise = Http.makeRequest('get', url);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.fromCache).toBe(true);

					expect(secondHttpResponse.statusCode).toBe(httpResponse.statusCode);
					expect(secondHttpResponse.statusText).toBe(httpResponse.statusText);
					expect(secondHttpResponse.cacheExpiry.valueOf()).toBe(httpResponse.cacheExpiry.valueOf());
					expect(secondHttpResponse.httpRequest.method).toBe('get');
					expect(secondHttpResponse.httpRequest.url).toBe(httpResponse.httpRequest.url);
					expect(secondHttpResponse.httpRequest.data).toBe(httpResponse.httpRequest.data);
					expect(JSON.stringify(secondHttpResponse.data)).toBe(JSON.stringify(httpResponse.data));
					expect(JSON.stringify(secondHttpResponse.headers)).toBe(JSON.stringify(httpResponse.headers));

					done();
				})

			}, 1);

		})
	});

	test('Responses do not return from cache after expiry', (done: Function) =>
	{
		// Enable response caching
		Http.enableResponseCaching({ defaultCacheExpiry: "3s" });

		let url = 'https://api.example.com/user';

		let promise = Http.makeRequest('get', url);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.fromCache).toBe(false);

			// Time for cache to expire
			setTimeout(() =>
			{
				let promise = Http.makeRequest('get', url);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.fromCache).toBe(false);

					done();
				})

			}, 4000);

		})
	});

	test('Responses cache expiry can be overridden per request (expiry set with Moment)', (done: Function) =>
	{
		// Enable response caching
		Http.enableResponseCaching({ defaultCacheExpiry: "60s" });

		let url = 'https://api.example.com/user';

		let expiry = Moment();
		expiry.minutes(expiry.minutes() + 1);

		let promise = Http.makeRequest('get', url, null, expiry);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.fromCache).toBe(false);

			// Time for default cache to expire (should have picked up our override)
			setTimeout(() =>
			{
				let promise = Http.makeRequest('get', url);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.fromCache).toBe(true);

					done();
				})

			}, 4000);

		})
	});

	test('Responses cache expiry can be overridden per request (expiry set with Date)', (done: Function) =>
	{
		// Enable response caching
		Http.enableResponseCaching({ defaultCacheExpiry: "60s" });

		let url = 'https://api.example.com/user';

		let expiryDate = new Date();
		expiryDate.setMinutes(expiryDate.getMinutes() + 1);
		let promise = Http.makeRequest('get', url, null, expiryDate);

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.fromCache).toBe(false);

			// Time for default cache to expire (should have picked up our override)
			setTimeout(() =>
			{
				let promise = Http.makeRequest('get', url);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.fromCache).toBe(true);

					done();
				})

			}, 4000);

		})
	});

	test('Responses cache expiry can be overridden per request (expiry set with time string)', (done: Function) =>
	{
		// Enable response caching
		Http.enableResponseCaching({ defaultCacheExpiry: "60s" });

		let url = 'https://api.example.com/user';

		let promise = Http.makeRequest('get', url, null, '60s');

		promise.then(function(httpResponse: HttpResponse)
		{
			expect(httpResponse.fromCache).toBe(false);

			// Time for default cache to expire (should have picked up our override)
			setTimeout(() =>
			{
				let promise = Http.makeRequest('get', url);

				promise.then((secondHttpResponse: HttpResponse) =>
				{
					expect(secondHttpResponse.fromCache).toBe(true);

					done();
				})

			}, 4000);

		})
	});
});

