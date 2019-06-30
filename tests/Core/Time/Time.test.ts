
import {Time} from "../../../src/Core/Time/Time";

/**
 * Strings Tests
 */
describe('Core/Time', () =>
{
	test('Time.timeStringToSeconds() returns correct values', () =>
	{
		let testStrings = {
			'10s': 10,
			'5m': 60 * 5,
			'3d': 60 * 60 * 24 * 3,
			'2w': 60 * 60 * 24 * 14,
			'3w:4d:8m:5s': 1814400 + 345600 + (8 * 60) + 5,
		};

		for (let timeString in testStrings)
		{
			let valueInSeconds = testStrings[timeString];
			expect(Time.timeStringToSeconds(timeString)).toBe(valueInSeconds);
		}
	});
});