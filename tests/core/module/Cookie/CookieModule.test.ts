
import {Phusion} from "../../../../src/core/Phusion";
import {Cookie} from "../../../../src/core/module/Cookie/Entity/Cookie";
import * as Moment from 'moment';

/**
 * Cookie Module Tests
 */
describe('Cookie Module', () =>
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

	test('Cookie entity is hydrated correctly when created', () =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		let entity = cookieModule.create(testKey, testValue);

		expect(entity).toBeInstanceOf(Cookie);
		expect(entity.getKey()).toBe(testKey);
		expect(entity.getValue()).toBe(testValue);
	});

	test('Cookie is created with the correct key and value', () =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		// Test Cookie Values
		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		cookieModule.set(testKey, testValue);

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

	test('get() returns Cookie entity hydrated with correct key and value', () =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		cookieModule.set(testKey, testValue);

		let cookie = cookieModule.get(testKey);

		expect(cookie).toBeInstanceOf(Cookie);
		expect(cookie.getKey()).toBe(testKey);
		expect(cookie.getValue()).toBe(testValue);
	});

	test('Expired Cookie is not returned (expiry set with Moment)', (done: Function) =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		// Set test date a second from now
		let testDate = Moment();
		testDate.seconds(testDate.seconds() + 1);

		cookieModule.set(testKey, testValue, testDate);
		let storedCookie = cookieModule.get(testKey);

		expect(storedCookie.getKey()).toBe(testKey);
		expect(storedCookie.getValue()).toBe(testValue);

		setTimeout(() =>
		{
			let cookie = cookieModule.get(testKey);

			expect(cookie).toBe(null);

			done();

		}, 1100);
	});

	test('Expired Cookie is not returned (expiry set with Date)', (done: Function) =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		// Set test date a second from now
		let testDate = new Date();
		testDate.setSeconds(testDate.getSeconds() + 1);

		cookieModule.set(testKey, testValue, testDate);
		let storedCookie = cookieModule.get(testKey);

		expect(storedCookie.getKey()).toBe(testKey);
		expect(storedCookie.getValue()).toBe(testValue);

		setTimeout(() =>
		{
			let cookie = cookieModule.get(testKey);

			expect(cookie).toBe(null);

			done();

		}, 1100);
	});

	test('Expired Cookie is not returned (expiry set with time string)', (done: Function) =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		// Set test date a second from now
		cookieModule.set(testKey, testValue, '1s');
		let storedCookie = cookieModule.get(testKey);

		expect(storedCookie.getKey()).toBe(testKey);
		expect(storedCookie.getValue()).toBe(testValue);

		setTimeout(() =>
		{
			let cookie = cookieModule.get(testKey);

			expect(cookie).toBe(null);

			done();

		}, 1100);
	});

	test('Unexpired Cookie is returned (expiry set with Moment)', () =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		// Set test date 10 seconds from now
		let testDate = Moment();
		testDate.seconds(testDate.seconds() + 10);

		cookieModule.set(testKey, testValue, testDate);
		let storedCookie = cookieModule.get(testKey);

		expect(storedCookie.getKey()).toBe(testKey);
		expect(storedCookie.getValue()).toBe(testValue);

		let cookie = cookieModule.get(testKey);
		expect(cookie).toBeInstanceOf(Cookie);
	});

	test('Unexpired Cookie is returned (expiry set with Date)', () =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		// Set test date 10 seconds from now
		let testDate = new Date();
		testDate.setSeconds(testDate.getSeconds() + 10);

		cookieModule.set(testKey, testValue, testDate);
		let storedCookie = cookieModule.get(testKey);

		expect(storedCookie.getKey()).toBe(testKey);
		expect(storedCookie.getValue()).toBe(testValue);

		let cookie = cookieModule.get(testKey);
		expect(cookie).toBeInstanceOf(Cookie);
	});

	test('Unexpired Cookie is returned (expiry set with time string)', () =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		// Set test date 10 seconds from now
		cookieModule.set(testKey, testValue, '10s');
		let storedCookie = cookieModule.get(testKey);

		expect(storedCookie.getKey()).toBe(testKey);
		expect(storedCookie.getValue()).toBe(testValue);

		let cookie = cookieModule.get(testKey);
		expect(cookie).toBeInstanceOf(Cookie);
	});

	test('Cookie is not set when domain is incorrect', () =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		cookieModule.set(testKey, testValue, null,'thisshouldfail.com');

		let storedCookie = cookieModule.get(testKey);

		expect(storedCookie).toBeNull();
	});

	test('Cookie is set correctly when specified domain is correct', () =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let testKey = 'testCookieKey';
		let testValue = 'Test Cookie Value';

		cookieModule.set(testKey, testValue, null, 'example.com');

		let cookie = cookieModule.get(testKey);
		expect(cookie).toBeInstanceOf(Cookie);
	});

	test('getAll() retrieves all cookies', () =>
	{
		let phusion = new Phusion({});
		let cookieModule = phusion.getCookieModule();

		let cookiesToSet = {
			testCookieKey: {
				"key": "testCookieKey",
				"value": "Test Cookie Value"
			},
			testCookieKey2: {
				"key": "testCookieKey",
				"value": "Test Cookie Value"
			}
		};

		cookieModule.set(cookiesToSet.testCookieKey.key, cookiesToSet.testCookieKey.value);
		cookieModule.set(cookiesToSet.testCookieKey2.key, cookiesToSet.testCookieKey2.value);

		let allCookies = cookieModule.getAll();

		for (let key in allCookies)
		{
			let cookieEntity = allCookies[key];
			let cookieToCheck = cookiesToSet[key];

			expect(cookieEntity.getKey()).toBe(cookieToCheck.key);
			expect(cookieEntity.getValue()).toBe(cookieToCheck.value);
		}
	})
});

