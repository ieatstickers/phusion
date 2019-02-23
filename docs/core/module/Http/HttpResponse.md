## Http Response
  
The `HttpResponse` class represents a response and is returned when a request succeeds.
  
### getHttpRequest(): HttpRequest

Returns the request that received the response.

### getStatusCode(): number

Returns the status code.

### getStatusText(): string

Return the status text.

### getHeaders(): Object

Returns an object containing all headers organised by name.

### getData(): Object

Returns the response data.

### isFromCache(): boolean

When a response is returned from the cache without making a request, this will return true;

### getCacheExpiry(): Moment

If the response was returned from the cache, this will return a Moment object.
