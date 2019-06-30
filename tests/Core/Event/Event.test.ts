
import {Event} from '../../../src/Core/Event/Event';

/**
 * Event Tests
 */
describe('Core/Event', () =>
{
	test('Registered event listeners are called when event is dispatched', (done: Function) =>
	{
		let dataToBeSent = {
			"someKey": "someValue"
		};

		Event.on('exampleEvent', function(data) {
			expect(data).toBeTruthy();
			expect(data.someKey).toBe(dataToBeSent.someKey);
			expect(typeof data.someKey).toBe(typeof dataToBeSent.someKey);
			done();
		});

		Event.dispatch('exampleEvent', {someKey: "someValue"});
	});
});

