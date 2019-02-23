
  
## Cookie Module    
The `document.cookie` API exposed by browsers isn't the nicest to work with as it generally requires manual parsing of the cookie string. The Cookie Module wraps this up, exposing nice clean methods to get and set cookies, including a simple way to set an expiry.

```javascript
var cookieModule = phusion.getCookieModule();
```    
### get(key: string): Cookie

`get` takes the cookie's key as an argument and, if the cookie exists, will return an instance of the [`Cookie`](./Cookie.md) class. Otherwise, `null` will be returned by default.
  
```javascript
var cookieModule = phusion.getCookieModule();

var cookie = phusion.getCookieModule().get('myCookie');
console.log(config); // Instance of Cookie class

var nonExistentCookie = phusion.getCookieModule().get('nonExistentCookie');
console.log(nonExistentCookie); // null
```

### getAll(): Object
 
The `getAll` method returns a JavaScript object containing an instance of the  [`Cookie`](./Cookie.md) class for each cookie found on the current domain. They are organised on this object by key for easy access if needed.

```javascript
var allCookies = cookieModule.getAll();

var myCookie = allCookies['myCookie'];

console.log(myCookie); // Instance of Cookie class
```


### set(key:string, value: string, expiry: Moment | Date | string = null, domain: string = null, path: string = null): any   
The `set` method does exactly what it says on the tin - it takes a cookie key and value and sets it. You can also pass the domain you want to set the cookie on and a path.
    
```javascript
// Set cookie with no expiry    
cookieModule.set('myCookie', 'Some cookie value');


/*----- OR -----*/


// Set cookie with expiry (using Moment object)
var cookieExpiry = Moment();
// Set date to 24 hours from now
cookieExpiry.days(cookieExpiry.days() + 1);
cookieModule.set('myCookie', 'Some cookie value', cookieExpiry);


/*----- OR -----*/


// Set cookie with expiry (using Date object)
var cookieExpiry = new Date();
// Set date to 24 hours from now
cookieExpiry.setDays(cookieExpiry.getDays() + 1);
cookieModule.set('myCookie', 'Some cookie value', cookieExpiry);


/*----- OR -----*/


// Set cookie with expiry (using time string)
// Time string supports weeks (w), days (d), hours (h), minutes (m) and seconds (s) 
// and can be used in any combination delimited by a :
// e.g. "1w:6h" or "30m:20s" or "3w:10d:20h:40m:10s"

cookieModule.set('myCookie', 'Some cookie value', '24h');
```