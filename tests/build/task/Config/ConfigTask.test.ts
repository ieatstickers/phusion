
import {ModuleContainer} from "../../../../src/build/module/ModuleContainer";
import {ConfigTask} from "../../../../src/build/task/ConfigTask";

/**
 * ConfigTask Tests
 */
describe('ConfigTask', () =>
{
	let configDir = __dirname + '/test-config';
	let outputFilePath = configDir + '/test-configMergeTask.js';

	beforeAll(() =>
	{
		// Create task
		let task = new ConfigTask(
			{
				configDirPath: configDir,
				outputFilePath: outputFilePath
			}
		);

		// Run task
		task.run();
	});

	afterAll(() =>
	{
		let moduleContainer = new ModuleContainer();
		let fileSystemModule = moduleContainer.getFileSystemModule();

		// Remove config file
		if (fileSystemModule.fileExists(outputFilePath))
		{
			fileSystemModule.removeFile(outputFilePath);
		}
	});

	test('Outputs a file with the correct name and file path', () =>
	{
		let moduleContainer = new ModuleContainer();

		// Get contents of output file
		let outputFileContents = moduleContainer.getFileSystemModule().readAsTextString(outputFilePath);

		expect(typeof outputFileContents).toBe('string');
	});

	test('Output file can be imported and the result is of type "object"', () =>
	{
		let moduleContainer = new ModuleContainer();

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
		catch (e) { }

		expect(contentsAsObject).toBeInstanceOf(Object);
	});

	test('Default configs are merged with no ENV set"', () =>
	{
		let moduleContainer = new ModuleContainer();

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
		catch (e) { }

		expect(contentsAsObject).toBeInstanceOf(Object);
		expect(contentsAsObject['test']['env']).toBe('dev');
		expect(contentsAsObject['test']['something']).toBe('Some example value');
		expect(contentsAsObject['test']['somethingElse']).toBe('Some other example value');

		// Remove output file
		moduleContainer.getFileSystemModule().removeFile(outputFilePath);
	});

	test('ENV specific configs are merged with ENV set"', () =>
	{

		let moduleContainer = new ModuleContainer();
		let fileSystemModule = moduleContainer.getFileSystemModule();

		let envOutputFilePath = configDir + '/env-configMergeTask.js';

		// Set environment variable
		let initialEnv = global.process.env.ENV;
		global.process.env.ENV = 'test';

		// Create task
		let task = new ConfigTask(
			{
				configDirPath: configDir,
				outputFilePath: envOutputFilePath
			}
		);

		// Run task
		task.run();

		// Get contents of output file
		let outputFileContents = fileSystemModule.readAsTextString(envOutputFilePath);

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
		catch (e) { }

		expect(contentsAsObject).toBeInstanceOf(Object);
		expect(contentsAsObject['test']['env']).toBe('test');
		expect(contentsAsObject['test']['something']).toBe('Some example value');
		expect(contentsAsObject['test']['somethingElse']).toBe('Some other example value');

		// Reset ENV
		global.process.env.ENV = initialEnv;

		// Remove output file
		fileSystemModule.removeFile(envOutputFilePath);
	});
});