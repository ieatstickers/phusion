
import {SessionStorage} from "../../../src/Core/Storage/SessionStorage";

/**
 * Session Storage Tests
 */
describe('Core/SessionStorage', () =>
{
	beforeEach(() =>
	{
		// Clear session storage so tests don't interfere with each other
		window.sessionStorage.clear();
	});

	test('Retrieved correct value', () =>
	{
		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Use set method to store value
		SessionStorage.set(testKey, testValue);

		// Retrieve item
		let storageItemValue = SessionStorage.get(testKey);

		// Test that value is correct
		expect(storageItemValue).toBe(testValue);
	});

	test('Objects that are stringified and stored are parsed when retrieved', () =>
	{
		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = {
			example: "Example value"
		};

		// Use set method to store value
		SessionStorage.set(testKey, testValue);

		// Retrieve item
		let storageItemValue = SessionStorage.get(testKey);

		// Test that value hydrated correctly
		expect(typeof storageItemValue).toBe(typeof testValue);
		expect(storageItemValue.example).toBe(testValue.example);
	});

	test('Storage items are removed correctly by key', () =>
	{
		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		SessionStorage.set(testKey, testValue);

		// Get the value to make sure it set something
		let retrievedStorageValue = SessionStorage.get(testKey);

		// Check that it returned a storage item entity
		expect(retrievedStorageValue).toBe(testValue);

		// Remove it
		SessionStorage.remove(testKey);

		// Get it again
		retrievedStorageValue = SessionStorage.get(testKey);

		// Check that the storage item was not returned
		expect(retrievedStorageValue).toBe(null);

	});

	test('All storage items are cleared correctly', () =>
	{
		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Second key and value to store
		let testKey2 = 'exampleSessionStorageKey2';
		let testValue2 = 'Second example session storage value!!';

		// Use set method to store value
		SessionStorage.set(testKey, testValue);
		SessionStorage.set(testKey2, testValue2);

		// Get the value to make sure it set something
		let retrievedStorageValue = SessionStorage.get(testKey);
		let secondRetrievedStorageValue = SessionStorage.get(testKey2);

		// Check that it returned a storage item entity
		expect(retrievedStorageValue).toBe(testValue);
		expect(secondRetrievedStorageValue).toBe(testValue2);

		// Remove all
		SessionStorage.clear();

		// Get it again
		retrievedStorageValue = SessionStorage.get(testKey);
		secondRetrievedStorageValue = SessionStorage.get(testKey2);

		// Check that the storage item was not returned
		expect(retrievedStorageValue).toBe(null);
		expect(secondRetrievedStorageValue).toBe(null);

	});
});

