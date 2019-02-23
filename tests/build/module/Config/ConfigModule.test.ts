
import {ModuleContainer} from "../../../../src/build/module/ModuleContainer";
import {Config} from "../../../../src/build/module/Config/Entity/Config";

/**
 * Config Module Tests
 */
describe('Config Module', () =>
{
	/**
	 * Tests that a config entity is returned from getConfig()
	 */
	test('Config entity is returned from toConfig()', () =>
	{
		let moduleContainer = new ModuleContainer();

		let key = "exampleKey";
		let value = "Example value!!";

		let configObject = {};

		configObject[key] = value;

		let config = moduleContainer
			.getConfigModule()
			.toConfig(configObject);

		expect(config).toBeInstanceOf(Config);
		expect(config.getByPath(key)).toBe(value);
	});

	/**
	 * Tests that getObjectValueByKeyPath returns the correct type and value
	 */
	test('getObjectValueByKeyPath returns the correct type and value', () =>
	{
		let moduleContainer = new ModuleContainer();
		let configModule = moduleContainer.getConfigModule();

		let exampleConfig = {
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

		let returnedString = configModule.getObjectValueByKeyPath('some:example:path:string', exampleConfig);
		let testString = exampleConfig['some']['example']['path']['string'];

		let returnedNumber = configModule.getObjectValueByKeyPath('some:example:path:number', exampleConfig);
		let testNumber = exampleConfig['some']['example']['path']['number'];

		let returnedFloat = configModule.getObjectValueByKeyPath('some:example:path:float', exampleConfig);
		let testFloat = exampleConfig['some']['example']['path']['float'];

		let returnedBoolean = configModule.getObjectValueByKeyPath('some:example:path:boolean', exampleConfig);
		let testBoolean = exampleConfig['some']['example']['path']['boolean'];

		let returnedArray = configModule.getObjectValueByKeyPath('some:example:path:array', exampleConfig);
		let testArray = exampleConfig['some']['example']['path']['array'];

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

	/**
	 * Tests that merge() correctly merges objects
	 */
	test('merge() correctly merges objects', () =>
	{
		let moduleContainer = new ModuleContainer();

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

		let configModule = moduleContainer.getConfigModule();
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


	/**
	 * Tests generateConfig (outputFormat: default, variableName: default)
	 */
	test('generateConfig() correctly merges .yaml files and outputs a merged config object (outputFormat: default, variableName: default)', () =>
	{
		let moduleContainer = new ModuleContainer();

		let configDir = __dirname + '/test-config/';
		let outputFilePath = configDir + 'test-default.js';

		// Set environment to 'test'
		let envInitialValue = global.process.env.ENV;
		global.process.env.ENV = 'test';

		// Generate config
		moduleContainer
			.getConfigModule()
			.generateConfig(configDir, outputFilePath, 'js');

		// Get contents of output file
		let outputFileContents = moduleContainer.getFileSystemModule().readAsTextString(outputFilePath);

		let fileContentRegex = 'var config = ((?:.)+);';
		let regExp = new RegExp(fileContentRegex, 's');
		let parts = regExp.exec(outputFileContents);
		let outputJsonString = parts[1];

		let contentsAsObject = null;

		try
		{
			// Parse string as JSON
			contentsAsObject = JSON.parse(outputJsonString);
		}
		catch (e)
		{

		}

		expect(regExp.test(outputFileContents)).toBe(true);
		expect(contentsAsObject['test']['env']).toBe('test');
		expect(contentsAsObject['test']['something']).toBe('Some example value');
		expect(contentsAsObject['test']['somethingElse']).toBe('Some other example value');

		// Reset ENV variable
		global.process.env.ENV = envInitialValue;

		// Remove output file
		moduleContainer.getFileSystemModule().removeFile(outputFilePath);
	});

	/**
	 * Tests generateConfig (outputFormat: js, variableName: default)
	 */
	test('generateConfig() correctly merges .yaml files and outputs a merged config object (outputFormat: js, variableName: default)', () =>
	{
		let moduleContainer = new ModuleContainer();

		let configDir = __dirname + '/test-config/';
		let outputFilePath = configDir + 'test-js-default.js';

		// Set environment to 'test'
		let envInitialValue = global.process.env.ENV;
		global.process.env.ENV = 'test';

		// Generate config
		moduleContainer
			.getConfigModule()
			.generateConfig(configDir, outputFilePath, 'js');

		// Get contents of output file
		let outputFileContents = moduleContainer.getFileSystemModule().readAsTextString(outputFilePath);

		let fileContentRegex = 'var config = ((?:.)+);';
		let regExp = new RegExp(fileContentRegex, 's');
		let parts = regExp.exec(outputFileContents);
		let outputJsonString = parts[1];

		let contentsAsObject = null;

		try
		{
			// Parse string as JSON
			contentsAsObject = JSON.parse(outputJsonString);
		}
		catch (e)
		{

		}

		expect(regExp.test(outputFileContents)).toBe(true);
		expect(contentsAsObject['test']['env']).toBe('test');
		expect(contentsAsObject['test']['something']).toBe('Some example value');
		expect(contentsAsObject['test']['somethingElse']).toBe('Some other example value');

		// Reset ENV variable
		global.process.env.ENV = envInitialValue;

		// Remove output file
		moduleContainer.getFileSystemModule().removeFile(outputFilePath);
	});

	/**
	 * Tests generateConfig (outputFormat: js, variableName: customVariableName)
	 */
	test('generateConfig() correctly merges .yaml files and outputs a merged config object (outputFormat: js, variableName: default)', () =>
	{
		let moduleContainer = new ModuleContainer();

		let configDir = __dirname + '/test-config/';
		let outputFilePath = configDir + 'test-js-customVariableName.js';

		// Set environment to 'test'
		let envInitialValue = global.process.env.ENV;
		global.process.env.ENV = 'test';

		// Generate config
		moduleContainer
			.getConfigModule()
			.generateConfig(configDir, outputFilePath, 'js', 'customVariableName');

		// Get contents of output file
		let outputFileContents = moduleContainer.getFileSystemModule().readAsTextString(outputFilePath);

		let fileContentRegex = 'var customVariableName = ((?:.)+);';
		let regExp = new RegExp(fileContentRegex, 's');
		let parts = regExp.exec(outputFileContents);
		let outputJsonString = parts[1];

		let contentsAsObject = null;

		try
		{
			// Parse string as JSON
			contentsAsObject = JSON.parse(outputJsonString);
		}
		catch (e)
		{

		}

		expect(regExp.test(outputFileContents)).toBe(true);
		expect(contentsAsObject['test']['env']).toBe('test');
		expect(contentsAsObject['test']['something']).toBe('Some example value');
		expect(contentsAsObject['test']['somethingElse']).toBe('Some other example value');

		// Reset ENV variable
		global.process.env.ENV = envInitialValue;

		// Remove output file
		moduleContainer.getFileSystemModule().removeFile(outputFilePath);
	});

	/**
	 * Tests generateConfig (outputFormat: node)
	 */
	test('generateConfig() correctly merges .yaml files and outputs a merged config object (outputFormat: node)', () =>
	{
		let moduleContainer = new ModuleContainer();

		let configDir = __dirname + '/test-config/';
		let outputFilePath = configDir + 'test-node.js';

		// Set environment to 'test'
		let envInitialValue = global.process.env.ENV;
		global.process.env.ENV = 'test';

		// Generate config
		moduleContainer
			.getConfigModule()
			.generateConfig(configDir, outputFilePath, 'node');

		// Get contents of output file
		let outputFileContents = moduleContainer.getFileSystemModule().readAsTextString(outputFilePath);

		let fileContentRegex = 'module.exports = ((?:.)+);';
		let regExp = new RegExp(fileContentRegex, 's');

		let parts = regExp.exec(outputFileContents);
		expect(parts).toBeInstanceOf(Array);

		let outputJsonString = parts[1];
		expect(typeof outputJsonString).toBe(typeof "string");

		let contentsAsObject = null;

		try
		{
			// Parse string as JSON
			contentsAsObject = JSON.parse(outputJsonString);
		}
		catch (e) { }

		expect(contentsAsObject).toBeInstanceOf(Object);
		expect(contentsAsObject['test']['env']).toBe('test');
		expect(contentsAsObject['test']['something']).toBe('Some example value');
		expect(contentsAsObject['test']['somethingElse']).toBe('Some other example value');

		// Reset ENV variable
		global.process.env.ENV = envInitialValue;

		// Remove output file
		moduleContainer.getFileSystemModule().removeFile(outputFilePath);
	});

	/**
	 * Tests generateConfig (outputFormat: json)
	 */
	test('generateConfig() correctly merges .yaml files and outputs a merged config object (outputFormat: json)', () =>
	{
		let moduleContainer = new ModuleContainer();

		let configDir = __dirname + '/test-config/';
		let outputFilePath = configDir + 'test-json.json';

		// Set environment to 'test'
		let envInitialValue = global.process.env.ENV;
		global.process.env.ENV = 'test';

		// Generate config
		moduleContainer
			.getConfigModule()
			.generateConfig(configDir, outputFilePath, 'json');

		// Get contents of output file
		let outputFileContents = moduleContainer.getFileSystemModule().readAsTextString(outputFilePath);

		expect(typeof outputFileContents).toBe(typeof "string");

		let contentsAsObject = null;

		try
		{
			// Parse string as JSON
			contentsAsObject = JSON.parse(outputFileContents);
		}
		catch (e) { }

		expect(contentsAsObject).toBeInstanceOf(Object);
		expect(contentsAsObject['test']['env']).toBe('test');
		expect(contentsAsObject['test']['something']).toBe('Some example value');
		expect(contentsAsObject['test']['somethingElse']).toBe('Some other example value');

		// Reset ENV variable
		global.process.env.ENV = envInitialValue;

		// Remove output file
		moduleContainer.getFileSystemModule().removeFile(outputFilePath);
	})
});

