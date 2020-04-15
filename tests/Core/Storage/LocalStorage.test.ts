
import {StorageItem} from "../../../src/Core/Storage/StorageItem";
import Moment from 'moment';
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

	test('Values are stored as StorageItem entity with correct keys', () =>
	{
		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Use set method to store value
		LocalStorage.set(testKey, testValue);

		// Retrieve using native JS
		let retrievedValue = window.localStorage.getItem(testKey);

		// Parse value (should have been stored as a JSON string)
		let valueAsObject = JSON.parse(retrievedValue);

		// Test that all required properties are present
		expect(valueAsObject).toHaveProperty('created');
		expect(valueAsObject).toHaveProperty('expiry');
		expect(valueAsObject).toHaveProperty('key');
		expect(valueAsObject).toHaveProperty('value');
	});

	test('Retrieved StorageItem entities are hydrated with correct key and value', () =>
	{
		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Use set method to store value
		LocalStorage.set(testKey, testValue);

		// Retrieve item
		let storageItemEntity = LocalStorage.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(StorageItem);
		// Test that key is hydrated correctly
		expect(storageItemEntity.key).toBe(testKey);
		// Test that value hydrated correctly
		expect(storageItemEntity.value).toBe(testValue);
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
		let storageItemEntity = LocalStorage.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(StorageItem);
		// Test that value hydrated correctly
		expect(typeof storageItemEntity.value).toBe(typeof testValue);
		expect(storageItemEntity.value['example']).toBe(testValue.example);
	});

	test('Unexpired storage items are retrieved correctly when expiry is set with Date object', () =>
	{
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Create date object 30s in the future
		let expiryDate = Moment();
		expiryDate.seconds(expiryDate.seconds() + 30);

		// Use set method to store value with expiry date created
		LocalStorage.set(testKey, testValue, expiryDate);

		// Retrieve item
		let storageItemEntity = LocalStorage.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(StorageItem);
	});

	test('Unexpired storage items are retrieved correctly when expiry is set with time string', () =>
	{
		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Use set method to store value with 30s expiry
		LocalStorage.set(testKey, testValue, '30s');

		// Retrieve item
		let storageItemEntity = LocalStorage.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(StorageItem);
	});

	test('Expired storage items are retrieved correctly when expiry is set with Moment object', (done: Function) =>
	{
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		let expiryDate = Moment();
		expiryDate.seconds(expiryDate.seconds() + 1);

		// Use set method to store value with expiry date created
		LocalStorage.set(testKey, testValue, expiryDate);

		// In 1.1s, check to see that no storage item is returned
		setTimeout(() =>
		{
			// Retrieve item
			let storageItemEntity = LocalStorage.get(testKey);

			// Test that entity has not been returned
			expect(storageItemEntity).toBe(null);

			done();
		}, 1100);

	});

	test('Expired storage items are retrieved correctly when expiry is set with time string', (done: Function) =>
	{
		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Use set method to store value with 1s expiry
		LocalStorage.set(testKey, testValue, '1s');

		// In 1.5s, check to see that no storage item is returned
		setTimeout(() =>
		{
			// Retrieve item
			let storageItemEntity = LocalStorage.get(testKey);

			// Test that entity has been returned
			expect(storageItemEntity).toBe(null);

			done();
		}, 1500);
	});

	test('Storage items are removed correctly by key', () =>
	{
		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		LocalStorage.set(testKey, testValue);

		// Get the value to make sure it set something
		let retrievedStorageEntity = LocalStorage.get(testKey);

		// Check that it returned a storage item entity
		expect(retrievedStorageEntity).toBeInstanceOf(StorageItem);

		// Remove it
		LocalStorage.remove(testKey);

		// Get it again
		retrievedStorageEntity = LocalStorage.get(testKey);

		// Check that the storage item was not returned
		expect(retrievedStorageEntity).toBe(null);

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
		let retrievedStorageEntity = LocalStorage.get(testKey);
		let secondRetrievedStorageEntity = LocalStorage.get(testKey2);

		// Check that it returned a storage item entity
		expect(retrievedStorageEntity).toBeInstanceOf(StorageItem);
		expect(secondRetrievedStorageEntity).toBeInstanceOf(StorageItem);

		// Remove all
		LocalStorage.clear();

		// Get it again
		retrievedStorageEntity = LocalStorage.get(testKey);
		secondRetrievedStorageEntity = LocalStorage.get(testKey2);

		// Check that the storage item was not returned
		expect(retrievedStorageEntity).toBe(null);
		expect(secondRetrievedStorageEntity).toBe(null);

	});
});

