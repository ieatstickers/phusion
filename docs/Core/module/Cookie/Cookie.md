
  
## Cookie    

`Cookie` is a simple class used to represent a cookie.

```javascript
var cookieModule = phusion.getCookieModule();

cookieModule.set('myCookie', 'My cookie value');

var cookie = cookieModule.get('myCookie'); Cookies
```

### getKey(): string
Returns the key the cookie was set with.  

```javascript
var cookieKey = cookie.getKey();
console.log(cookieKey); // "myCookie"
```  
### getValue(): string

Returns the value of the cookie.

```javascript
var cookieValue = cookie.getValue();
console.log(cookieValue); // "My cookie value"
```  
  