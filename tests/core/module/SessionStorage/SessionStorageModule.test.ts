
import {Phusion} from "../../../../src/core/Phusion";
import * as Moment from 'moment';
import {SessionStorageItem} from "../../../../src/core/module/SessionStorage/Entity/SessionStorageItem";

/**
 * Session Storage Module Tests
 */
describe('Session Storage Module', () =>
{
	beforeEach(() =>
	{
		// Clear session storage so tests don't interfere with each other
		window.sessionStorage.clear();
	});

	test('Values are stored as SessionStorageItem entity with correct keys', () =>
	{
		let phusion = new Phusion();
		let sessionStorageModule = phusion.getSessionStorageModule();

		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Use set method to store value
		sessionStorageModule.set(testKey, testValue);

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

	test('Retrieved SessionStorageItem entities are hydrated with correct key and value', () =>
	{
		let phusion = new Phusion();
		let sessionStorageModule = phusion.getSessionStorageModule();

		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Use set method to store value
		sessionStorageModule.set(testKey, testValue);

		// Retrieve item
		let storageItemEntity = sessionStorageModule.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(SessionStorageItem);
		// Test that key is hydrated correctly
		expect(storageItemEntity.getKey()).toBe(testKey);
		// Test that value hydrated correctly
		expect(storageItemEntity.getValue()).toBe(testValue);
	});

	test('Unexpired storage items are retrieved correctly when expiry is set with Date object', () =>
	{
		let phusion = new Phusion({});
		let sessionStorageModule = phusion.getSessionStorageModule();

		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Create date object 30s in the future
		let expiryDate = Moment();
		expiryDate.seconds(expiryDate.seconds() + 30);

		// Use set method to store value with expiry date created
		sessionStorageModule.set(testKey, testValue, expiryDate);

		// Retrieve item
		let storageItemEntity = sessionStorageModule.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(SessionStorageItem);
	});

	test('Unexpired storage items are retrieved correctly when expiry is set with time string', () =>
	{
		let phusion = new Phusion({});
		let sessionStorageModule = phusion.getSessionStorageModule();

		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Use set method to store value with 30s expiry
		sessionStorageModule.set(testKey, testValue, '30s');

		// Retrieve item
		let storageItemEntity = sessionStorageModule.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(SessionStorageItem);
	});

	test('Expired storage items are retrieved correctly when expiry is set with Date object', (done: Function) =>
	{
		let phusion = new Phusion();
		let sessionStorageModule = phusion.getSessionStorageModule();

		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		let expiryDate = Moment();
		expiryDate.seconds(expiryDate.seconds() + 1);

		// Use set method to store value with expiry date created
		sessionStorageModule.set(testKey, testValue, expiryDate);

		// In 1.1s, check to see that no storage item is returned
		setTimeout(() =>
		{
			// Retrieve item
			let storageItemEntity = sessionStorageModule.get(testKey);

			// Test that entity has not been returned
			expect(storageItemEntity).toBe(null);

			done();
		}, 1100);

	});

	test('Expired storage items are retrieved correctly when expiry is set with time string', (done: Function) =>
	{
		let phusion = new Phusion({});
		let sessionStorageModule = phusion.getSessionStorageModule();

		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Use set method to store value with 1s expiry
		sessionStorageModule.set(testKey, testValue, '1s');

		// In 1.5s, check to see that no storage item is returned
		setTimeout(() =>
		{
			// Retrieve item
			let storageItemEntity = sessionStorageModule.get(testKey);

			// Test that entity has been returned
			expect(storageItemEntity).toBe(null);

			done();
		}, 1500);
	});

	test('Storage items are removed correctly by key', () =>
	{
		let phusion = new Phusion({});
		let sessionStorageModule = phusion.getSessionStorageModule();

		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		sessionStorageModule.set(testKey, testValue);

		// Get the value to make sure it set something
		let retrievedStorageEntity = sessionStorageModule.get(testKey);

		// Check that it returned a storage item entity
		expect(retrievedStorageEntity).toBeInstanceOf(SessionStorageItem);

		// Remove it
		sessionStorageModule.remove(testKey);

		// Get it again
		retrievedStorageEntity = sessionStorageModule.get(testKey);

		// Check that the storage item was not returned
		expect(retrievedStorageEntity).toBe(null);

	});

	test('All storage items are cleared correctly', () =>
	{
		let phusion = new Phusion({});
		let sessionStorageModule = phusion.getSessionStorageModule();

		// Key and value to store
		let testKey = 'exampleSessionStorageKey';
		let testValue = 'Example session storage value!!';

		// Second key and value to store
		let testKey2 = 'exampleSessionStorageKey2';
		let testValue2 = 'Second example session storage value!!';

		// Use set method to store value
		sessionStorageModule.set(testKey, testValue);
		sessionStorageModule.set(testKey2, testValue2);

		// Get the value to make sure it set something
		let retrievedStorageEntity = sessionStorageModule.get(testKey);
		let secondRetrievedStorageEntity = sessionStorageModule.get(testKey2);

		// Check that it returned a storage item entity
		expect(retrievedStorageEntity).toBeInstanceOf(SessionStorageItem);
		expect(secondRetrievedStorageEntity).toBeInstanceOf(SessionStorageItem);

		// Remove all
		sessionStorageModule.clear();

		// Get it again
		retrievedStorageEntity = sessionStorageModule.get(testKey);
		secondRetrievedStorageEntity = sessionStorageModule.get(testKey2);

		// Check that the storage item was not returned
		expect(retrievedStorageEntity).toBe(null);
		expect(secondRetrievedStorageEntity).toBe(null);

	});
});

