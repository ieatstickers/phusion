/**
 * User Agent Tests
 *
 * TODO: Mock user agent and test all remaining methods
 */
import {UserAgent} from "../../../src/Core/UserAgent/UserAgent";

describe('Core/UserAgent', () =>
{
	/**
	 * Test getters
	 */
	test('UserAgent getters return the correct types', () =>
	{
		expect(typeof UserAgent.getBrowserName()).toBe(typeof "example string");
		expect(typeof UserAgent.getMajorBrowserVersion()).toBe(typeof 123);
		// entity.getOsName() entity.getOsVersion() are not returned correctly in test environment
	});
});