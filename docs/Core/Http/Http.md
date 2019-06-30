## Http  
  
The Http class exposes simple methods for making GET, PUT, POST and DELETE requests as well as providing a layer of caching (if enabled).


##### NOTE: Response Caching

With response caching enabled, responses from requests made through the Http class will automatically be cached in local storage. The next time the URL is requested through the Http class with the same http method, if there is an unexpired response already in local storage, it will return the value from local storage rather than making the request again.  

The default expiry time can be defined in the options object (defaults to 30 seconds). This default expiry time can be overridden when making an HTTP request by passing in an expiry.

The `defaultCacheExpiry` option must be in the format of a time string e.g. `5m`.

```javascript
// Enable response caching in the config and set the default cache expiry to 5 minutes
var responseCachingOptions = {
   defaultCacheExpiry: "5m"
};

Http.enableResponseCaching(responseCachingOptions);

// Make request to api
var promise = Http.get('https://api.my-project.com');

promise.then(function(httpResponse: HttpResponse) 
{
  // Promise is resolved with an HttpResponse which has now been cached for 5m
  console.log(httpResponse.fromCache); // false
  
  // If you now refresh the page to run this code again, you'll see that fromCache returns true the second time as it has a cached version to return.
  // Also, if you check out the network tab, you'll also notice no HTTP requests were made.
})
```

### get(url: string, data: Object = null, cacheExpiry: Moment | Date | string = null): Promise<HttpResponse>  

Returns a `Promise`. If the promise is resolved, an `HttpResponse` will be passed into the callback. If the promise is rejected, an `HttpError` will be passed in instead.

```javascript
var url = 'http://api.example.com/user';

// data passed into get() will be appended as a query string before the request is made
// e.g. http://api.example.com/user?getParamName=getParamValue
var data = {
  getParamName: "getParamValue"
};

var promise = Http.get(url, data);  

promise.then(function(httpResponse: HttpResponse) {
  console.log(httpResponse.data);
});

promise.catch(function(httpError: HttpError) {
  console.log(httpError.statusCode);
  console.log(httpError.message);
});
```

  
### post(url: string, data: Object = null, cacheExpiry: Moment | Date | string = null): Promise<HttpResponse>  

Returns a `Promise`. If the promise is resolved, an `HttpResponse` will be passed into the callback. If the promise is rejected, an `HttpError` will be passed in instead.


```javascript
var data = {
  email: "me@example.com",
  password: "password123"
};
var promise = Http.post('http://api.example.com/auth', data);  

promise.then(function(httpResponse: HttpResponse) {
  console.log(httpResponse.data);
});

promise.catch(function(httpError: HttpError) {
  console.log(httpError.statusCode);
  console.log(httpError.message);
});

```  
  
### put(url: string, data: Object = null, cacheExpiry: Moment | Date | string = null): Promise<HttpResponse>  

Returns a `Promise`. If the promise is resolved, an `HttpResponse` will be passed into the callback. If the promise is rejected, an `HttpError` will be passed in instead.

```javascript
var data = {
  email: "my.new.email@example.com"
};
var promise = Http.put('http://api.example.com/user', data);  

promise.then(function(httpResponse: HttpResponse) {
  console.log(httpResponse.data);
});

promise.catch(function(httpError: HttpError) {
  console.log(httpError.statusCode);
  console.log(httpError.message);
});
```

### delete(url: string, data: Object = null, cacheExpiry: Moment | Date | string = null): Promise<HttpResponse>  

Returns a `Promise`. If the promise is resolved, an `HttpResponse` will be passed into the callback. If the promise is rejected, an `HttpError` will be passed in instead.

```javascript
var promise = Http.delete('http://api.example.com/user/' + 10);  

promise.then(function(httpResponse: HttpResponse) {
  console.log(httpResponse.data);
});

promise.catch(function(httpError: HttpError) {
  console.log(httpError.statusCode);
  console.log(httpError.message);
});
```  
 
### makeRequest(method: string, url: string, data: Object = null, cacheExpiry: Moment.Moment | Date | string = null): Promise<HttpResponse>

Returns a `Promise`. If the promise is resolved, an `HttpResponse` will be passed into the callback. If the promise is rejected, an `HttpError` will be passed in instead.

```javascript
var promise = Http.makeRequest(
  'put', 
  'http://api.example.com/user',
  {
    email: "new.email@example.com"
  } 
);  

promise.then(function(httpResponse: HttpResponse) {
  console.log(httpResponse.data);
});

promise.catch(function(httpError: HttpError) {
  console.log(httpError.statusCode);
  console.log(httpError.message);
});
```

### onBeforeRequest(callbackFunction: Function)
Register a callback to run before every request. This can be used to make changes to the request before it's sent e.g. add headers. The function takes the `HttpRequest` as an argument and must return it at the end of the function.

```javascript
Http.onBeforeRequest(function(httpRequest: HttpRequest) {
  httpRequest.headers['X-Api-Key'] = 'my-api-key';
  return httpRequest;
});
```
### enableResponseCaching(responseCachingOptions: Object = null)

Enable response caching to use local storage as a response cache. To override any default options, pass a js object.

#### Available options:

**`defaultCacheExpiry`:** Unless an override is provided, when a request is made, this is the amount of time it will be cached in local storage for. **Default: 30s**


**`localStorageKey`:** This is the local storage key used to store cached responses. **Default: phusion_http_response_cache**
