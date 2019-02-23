## Http Request
  
The `HttpRequest` object represents a request by exposing getters and setters for the URL, the request method (GET, POST etc) and request data. 
  
### getUrl(): string

Returns the URL as a string (without parameters attached as a query string).

### getMethod(): string

Returns the request method e.g. GET, PUT, POST, DELETE.

### getHeaders(): Object

Returns an object of headers organised by key.

```javascript
httpRequest.setHeader('Custom-Header', 'Header value');
var headers = httpRequest.getHeaders();
var headerValue = headers['Custom-Header'];
console.log(headerValue); // 'Header value'
```

### setHeader(name: string, value: string): HttpRequest

Sets a header on the request.

### getData(): Object

Returns the request data.  