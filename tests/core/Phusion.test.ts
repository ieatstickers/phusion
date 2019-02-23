
import {Phusion} from "../../src/core/Phusion";
import {Config} from "../../src/core/module/Config/Entity/Config";
import {ConfigModule} from "../../src/core/module/Config/ConfigModule";
import {CookieModule} from "../../src/core/module/Cookie/CookieModule";
import {EnvironmentModule} from "../../src/core/module/Environment/EnvironmentModule";
import {EventModule} from "../../src/core/module/Event/EventModule";
import {HttpModule} from "../../src/core/module/Http/HttpModule";
import {LocalStorageModule} from "../../src/core/module/LocalStorage/LocalStorageModule";
import {SessionStorageModule} from "../../src/core/module/SessionStorage/SessionStorageModule";

/**
 * Phusion
 */
describe('Phusion', () =>
{

	/**
	 * Tests getApp()
	 */
	test('setApp() works and getApp() returns correct type', () =>
	{
		let phusion = new Phusion();

		let app = {
			name: "My App"
		};

		phusion.setApp(app);

		let retrievedApp = phusion.getApp();

		expect(JSON.stringify(app)).toBe(JSON.stringify(retrievedApp));
	});

	/**
	 * Tests getConfig()
	 */
	test('getConfig() returns correct type', () =>
	{
		let phusion = new Phusion();

		let config = phusion.getConfig();

		expect(config).toBeInstanceOf(Config);
	});

	/**
	 * Tests getConfigModule()
	 */
	test('getConfigModule() returns correct type', () =>
	{
		let phusion = new Phusion();

		let configModule = phusion.getConfigModule();

		expect(configModule).toBeInstanceOf(ConfigModule);
	});

	/**
	 * Tests getCookieModule()
	 */
	test('getCookieModule() returns correct type', () =>
	{
		let phusion = new Phusion();

		let cookieModule = phusion.getCookieModule();

		expect(cookieModule).toBeInstanceOf(CookieModule);
	});

	/**
	 * Tests getEnvironmentModule()
	 */
	test('getEnvironmentModule() returns correct type', () =>
	{
		let phusion = new Phusion();

		let environmentModule = phusion.getEnvironmentModule();

		expect(environmentModule).toBeInstanceOf(EnvironmentModule);
	});

	/**
	 * Tests getEventModule()
	 */
	test('getEventModule() returns correct type', () =>
	{
		let phusion = new Phusion();

		let eventModule = phusion.getEventModule();

		expect(eventModule).toBeInstanceOf(EventModule);
	});

	/**
	 * Tests getHttpModule()
	 */
	test('getHttpModule() returns correct type', () =>
	{
		let phusion = new Phusion();

		let httpModule = phusion.getHttpModule();

		expect(httpModule).toBeInstanceOf(HttpModule);
	});

	/**
	 * Tests getLocalStorageModule()
	 */
	test('getLocalStorageModule() returns correct type', () =>
	{
		let phusion = new Phusion();

		let localStorageModule = phusion.getLocalStorageModule();

		expect(localStorageModule).toBeInstanceOf(LocalStorageModule);
	});

	/**
	 * Tests getSessionStorageModule()
	 */
	test('getSessionStorageModule() returns correct type', () =>
	{
		let phusion = new Phusion();

		let sessionStorageModule = phusion.getSessionStorageModule();

		expect(sessionStorageModule).toBeInstanceOf(SessionStorageModule);
	});

});