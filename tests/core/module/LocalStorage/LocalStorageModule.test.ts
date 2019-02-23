
import {Phusion} from "../../../../src/core/Phusion";
import {LocalStorageItem} from "../../../../src/core/module/LocalStorage/Entity/LocalStorageItem";
import * as Moment from 'moment';

/**
 * Local Storage Module Tests
 */
describe('Local Storage Module', () =>
{
	beforeEach(() =>
	{
		// Clear local storage so tests don't interfere with each other
		window.localStorage.clear();
	});

	test('Values are stored as LocalStorageItem entity with correct keys', () =>
	{
		let phusion = new Phusion();
		let localStorageModule = phusion.getLocalStorageModule();

		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Use set method to store value
		localStorageModule.set(testKey, testValue);

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

	test('Retrieved LocalStorageItem entities are hydrated with correct key and value', () =>
	{
		let phusion = new Phusion();
		let localStorageModule = phusion.getLocalStorageModule();

		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Use set method to store value
		localStorageModule.set(testKey, testValue);

		// Retrieve item
		let storageItemEntity = localStorageModule.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(LocalStorageItem);
		// Test that key is hydrated correctly
		expect(storageItemEntity.getKey()).toBe(testKey);
		// Test that value hydrated correctly
		expect(storageItemEntity.getValue()).toBe(testValue);
	});

	test('Objects that are stringified and stored are parsed when retrieved', () =>
	{
		let phusion = new Phusion();
		let localStorageModule = phusion.getLocalStorageModule();

		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = {
			example: "Example value"
		};

		// Use set method to store value
		localStorageModule.set(testKey, testValue);

		// Retrieve item
		let storageItemEntity = localStorageModule.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(LocalStorageItem);
		// Test that value hydrated correctly
		expect(typeof storageItemEntity.getValue()).toBe(typeof testValue);
		expect(storageItemEntity.getValue()['example']).toBe(testValue.example);
	});

	test('Unexpired storage items are retrieved correctly when expiry is set with Date object', () =>
	{
		let phusion = new Phusion({});
		let localStorageModule = phusion.getLocalStorageModule();

		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Create date object 30s in the future
		let expiryDate = Moment();
		expiryDate.seconds(expiryDate.seconds() + 30);

		// Use set method to store value with expiry date created
		localStorageModule.set(testKey, testValue, expiryDate);

		// Retrieve item
		let storageItemEntity = localStorageModule.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(LocalStorageItem);
	});

	test('Unexpired storage items are retrieved correctly when expiry is set with time string', () =>
	{
		let phusion = new Phusion({});
		let localStorageModule = phusion.getLocalStorageModule();

		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Use set method to store value with 30s expiry
		localStorageModule.set(testKey, testValue, '30s');

		// Retrieve item
		let storageItemEntity = localStorageModule.get(testKey);

		// Test that entity has been returned
		expect(storageItemEntity).toBeInstanceOf(LocalStorageItem);
	});

	test('Expired storage items are retrieved correctly when expiry is set with Date object', (done: Function) =>
	{
		let phusion = new Phusion();
		let localStorageModule = phusion.getLocalStorageModule();

		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		let expiryDate = Moment();
		expiryDate.seconds(expiryDate.seconds() + 1);

		// Use set method to store value with expiry date created
		localStorageModule.set(testKey, testValue, expiryDate);

		// In 1.1s, check to see that no storage item is returned
		setTimeout(() =>
		{
			// Retrieve item
			let storageItemEntity = localStorageModule.get(testKey);

			// Test that entity has not been returned
			expect(storageItemEntity).toBe(null);

			done();
		}, 1100);

	});

	test('Expired storage items are retrieved correctly when expiry is set with time string', (done: Function) =>
	{
		let phusion = new Phusion({});
		let localStorageModule = phusion.getLocalStorageModule();

		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Use set method to store value with 1s expiry
		localStorageModule.set(testKey, testValue, '1s');

		// In 1.5s, check to see that no storage item is returned
		setTimeout(() =>
		{
			// Retrieve item
			let storageItemEntity = localStorageModule.get(testKey);

			// Test that entity has been returned
			expect(storageItemEntity).toBe(null);

			done();
		}, 1500);
	});

	test('Storage items are removed correctly by key', () =>
	{
		let phusion = new Phusion({});
		let localStorageModule = phusion.getLocalStorageModule();

		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		localStorageModule.set(testKey, testValue);

		// Get the value to make sure it set something
		let retrievedStorageEntity = localStorageModule.get(testKey);

		// Check that it returned a storage item entity
		expect(retrievedStorageEntity).toBeInstanceOf(LocalStorageItem);

		// Remove it
		localStorageModule.remove(testKey);

		// Get it again
		retrievedStorageEntity = localStorageModule.get(testKey);

		// Check that the storage item was not returned
		expect(retrievedStorageEntity).toBe(null);

	});

	test('All storage items are cleared correctly', () =>
	{
		let phusion = new Phusion({});
		let localStorageModule = phusion.getLocalStorageModule();

		// Key and value to store
		let testKey = 'exampleLocalStorageKey';
		let testValue = 'Example local storage value!!';

		// Second key and value to store
		let testKey2 = 'exampleLocalStorageKey2';
		let testValue2 = 'Second example local storage value!!';

		// Use set method to store value
		localStorageModule.set(testKey, testValue);
		localStorageModule.set(testKey2, testValue2);

		// Get the value to make sure it set something
		let retrievedStorageEntity = localStorageModule.get(testKey);
		let secondRetrievedStorageEntity = localStorageModule.get(testKey2);

		// Check that it returned a storage item entity
		expect(retrievedStorageEntity).toBeInstanceOf(LocalStorageItem);
		expect(secondRetrievedStorageEntity).toBeInstanceOf(LocalStorageItem);

		// Remove all
		localStorageModule.clear();

		// Get it again
		retrievedStorageEntity = localStorageModule.get(testKey);
		secondRetrievedStorageEntity = localStorageModule.get(testKey2);

		// Check that the storage item was not returned
		expect(retrievedStorageEntity).toBe(null);
		expect(secondRetrievedStorageEntity).toBe(null);

	});
});

