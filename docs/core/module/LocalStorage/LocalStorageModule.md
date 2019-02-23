
  
## Local Storage Module

This module is a wrapper for the `window.localStorage` API with some additional features. Items set through the Local Storage Module are stored as a [`LocalStorageItem`](./LocalStorageItem.md) object that has a key, a value, a time stamp of when it was created and an optional expiry timestamp. 

### clear(): LocalStorageModule

Clears all items from local storage.

```javascript
var localStorageModule = phusion.getLocalStorageModule();
localStorageModule.clear();
```

### get(key: string): LocalStorageItem
Retrieves an item from local storage and returns an instance of [`LocalStorageItem`](./LocalStorageItem.md). If the item does not exist or has expired, `null` will be returned.

```javascript
var localStorageModule = phusion.getLocalStorageModule();

var storageItem = localStorageModule.get('auth_token');
console.log(storageItem); // Instance of LocalStorageItem

var authToken = storageItem.getValue();
console.log(authToken); //// bd2e932a03a19217ab5a1dfb5aa93340
```

### set(key: string, value: any, expiry: Moment | Date | string = null): LocalStorageModule

Sets an item in local storage with a timestamp of when it was created and an expiry (if one is provided). Expiry can be provided as an instance of `Moment` or `Date` or as a time string.

A time string supports weeks, days, hours, minutes and seconds. 

##### Example time strings:

1 week: ***"1w"***

3 days:   ***"3d"***

6 hours:   ***"6h"***

30 minutes:   ***"30m"***

10 seconds:   ***"10s"***

1 week and 3 days: ***"1w:3d"***

12 hours, 30 minutes and 20 seconds: ***"12h:30m:20s"***

```javascript
var localStorageModule = phusion.getLocalStorageModule();

// Set with no expiry
localStorageModule.set('auth_token', 'bb33f285255ebb9089d20aaa82b56eb4');

/*----- OR -----*/

// Set with expiry (Moment)
var momentExpiry = Moment();
// Set expiry time to one hour from now
momentExpiry.hours(momentExpiry.hours() + 1)
localStorageModule.set('auth_token', 'bb33f285255ebb9089d20aaa82b56eb4', momentExpiry);

/*----- OR -----*/

// Set with expiry (Date)
var dateExpiry = Date();
// Set expiry time to one hour from now
dateExpiry.setHours(dateExpiry.getHours() + 1)
localStorageModule.set('auth_token', 'bb33f285255ebb9089d20aaa82b56eb4', dateExpiry);

/*----- OR -----*/

// Set with expiry (time string)
var timeStringExpiry = "1h";
localStorageModule.set('auth_token', 'bb33f285255ebb9089d20aaa82b56eb4', timeStringExpiry);
```

### remove(key: string): LocalStorageModule

Removes item from local storage.

```javascript
var localStorageModule = phusion.getLocalStorageModule();
localStorageModule.remove('auth_token');
```