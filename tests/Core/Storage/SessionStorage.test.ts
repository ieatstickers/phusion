
import {StorageItem} from "../../../src/Core/Storage/StorageItem";
import Moment from 'moment';
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

	test('Values are stored as StorageItem entity with correct keys', () =>
	{
		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Use set method to store value
		SessionStorage.set(testKey, testValue);

		// Retrieve using native JS
		let retrievedValue = window.sessionStorage.getItem(testKey);

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
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Use set method to store value
		SessionStorage.set(testKey, testValue);

		// Retrieve item
		let storageItemEntity = SessionStorage.get(testKey);

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
		let testKey = 'exampleSessionStorageKey';
		let testValue = {
			example: "Example value"
		};

		// Use set method to store value
		SessionStorage.set(testKey, testValue);

		// Retrieve item
		let storageItemEntity = SessionStorage.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(StorageItem);
		// Test that value hydrated correctly
		expect(typeof storageItemEntity.value).toBe(typeof testValue);
		expect(storageItemEntity.value['example']).toBe(testValue.example);
	});

	test('Unexpired storage items are retrieved correctly when expiry is set with Date object', () =>
	{
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Create date object 30s in the future
		let expiryDate = Moment();
		expiryDate.seconds(expiryDate.seconds() + 30);

		// Use set method to store value with expiry date created
		SessionStorage.set(testKey, testValue, expiryDate);

		// Retrieve item
		let storageItemEntity = SessionStorage.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(StorageItem);
	});

	test('Unexpired storage items are retrieved correctly when expiry is set with time string', () =>
	{
		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Use set method to store value with 30s expiry
		SessionStorage.set(testKey, testValue, '30s');

		// Retrieve item
		let storageItemEntity = SessionStorage.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(StorageItem);
	});

	test('Expired storage items are retrieved correctly when expiry is set with Moment object', (done: Function) =>
	{
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		let expiryDate = Moment();
		expiryDate.seconds(expiryDate.seconds() + 1);

		// Use set method to store value with expiry date created
		SessionStorage.set(testKey, testValue, expiryDate);

		// In 1.1s, check to see that no storage item is returned
		setTimeout(() =>
		{
			// Retrieve item
			let storageItemEntity = SessionStorage.get(testKey);

			// Test that entity has not been returned
			expect(storageItemEntity).toBe(null);

			done();
		}, 1100);

	});

	test('Expired storage items are retrieved correctly when expiry is set with time string', (done: Function) =>
	{
		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Use set method to store value with 1s expiry
		SessionStorage.set(testKey, testValue, '1s');

		// In 1.5s, check to see that no storage item is returned
		setTimeout(() =>
		{
			// Retrieve item
			let storageItemEntity = SessionStorage.get(testKey);

			// Test that entity has been returned
			expect(storageItemEntity).toBe(null);

			done();
		}, 1500);
	});

	test('Storage items are removed correctly by key', () =>
	{
		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		SessionStorage.set(testKey, testValue);

		// Get the value to make sure it set something
		let retrievedStorageEntity = SessionStorage.get(testKey);

		// Check that it returned a storage item entity
		expect(retrievedStorageEntity).toBeInstanceOf(StorageItem);

		// Remove it
		SessionStorage.remove(testKey);

		// Get it again
		retrievedStorageEntity = SessionStorage.get(testKey);

		// Check that the storage item was not returned
		expect(retrievedStorageEntity).toBe(null);

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
		let retrievedStorageEntity = SessionStorage.get(testKey);
		let secondRetrievedStorageEntity = SessionStorage.get(testKey2);

		// Check that it returned a storage item entity
		expect(retrievedStorageEntity).toBeInstanceOf(StorageItem);
		expect(secondRetrievedStorageEntity).toBeInstanceOf(StorageItem);

		// Remove all
		SessionStorage.clear();

		// Get it again
		retrievedStorageEntity = SessionStorage.get(testKey);
		secondRetrievedStorageEntity = SessionStorage.get(testKey2);

		// Check that the storage item was not returned
		expect(retrievedStorageEntity).toBe(null);
		expect(secondRetrievedStorageEntity).toBe(null);

	});
});

