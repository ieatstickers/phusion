
import {Phusion} from "../../../../src/core/Phusion";

/**
 * User Agent Tests
 *
 * TODO: Mock user agent and test all remaining methods
 */
describe('User Agent', () =>
{
	/**
	 * Test getters
	 */
	test('UserAgent getters return the correct types', () =>
	{
		let phusion = new Phusion({});

		let environmentModule = phusion.getEnvironmentModule();
		let entity = environmentModule.getUserAgent();

		expect(typeof entity.getBrowserName()).toBe(typeof "example string");
		expect(typeof entity.getMajorBrowserVersion()).toBe(typeof 123);
		// entity.getOsName() entity.getOsVersion() are not returned correctly in test environment
	});
});