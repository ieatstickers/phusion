## Session Storage Item  
  
An instance of `SessionStorageItem` contains the key and value of the item, as well as a timestamp of when it was created and an expiry (if provided).  
  
### getKey(): string  
Returns the key of the session storage item.

```javascript
let sessionStorageModule = phusion.getSessionStorageModule();  
  
let storageItem = sessionStorageModule.get('auth_token');  
console.log(storageItem); // Instance of SessionStorageItem  
  
let sessionStorageKey = storageItem.getKey();  
console.log(sessionStorageKey); // 'auth_token'  
```  
  
### getValue(): any  
  
Returns the value of the session storage item.  
```javascript
let sessionStorageModule = phusion.getSessionStorageModule();  
  
let storageItem = sessionStorageModule.get('auth_token');  
console.log(storageItem); // Instance of SessionStorageItem  
  
let sessionStorageValue = storageItem.getValue();  
console.log(sessionStorageValue); // 'bb33f285255ebb9089d20aaa82b56eb4'  
```
  
### getCreated(): Moment  
  
Returns the created date time as a `Moment` object.  
  
```javascript
let sessionStorageModule = phusion.getSessionStorageModule();

let storageItem = sessionStorageModule.get('auth_token');
console.log(storageItem); // Instance of SessionStorageItem  

let created = storageItem.getCreated();
console.log(created); // Instance of Moment  
```

### getExpiry(): Moment  
  
Returns the expiry date time as a `Moment` object.  

```javascript
let sessionStorageModule = phusion.getSessionStorageModule();  
  
let storageItem = sessionStorageModule.get('auth_token');  
console.log(storageItem); // Instance of SessionStorageItem  

let expiry = storageItem.getExpiry();  
console.log(expiry); // Instance of Moment (or null if no expiry is set)
```