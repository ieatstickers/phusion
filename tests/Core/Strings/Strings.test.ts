
import {Strings} from "../../../src/Core/Strings/Strings";

/**
 * Strings Tests
 */
describe('Core/Strings', () =>
{
	test('Strings.contains() returns correct positives', () =>
	{
		let testStrings = {
			'Hello World': 'orl',
			'Beginning': 'Begi',
			'End': 'nd',
			'Middle': 'iddl'
		};

		for (let haystack in testStrings)
		{
			let needle = testStrings[haystack];
			expect(Strings.contains(haystack, needle)).toBe(true);
		}

	});

	test('Strings.contains() returns correct negatives', () =>
	{
		let testStrings = {
			'Hello World': 'red',
			'Beginning': 'blue',
			'End': 'orange',
			'Middle': 'green'
		};

		for (let haystack in testStrings)
		{
			let needle = testStrings[haystack];
			expect(Strings.contains(haystack, needle)).toBe(false);
		}
	});

	test('Strings.endsWith() returns correct positives', () =>
	{
		let testStrings = {
			'Hello World': 'orld',
			'Beginning': 'ning',
			'End': 'd',
			'Middle!': 'le!'
		};

		for (let string in testStrings)
		{
			let suffix = testStrings[string];
			expect(Strings.endsWith(string, suffix)).toBe(true);
		}
	});

	test('Strings.endsWith() returns correct negatives', () =>
	{
		let testStrings = {
			'Hello World': 'He',
			'Beginning': 'Begi',
			'End': 'En',
			'Middle': 'Mid'
		};

		for (let string in testStrings)
		{
			let suffix = testStrings[string];
			if (Strings.endsWith(string, suffix))
			{
				console.log(string, suffix);
			}
			expect(Strings.endsWith(string, suffix)).toBe(false);
		}
	});

	test('Strings.startsWith() returns correct positives', () =>
	{
		let testStrings = {
			'Hello World': 'He',
			'Beginning': 'Begi',
			'End': 'En',
			'Middle': 'Mid'
		};

		for (let string in testStrings)
		{
			let prefix = testStrings[string];
			expect(Strings.startsWith(string, prefix)).toBe(true);
		}
	});

	test('Strings.startsWith() returns correct negatives', () =>
	{
		let testStrings = {
			'Hello World': 'orld',
			'Beginning': 'ning',
			'End': 'd',
			'Middle': 'le'
		};

		for (let string in testStrings)
		{
			let prefix = testStrings[string];
			let startsWith = Strings.startsWith(string, prefix);
			expect(startsWith).toBe(false);
		}
	});

});