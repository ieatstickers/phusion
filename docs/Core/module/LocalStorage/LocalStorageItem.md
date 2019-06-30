
  
## Local Storage Item

An instance of `LocalStorageItem` contains the key and value of the item, as well as a timestamp of when it was created and an expiry (if provided).

### getCreated(): Moment

Returns the created date time as a `Moment` object.

```javascript
let localStorageModule = phusion.getLocalStorageModule();

let storageItem = localStorageModule.get('auth_token');
console.log(storageItem); // Instance of LocalStorageItem

let created = storageItem.getCreated();
console.log(created); // Instance of Moment
```

### setCreated(created: Moment): LocalStorageItem

Sets the created date time as a `Moment` object.

### getExpiry(): Moment

Returns the expiry date time as a `Moment` object (or `null` if no expiry is set).

```javascript
let localStorageModule = phusion.getLocalStorageModule();

let storageItem = localStorageModule.get('auth_token');
console.log(storageItem); StorageItem

let expiry = storageItem.getExpiry();
console.log(expiry); // Instance of Moment
```

### setExpiry(expiry: Moment): LocalStorageItem

Sets the expiry date time as a `Moment` object.

### isExpired():boolean

Returns true if the expired date time has passed. 

### getKey(): string
Returns the key of the local storage item.
```javascript
let localStorageModule = phusion.getLocalStorageModule();

let storageItem = localStorageModule.get('auth_token');
console.log(storageItem); // Instance of LocalStorageItem

let localStorageKey = storageItem.getKey();
console.log(localStorageKey); // 'auth_token'
```

### setKey(key: string): LocalStorageItem
Sets the key of the local storage item.

### getValue(): any

Returns the value of the local storage item.
```javascript
let localStorageModule = phusion.getLocalStorageModule();

let storageItem = localStorageModule.get('auth_token');
console.log(storageItem); // Instance of LocalStorageItem

let localStorageValue = storageItem.getValue();
console.log(localStorageValue); // 'bb33f285255ebb9089d20aaa82b56eb4'
```

### setValue(value: any): LocalStorageItem

Sets the value of the local storage item.