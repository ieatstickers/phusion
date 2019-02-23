
import {Phusion} from '../../../../src/core/Phusion';
import {Config} from "../../../../src/core/module/Config/Entity/Config";

/**
 * Config Module Tests
 */
describe('Config Module', () =>
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

	test('Config entity is returned from getConfig()', () =>
	{
		let phusion = new Phusion(applicationConfig);
		let config = phusion.getConfigModule().getConfig();

		expect(config).toBeInstanceOf(Config);
	});

	test('getObjectValueByKeyPath returns the correct type and value', () =>
	{
		// Instantiate phusion
		let phusion = new Phusion(applicationConfig);
		let configModule = phusion.getConfigModule();

		let returnedString = configModule.getObjectValueByKeyPath('some:example:path:string', applicationConfig);
		let testString = applicationConfig['some']['example']['path']['string'];

		let returnedNumber = configModule.getObjectValueByKeyPath('some:example:path:number', applicationConfig);
		let testNumber = applicationConfig['some']['example']['path']['number'];

		let returnedFloat = configModule.getObjectValueByKeyPath('some:example:path:float', applicationConfig);
		let testFloat = applicationConfig['some']['example']['path']['float'];

		let returnedBoolean = configModule.getObjectValueByKeyPath('some:example:path:boolean', applicationConfig);
		let testBoolean = applicationConfig['some']['example']['path']['boolean'];

		let returnedArray = configModule.getObjectValueByKeyPath('some:example:path:array', applicationConfig);
		let testArray = applicationConfig['some']['example']['path']['array'];

		expect(returnedString).toBe(testString);
		expect(returnedNumber).toBe(testNumber);
		expect(returnedFloat).toBe(testFloat);
		expect(returnedBoolean).toBe(testBoolean);
		expect(returnedArray).toBe(testArray);

		expect(typeof returnedString).toBe(typeof testString);
		expect(typeof returnedNumber).toBe(typeof testNumber);
		expect(typeof returnedFloat).toBe(typeof testFloat);
		expect(typeof returnedBoolean).toBe(typeof testBoolean);
		expect(typeof returnedArray).toBe(typeof testArray);
	});

	test('merge() correctly merges objects', () =>
	{
		let phusion = new Phusion(applicationConfig);

		let objectOne = {
			"value": {
				"from": {
					"object": {
						"one": "Object one value"
					}
				}
			},
			"other": {
				"value": {
					"from": {
						"object": {
							"one": "Second object one value"
						}
					}
				}
			},
			"another": {
				"value": {
					"from": {
						"object": {
							"one": "Third object one value"
						}
					}
				}
			}
		};

		let objectTwo = {
			"other": {
				"value": {
					"from": {
						"object": {
							"one": "Value overridden in object two"
						}
					}
				}
			}
		};

		let objectThree = {
			"another": {
				"value": {
					"from": {
						"object": {
							"one": "Third object one value"
						}
					}
				}
			}
		};

		let configModule = phusion.getConfigModule();
		let mergedObject = configModule.merge(objectOne, objectTwo, objectThree);

		// Merged object is an object
		expect(mergedObject).toBeInstanceOf(Object);

		// Value from first object is unchanged
		let valueFromFirstObject = configModule.getObjectValueByKeyPath('value:from:object:one', mergedObject);
		expect(valueFromFirstObject).toBe(objectOne['value']['from']['object']['one']);

		// Value is correctly overridden from second object
		let valueOverriddenInSecondObject = configModule.getObjectValueByKeyPath('other:value:from:object:one', mergedObject);
		expect(valueOverriddenInSecondObject).toBe(objectTwo['other']['value']['from']['object']['one']);

		// Value is correctly overridden from third object
		let valueOverriddenInThirdObject = configModule.getObjectValueByKeyPath('another:value:from:object:one', mergedObject);
		expect(valueOverriddenInThirdObject).toBe(objectThree['another']['value']['from']['object']['one']);
	});
});

