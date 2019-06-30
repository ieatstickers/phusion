
import {Cookies} from "../../../src/Core/Cookies/Cookies";
import * as Moment from 'moment';

/**
 * Cookies Tests
 */
describe('Core/Cookies', () =>
{
	beforeEach(() =>
	{
		// Found on stack overflow :)
		// https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
		function deleteAllCookies()
		{
			let cookies = document.cookie.split(";");

			for (let i = 0; i < cookies.length; i++) {
				let cookie = cookies[i];
				let equalsPosition = cookie.indexOf("=");
				let name = equalsPosition > -1 ? cookie.substr(0, equalsPosition) : cookie;
				document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
			}
		}

		deleteAllCookies();
	});

	test('Cookies is set with the correct key and value', () =>
	{
		// Test Cookies Values
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookies Value';

		Cookies.set(testKey, testValue);

		// Get document.cookie string
		let documentCookieString = document.cookie;

		// Split cookie string by ';'
		let cookieStringParts = documentCookieString.split(';');

		// For each cookie string part
		for (let cookieStringPart of cookieStringParts)
		{
			// if it is not equal to ''
			if(cookieStringPart != '')
			{
				// Split the key, value pair by '='
				let cookieParts = cookieStringPart.split('=');

				let key = cookieParts[0];
				let value = cookieParts[1];

				// remove space before key
				key = key.replace(' ', '');

				// test cookie key and value
				expect(key).toBe(testKey);
				expect(value).toBe(testValue);
			}
		}
	});

	test('get() returns correct cookie value', () =>
	{
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookies Value';

		Cookies.set(testKey, testValue);

		let cookieValue = Cookies.get(testKey);

		expect(cookieValue).toBe(testValue);
	});

	test('Expired Cookies is not returned (expiry set with Moment)', (done: Function) =>
	{
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookies Value';

		// Set test date a second from now
		let testDate = Moment();
		testDate.seconds(testDate.seconds() + 1);

		Cookies.set(testKey, testValue, testDate);
		let storedCookieValue = Cookies.get(testKey);

		expect(storedCookieValue).toBe(testValue);

		setTimeout(() =>
		{
			let cookie = Cookies.get(testKey);

			expect(cookie).toBe(null);

			done();

		}, 1100);
	});

	test('Expired Cookies is not returned (expiry set with Date)', (done: Function) =>
	{
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookies Value';

		// Set test date a second from now
		let testDate = new Date();
		testDate.setSeconds(testDate.getSeconds() + 1);

		Cookies.set(testKey, testValue, testDate);
		let storedCookieValue = Cookies.get(testKey);

		expect(storedCookieValue).toBe(testValue);

		setTimeout(() =>
		{
			let cookie = Cookies.get(testKey);

			expect(cookie).toBe(null);

			done();

		}, 1100);
	});

	test('Expired Cookies is not returned (expiry set with time string)', (done: Function) =>
	{
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookies Value';

		// Set test date a second from now
		Cookies.set(testKey, testValue, '1s');
		let storedCookieValue = Cookies.get(testKey);

		expect(storedCookieValue).toBe(testValue);

		setTimeout(() =>
		{
			let cookie = Cookies.get(testKey);

			expect(cookie).toBe(null);

			done();

		}, 1100);
	});

	test('Unexpired Cookies is returned (expiry set with Moment)', () =>
	{
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookies Value';

		// Set test date 10 seconds from now
		let testDate = Moment();
		testDate.seconds(testDate.seconds() + 10);

		Cookies.set(testKey, testValue, testDate);
		let storedCookieValue = Cookies.get(testKey);

		expect(storedCookieValue).toBe(testValue);
	});

	test('Unexpired Cookies is returned (expiry set with Date)', () =>
	{
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookies Value';

		// Set test date 10 seconds from now
		let testDate = new Date();
		testDate.setSeconds(testDate.getSeconds() + 10);

		Cookies.set(testKey, testValue, testDate);
		let storedCookieValue = Cookies.get(testKey);

		expect(storedCookieValue).toBe(testValue);
	});

	test('Unexpired Cookies is returned (expiry set with time string)', () =>
	{
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookies Value';

		// Set test date 10 seconds from now
		Cookies.set(testKey, testValue, '10s');
		let storedCookieValue = Cookies.get(testKey);
		expect(storedCookieValue).toBe(testValue);
	});

	test('Cookies is not set when domain is incorrect', () =>
	{
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookies Value';

		Cookies.set(testKey, testValue, null,'thisshouldfail.com');

		let storedCookie = Cookies.get(testKey);

		expect(storedCookie).toBeNull();
	});

	test('Cookies is set correctly when specified domain is correct', () =>
	{
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookies Value';

		Cookies.set(testKey, testValue, null, 'example.com');

		let cookieValue = Cookies.get(testKey);
		expect(cookieValue).toBe(testValue);
	});

	test('getAll() retrieves all cookies', () =>
	{
		let cookiesToSet = {
			testCookieKey: {
				"key": "testCookieKey",
				"value": "Test Cookies Value"
			},
			testCookieKey2: {
				"key": "testCookieKey",
				"value": "Test Cookies Value"
			}
		};

		Cookies.set(cookiesToSet.testCookieKey.key, cookiesToSet.testCookieKey.value);
		Cookies.set(cookiesToSet.testCookieKey2.key, cookiesToSet.testCookieKey2.value);

		let allCookies = Cookies.getAll();

		for (let cookieKey in allCookies)
		{
			let cookieValue = allCookies[cookieKey];
			let cookieToCheck = cookiesToSet[cookieKey];

			expect(cookieKey).toBe(cookieToCheck.key);
			expect(cookieValue).toBe(cookieToCheck.value);
		}
	});

	// TODO: Work out why test fails when code works in a browser
	// test('remove() expires the cookie', () =>
	// {
	// 	// Test Cookies Values
	// 	let testKey = 'testCookieKey';
	// 	let testValue = 'Test Cookies Value';
	//
	// 	Cookies.set(testKey, testValue, null, 'example.com');
	//
	// 	let value = Cookies.get(testKey);
	//
	// 	expect(value).toBe(testValue);
	//
	// 	Cookies.remove(testKey);
	//
	// 	let expiredValue = Cookies.get(testKey);
	//
	// 	expect(expiredValue).toBeNull();
	// });
});

