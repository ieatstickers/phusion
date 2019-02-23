
import {Phusion} from "../../../../src/core/Phusion";
import {UserAgent} from "../../../../src/core/module/Environment/Entity/UserAgent";

/**
 * Environment Module Tests
 */
describe('Environment Module', () =>
{
	test('getUserAgent() returns UserAgent entity', () =>
	{
		let phusion = new Phusion({});

		let environmentModule = phusion.getEnvironmentModule();
		let entity = environmentModule.getUserAgent();
		expect(entity).toBeInstanceOf(UserAgent);
	});

	test('getDomain() returns the correct domain', () =>
	{
		let phusion = new Phusion({});

		let environmentModule = phusion.getEnvironmentModule();
		let domain = environmentModule.getDomain();
		expect(domain).toBe(window.location.hostname);
	});

	test('getEnv() returns correct env key from config', () =>
	{
		let phusion = new Phusion({
			phusion: {
				module: {
					environment: {
						env: "test"
					}
				}
			}
		});

		let environmentModule = phusion.getEnvironmentModule();

		expect(environmentModule.getEnv()).toBe('test');
		expect(environmentModule.isDev()).toBe(false);
		expect(environmentModule.isProd()).toBe(false);
	});

	test('isDev() returns correct boolean', () =>
	{
		let phusion = new Phusion({
			phusion: {
				module: {
					environment: {
						env: "dev"
					}
				}
			}
		});

		let environmentModule = phusion.getEnvironmentModule();

		expect(environmentModule.isDev()).toBe(true);
		expect(environmentModule.isProd()).toBe(false);
	});

	test('isProd() returns correct boolean', () =>
	{
		let phusion = new Phusion({
			phusion: {
				module: {
					environment: {
						env: "dev"
					}
				}
			}
		});

		let environmentModule = phusion.getEnvironmentModule();

		expect(environmentModule.isDev()).toBe(true);
		expect(environmentModule.isProd()).toBe(false);
	});
});

