
import {Phusion} from "../../../../src/core/Phusion";

/**
 * Event Module Tests
 */
describe('Event Module', () =>
{
	test('Registered event listeners are called when event is dispatched', (done: Function) =>
	{
		let phusion = new Phusion({});
		let eventModule = phusion.getEventModule();

		let dataToBeSent = {
			"someKey": "someValue"
		};

		eventModule.on('exampleEvent', function(data) {
			expect(data).toBeTruthy();
			expect(data.someKey).toBe(dataToBeSent.someKey);
			expect(typeof data.someKey).toBe(typeof dataToBeSent.someKey);
			done();
		});

		eventModule.dispatch('exampleEvent', {someKey: "someValue"});
	});
});

