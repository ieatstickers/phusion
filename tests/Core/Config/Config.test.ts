
import {Config} from "../../../src/Core/Config/Config";

/**
 * Config Tests
 */
describe('Core/Config', () =>
{
	let applicationConfig = null;

	beforeEach(() =>
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

		Config.setConfigObject(applicationConfig);
	});

	test('Config.setConfigObject() sets config correctly', () =>
	{
		let configObject = {
			example: "This is an example!"
		};

		Config.setConfigObject(configObject);

		expect(Config.toObject()).toBe(configObject);
	});

	test('Config.getByPath() returns the correct values', () =>
	{
		let testString = Config.getByPath('some:example:path:string');
		let expectedString = applicationConfig['some']['example']['path']['string'];

		let testNumber = Config.getByPath('some:example:path:number');
		let expectedNumber = applicationConfig['some']['example']['path']['number'];

		let testFloat = Config.getByPath('some:example:path:float');
		let expectedFloat = applicationConfig['some']['example']['path']['float'];

		let testBoolean = Config.getByPath('some:example:path:boolean');
		let expectedBoolean = applicationConfig['some']['example']['path']['boolean'];

		let testArray = Config.getByPath('some:example:path:array');
		let expectedArray = applicationConfig['some']['example']['path']['array'];

		expect(testString).toBe(expectedString);
		expect(testNumber).toBe(expectedNumber);
		expect(testFloat).toBe(expectedFloat);
		expect(testBoolean).toBe(expectedBoolean);
		expect(testArray).toBe(expectedArray);
	});

	test('Config.getByPath() returns the correct types', () =>
	{
		let testString = Config.getByPath('some:example:path:string');
		let testNumber = Config.getByPath('some:example:path:number');
		let testFloat = Config.getByPath('some:example:path:float');
		let testBoolean = Config.getByPath('some:example:path:boolean');
		let testArray = Config.getByPath('some:example:path:array');

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

	test('Config.getByPath() returns null for non-existent config paths', () =>
	{
		let value = Config.getByPath('some:example:path:that:does:not:exist');

		expect(value).toBe(null);
	});

	test('Config.toObject() returns an object', () =>
	{
		let configObject = Config.toObject();

		console.log(typeof configObject);

		expect(typeof configObject).toBe(typeof {});
	});
});