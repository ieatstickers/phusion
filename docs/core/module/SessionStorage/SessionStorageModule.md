
  
    
## Session Storage Module  
  
This module is a wrapper for the `window.sessionStorage` API with some added features. Items set through the Session Storage Module are stored as a `SessionStorageItem` object that has a key, a value, a time stamp of when it was created and an optional expiry timestamp.
  
### clear(): SessionStorageModule  
  
Clears all items from session storage.  
  
```javascript
let sessionStorageModule = phusion.getSessionStorageModule();  
sessionStorageModule.clear();
```
  
### get(key: string): SessionStorageItem  
Retrieves an item from session storage and returns an instance of [`SessionStorageItem`](./SessionStorageItem.md). If the item has expired, `null` will be returned.  
  
```javascript
let sessionStorageModule = phusion.getSessionStorageModule();  
  
let storageItem = sessionStorageModule.get('auth_token');
console.log(storageItem); // Instance of SessionStorageItem  
  
let authToken = storageItem.getValue();  
console.log(authToken); //// bd2e932a03a19217ab5a1dfb5aa93340  
```  
  
### set(key: string, value: any, expiry: Moment | Date | string = null): SessionStorageModule
  
Sets an item in session storage with a timestamp of when it was created and an expiry (if one is provided). Expiry can be provided as an instance of `Moment` or `Date` or as a time string.  
  
A time string supports weeks, days, hours, minutes and seconds.   
  
##### Example time strings:  
  
1 week: ***"1w"***  
3 days:   ***"3d"***  
6 hours:   ***"6h"***  
30 minutes:   ***"30m"***  
10 seconds:   ***"10s"***  
1 week, 3 days: ***"1w:3d"***  
12 hours, 30 minutes, 20 seconds: ***"12h:30m:20s"***  
  
```javascript
let sessionStorageModule = phusion.getSessionStorageModule();  
  
// Set with no expiry  
sessionStorageModule.set('auth_token', 'bb33f285255ebb9089d20aaa82b56eb4');  
  
/*----- OR -----*/  
  
// Set with expiry (Moment)  
let momentExpiry = Moment();// Set expiry time to one hour from now  
momentExpiry.hours(momentExpiry.hours() + 1)  
sessionStorageModule.set('auth_token', 'bb33f285255ebb9089d20aaa82b56eb4', momentExpiry);  
  
/*----- OR -----*/  
  
// Set with expiry (Date)  
let dateExpiry = Date();// Set expiry time to one hour from now  
dateExpiry.setHours(dateExpiry.getHours() + 1);  
sessionStorageModule.set('auth_token', 'bb33f285255ebb9089d20aaa82b56eb4', dateExpiry);  
  
/*----- OR -----*/  
  
// Set with expiry (time string)  
let timeStringExpiry = "1h";
sessionStorageModule.set('auth_token', 'bb33f285255ebb9089d20aaa82b56eb4', timeStringExpiry);  
```  
  
### remove(key: string): SessionStorageModule  
  
Removes item from session storage.  
  
```javascript
let sessionStorageModule = phusion.getSessionStorageModule();  
sessionStorageModule.remove('auth_token');  
```  