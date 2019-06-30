/**
 * Config Module Tests
 */
import {Config} from "../../../src/Cli/Config/Config";

describe('Config (Cli)', () =>
{
	test('generate() correctly merges .yaml files and returns a merged config object', () =>
	{
		let configDir = __dirname + '/test-config/';

		// Set environment to 'test'
		let envInitialValue = global.process.env.ENV;
		global.process.env.ENV = 'test';

		Config.addConfigDir(configDir);
		Config.addMergeRule(/default-/);
		Config.addMergeRule(/test-/);

		// Generate config
		let mergedConfig = Config.generate();

		expect(mergedConfig['test']['env']).toBe('test');
		expect(mergedConfig['test']['something']).toBe('Some example value');
		expect(mergedConfig['test']['somethingElse']).toBe('Some other example value');

		// Reset ENV variable
		global.process.env.ENV = envInitialValue;
	});
});

