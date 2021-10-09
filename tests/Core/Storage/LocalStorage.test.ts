
import {LocalStorage} from "../../../src/Core/Storage/LocalStorage";

/**
 * Local Storage Module Tests
 */
describe('Core/LocalStorage', () =>
{
	beforeEach(() =>
	{
		// Clear local storage so tests don't interfere with each other
		window.localStorage.clear();
	});

	test('Retrieved correct value', () =>
	{
		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Use set method to store value
		LocalStorage.set(testKey, testValue);

		// Retrieve item
		let storageItemValue = LocalStorage.get(testKey);

		// Test that value hydrated correctly
		expect(storageItemValue).toBe(testValue);
	});

	test('Objects that are stringified and stored are parsed when retrieved', () =>
	{
		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = {
			example: "Example value"
		};

		// Use set method to store value
		LocalStorage.set(testKey, testValue);

		// Retrieve item
		let storageItemValue = LocalStorage.get(testKey);

		// Test that value hydrated correctly
		expect(typeof storageItemValue).toBe(typeof testValue);
		expect(storageItemValue['example']).toBe(testValue.example);
	});

	test('Storage items are removed correctly by key', () =>
	{
		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		LocalStorage.set(testKey, testValue);

		// Get the value to make sure it set something
		let retrievedStorageValue = LocalStorage.get(testKey);
  
		// Check that it returned a storage item entity
		expect(retrievedStorageValue).toBe(testValue);

		// Remove it
		LocalStorage.remove(testKey);

		// Get it again
		retrievedStorageValue = LocalStorage.get(testKey);

		// Check that the storage item was not returned
		expect(retrievedStorageValue).toBe(null);

	});

	test('All storage items are cleared correctly', () =>
	{
		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Second key and value to store
		let testKey2 = 'exampleLocalStorageKey2';
		let testValue2 = 'Second example local storage value!!';

		// Use set method to store value
		LocalStorage.set(testKey, testValue);
		LocalStorage.set(testKey2, testValue2);

		// Get the value to make sure it set something
		let retrievedStorageValue = LocalStorage.get(testKey);
		let secondRetrievedStorageValue = LocalStorage.get(testKey2);

		// Check that it returned a storage item entity
		expect(retrievedStorageValue).toBe(testValue);
		expect(secondRetrievedStorageValue).toBe(testValue2);

		// Remove all
		LocalStorage.clear();

		// Get it again
		retrievedStorageValue = LocalStorage.get(testKey);
		secondRetrievedStorageValue = LocalStorage.get(testKey2);

		// Check that the storage item was not returned
		expect(retrievedStorageValue).toBe(null);
		expect(secondRetrievedStorageValue).toBe(null);

	});
});

