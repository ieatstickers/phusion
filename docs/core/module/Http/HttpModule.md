## Http Module  
  
The Http Module exposes simple methods for making GET, PUT, POST and DELETE requests as well as providing a layer of caching (if enabled).


##### NOTE: Response Caching

With response caching enabled, responses from requests made through the Http Module will automatically be cached in local storage. The next time the URL is requested through the HttpModule with the same http method, if there is an unexpired response already in local storage, it will return the value from local storage rather than making the request again.  

The default expiry time can be defined in the config (defaults to 30 seconds). This default expiry time can be overridden when making an HTTP request by passing in an expiry.

The `defaultCacheExpiry` option must be in the format of a time string e.g. `5m`.

```javascript
// Enable response caching in the config and set the default cache expiry to 5 minutes
var appConfig = {
  phusion: {
    module: {
      http: {
        responseCaching: {
          enabled: true,
          defaultCacheExpiry: '5m'
        }
      }
    }
  }
};

const phusion = new Phusion(appConfig);

// Make request to api
var promise = phusion.getHttpModule().get('https://api.my-project.com');

promise.then(function(httpResponse: HttpResponse) 
{
  // Promise is resolved with an HttpResponse which has now been cached for 5m
  var fromCache = httpResponse.isFromCache();
  console.log(fromCache); // false
  
  // If you now refresh the page to run this code again, you'll see that fromCache returns true the second time as it has a cached version to return.
  // Also, if you check out the network tab, you'll also notice no HTTP requests were made.
})
```

### get(url: string, data: Object = null, cacheExpiry: Moment | Date | string = null): Promise<HttpResponse>  

Returns a `Promise`. If the promise is resolved, an [`HttpResponse`](./HttpResponse.md) will be passed into the callback. If the promise is rejected, an [`HttpError`](./HttpError.md) will be passed in instead.

```javascript
var httpModule = phusion.getHttpModule();  

var url = 'http://api.example.com/user';

// data passed into get() will be appended as a query string before the request is made
// e.g. http://api.example.com/user?getParamName=getParamValue
var data = {
  getParamName: "getParamValue"
};

var promise = httpModule.get(url, data);  

promise.then(function(httpResponse: HttpResponse) {
  console.log(httpResponse.getData());
});

promise.catch(function(httpError: HttpError) {
  console.log(httpError.getCode());
  console.log(httpError.getMessage());
});
```

  
### post(url: string, data: Object = null, cacheExpiry: Moment | Date | string = null): Promise<HttpResponse>  

Returns a `Promise`. If the promise is resolved, an [`HttpResponse`](./HttpResponse.md) will be passed into the callback. If the promise is rejected, an [`HttpError`](./HttpError.md) will be passed in instead.


```javascript
var httpModule = phusion.getHttpModule();  
  
var data = {
  email: "me@example.com",
  password: "password123"
};
var promise = httpModule.post('http://api.example.com/auth', data);  

promise.then(function(httpResponse: HttpResponse) {
  console.log(httpResponse.getData());
});

promise.catch(function(httpError: HttpError) {
  console.log(httpError.getCode());
  console.log(httpError.getMessage());
});

```  
  
### put(url: string, data: Object = null, cacheExpiry: Moment | Date | string = null): Promise<HttpResponse>  

Returns a `Promise`. If the promise is resolved, an [`HttpResponse`](./HttpResponse.md) will be passed into the callback. If the promise is rejected, an [`HttpError`](./HttpError.md) will be passed in instead.

```javascript
var httpModule = phusion.getHttpModule();  
  
var data = {
  email: "my.new.email@example.com"
};
var promise = httpModule.put('http://api.example.com/user', data);  

promise.then(function(httpResponse: HttpResponse) {
  console.log(httpResponse.getData());
});

promise.catch(function(httpError: HttpError) {
  console.log(httpError.getCode());
  console.log(httpError.getMessage());
});
```

### delete(url: string, data: Object = null, cacheExpiry: Moment | Date | string = null): Promise<HttpResponse>  

Returns a `Promise`. If the promise is resolved, an [`HttpResponse`](./HttpResponse.md) will be passed into the callback. If the promise is rejected, an [`HttpError`](./HttpError.md) will be passed in instead.

```javascript
var httpModule = phusion.getHttpModule();  
  
var promise = httpModule.delete('http://api.example.com/user/' + 10);  

promise.then(function(httpResponse: HttpResponse) {
  console.log(httpResponse.getData());
});

promise.catch(function(httpError: HttpError) {
  console.log(httpError.getCode());
  console.log(httpError.getMessage());
});
```  
 
### makeHttpRequest(httpRequest: HttpRequest, cacheExpiry: Moment | string = null  ): Promise<HttpResponse>

Returns a `Promise`. If the promise is resolved, an [`HttpResponse`](./HttpResponse.md) will be passed into the callback. If the promise is rejected, an [`HttpError`](./HttpError.md) will be passed in instead.

```javascript
var httpModule = phusion.getHttpModule();  

var httpRequest = httpModule.createRequest(
  'http://api.example.com/user',  
  'put',  
  {
    email: "new.email@example.com"
  }
);
  
var promise = httpModule.makeHttpRequest(httpRequest);  

promise.then(function(httpResponse: HttpResponse) {
  console.log(httpResponse.getData());
});

promise.catch(function(httpError: HttpError) {
  console.log(httpError.getCode());
  console.log(httpError.getMessage());
});
```

### onBeforeRequest(callbackFunction: Function): HttpModule
Register a callback to run before every request. This can be used to make changes to the request before it's sent e.g. add headers. The function takes the [`HttpRequest`](./HttpRequest.md) as an argument and must return it at the end of the function.

```javascript
var httpModule = phusion.getHttpModule();

httpModule.onBeforeRequest(function(httpRequest: HttpRequest) {
  httpRequest.setHeader('X-Api-Key', 'my-api-key');
  return httpRequest;
});
```
  
### createHttpError(errorCode: number, errorMessage: string): HttpError

Returns an [`HttpError`](./HttpError.md) object.
  
### createHttpRequest(url: string, method: string, data: Object = null): HttpRequest

Returns an [`HttpRequest`](./HttpRequest.md) object that can be passed into `makeHttpRequest`.

### createHttpResponse(httpRequest: HttpRequest, statusCode: number, statusText: string, headers: Object, data: Object, fromCache: boolean, cacheExpiry: Moment): HttpResponse

Returns an [`HttpResponse`](./HttpResponse.md) object.

### setProvider(httpProvider: HttpProviderInterface): HttpModule
By default, Phusion uses the `AxiosHttpProvider` but this can be overridden using this method.
