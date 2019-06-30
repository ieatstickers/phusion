/**
 * ConfigTask Tests
 */
import {ConfigTask} from "../../../src/Task/ConfigTask";
import {FileSystem} from "../../../src/Cli/FileSystem/FileSystem";


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

		// Remove config file
		if (FileSystem.fileExists(outputFilePath))
		{
			FileSystem.removeFile(outputFilePath);
		}
	});

	test('Outputs a file with the correct name and file path', () =>
	{
		// Get contents of output file
		let outputFileContents = FileSystem.readAsTextString(outputFilePath);

		expect(typeof outputFileContents).toBe('string');
	});

	test('Output file can be imported and the result is of type "object"', () =>
	{
		// Get contents of output file
		let outputFileContents = FileSystem.readAsTextString(outputFilePath);

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
		// Get contents of output file
		let outputFileContents = FileSystem.readAsTextString(outputFilePath);

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
		FileSystem.removeFile(outputFilePath);
	});

	test('ENV specific configs are merged with ENV set"', () =>
	{

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
		let outputFileContents = FileSystem.readAsTextString(envOutputFilePath);

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
		FileSystem.removeFile(envOutputFilePath);
	});
});