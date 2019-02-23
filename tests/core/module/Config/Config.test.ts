
import {Phusion} from "../../../../src/core/Phusion";
import {Config} from "../../../../src/core/module/Config/Entity/Config";

/**
 * Config Entity Tests
 */
describe('Config', () =>
{
	let applicationConfig = null;

	beforeAll(() =>
	{
		// Set up a test JSON config in global scope
		applicationConfig = {
			'some': {
				'example': {
					'path': {
						'string': "Example config value",
						'number': 12345,
						'float': 123.45,
						'boolean': true,
						'array': [ 1, 2, 3, 4, 5 ]
					}
				}
			}
		};
	});

	test('getByPath() returns another Config entity if specific value not found', () =>
	{
		let phusion = new Phusion(applicationConfig);
		let config = phusion.getConfigModule().getConfig();
		let result = config.getByPath('some:example');

		expect(result).toBeInstanceOf(Config);
	});

	test('getByPath() returns the correct values', () =>
	{
		let phusion = new Phusion(applicationConfig);
		let config = phusion.getConfigModule().getConfig();

		let testString = config.getByPath('some:example:path:string');
		let expectedString = applicationConfig['some']['example']['path']['string'];

		let testNumber = config.getByPath('some:example:path:number');
		let expectedNumber = applicationConfig['some']['example']['path']['number'];

		let testFloat = config.getByPath('some:example:path:float');
		let expectedFloat = applicationConfig['some']['example']['path']['float'];

		let testBoolean = config.getByPath('some:example:path:boolean');
		let expectedBoolean = applicationConfig['some']['example']['path']['boolean'];

		let testArray = config.getByPath('some:example:path:array');
		let expectedArray = applicationConfig['some']['example']['path']['array'];

		expect(testString).toBe(expectedString);
		expect(testNumber).toBe(expectedNumber);
		expect(testFloat).toBe(expectedFloat);
		expect(testBoolean).toBe(expectedBoolean);
		expect(testArray).toBe(expectedArray);
	});

	test('getByPath() returns the correct types', () =>
	{
		let phusion = new Phusion(applicationConfig);
		let config = phusion.getConfigModule().getConfig();

		let testString = config.getByPath('some:example:path:string');
		let testNumber = config.getByPath('some:example:path:number');
		let testFloat = config.getByPath('some:example:path:float');
		let testBoolean = config.getByPath('some:example:path:boolean');
		let testArray = config.getByPath('some:example:path:array');

		let string = "Example string";
		let number = 12345;
		let float = 123.45;
		let boolean = true;
		let array = [ 1, 2, 3, 4, 5 ];

		expect(typeof testString).toBe(typeof string);
		expect(typeof testNumber).toBe(typeof number);
		expect(typeof testFloat).toBe(typeof float);
		expect(typeof testBoolean).toBe(typeof boolean);
		expect(typeof testArray).toBe(typeof array);
	});

	test('getByPath() returns null for non-existent config paths', () =>
	{
		let phusion = new Phusion(applicationConfig);
		let config = phusion.getConfigModule().getConfig();
		let value = config.getByPath('some:example:path:that:does:not:exist');

		expect(value).toBe(null);
	});
});