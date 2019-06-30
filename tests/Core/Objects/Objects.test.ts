
import {Objects} from "../../../src/Core/Objects/Objects";

/**
 * Objects Tests
 */
describe('Core/Objects', () =>
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
	});

	test('Objects.getByKeyPath() returns the correct values', () =>
	{
		let testString = Objects.getByKeyPath('some:example:path:string', applicationConfig);
		let expectedString = applicationConfig['some']['example']['path']['string'];

		let testNumber = Objects.getByKeyPath('some:example:path:number', applicationConfig);
		let expectedNumber = applicationConfig['some']['example']['path']['number'];

		let testFloat = Objects.getByKeyPath('some:example:path:float', applicationConfig);
		let expectedFloat = applicationConfig['some']['example']['path']['float'];

		let testBoolean = Objects.getByKeyPath('some:example:path:boolean', applicationConfig);
		let expectedBoolean = applicationConfig['some']['example']['path']['boolean'];

		let testArray = Objects.getByKeyPath('some:example:path:array', applicationConfig);
		let expectedArray = applicationConfig['some']['example']['path']['array'];

		expect(testString).toBe(expectedString);
		expect(testNumber).toBe(expectedNumber);
		expect(testFloat).toBe(expectedFloat);
		expect(testBoolean).toBe(expectedBoolean);
		expect(testArray).toBe(expectedArray);
	});

	test('Objects.getByKeyPath() returns the correct types', () =>
	{
		let testString = Objects.getByKeyPath('some:example:path:string', applicationConfig);
		let testNumber = Objects.getByKeyPath('some:example:path:number', applicationConfig);
		let testFloat = Objects.getByKeyPath('some:example:path:float', applicationConfig);
		let testBoolean = Objects.getByKeyPath('some:example:path:boolean', applicationConfig);
		let testArray = Objects.getByKeyPath('some:example:path:array', applicationConfig);

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

	test('Objects.getByKeyPath() returns null for non-existent config paths', () =>
	{
		let value = Objects.getByKeyPath('some:example:path:that:does:not:exist', applicationConfig);

		expect(value).toBe(null);
	});

	test('Objects.merge() correctly merges objects', () =>
	{
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

		let mergedObject = Objects.merge({}, objectOne, objectTwo, objectThree);

		// Merged object is an object
		expect(mergedObject).toBeInstanceOf(Object);

		// Value from first object is unchanged
		let valueFromFirstObject = Objects.getByKeyPath('value:from:object:one', mergedObject);
		expect(valueFromFirstObject).toBe(objectOne['value']['from']['object']['one']);

		// Value is correctly overridden from second object
		let valueOverriddenInSecondObject = Objects.getByKeyPath('other:value:from:object:one', mergedObject);
		expect(valueOverriddenInSecondObject).toBe(objectTwo['other']['value']['from']['object']['one']);

		// Value is correctly overridden from third object
		let valueOverriddenInThirdObject = Objects.getByKeyPath('another:value:from:object:one', mergedObject);
		expect(valueOverriddenInThirdObject).toBe(objectThree['another']['value']['from']['object']['one']);
	});

});