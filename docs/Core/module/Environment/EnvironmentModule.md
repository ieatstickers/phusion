
  
## Environment Module

This module provides easy access to basic user agent information as well as tracking the environment you're running in e.g. dev, prod etc.

### getDomain(): string

Returns the current domain (without subdomain).

```javascript
var domain = phusion.getEnvironmentModule().getDomain();
console.log(domain); // "example.com"
```

### getEnv(): string
Searches the config for the value using key path of `phusion:module:environment:env` and returns the result. This will default to `dev`. To override this, simply add new value under the correct key path in your application config.

```javascript
var appConfig = {
  phusion: {
    module: {
      environment: {
        env: 'prod'
      }
    }
  }
};

var phusion = new Phusion(appConfig);

var env = phusion.getEnvironmentModule().getEnv();
console.log(env); // "prod"
```

### getUserAgent(): UserAgent

Returns an instance of the [`UserAgent`](./UserAgent.md) class.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();
console.log(userAgent); // Instance of UserAgent
```

### isDev(): boolean

Helper method that returns a boolean. If the result of `getEnv` is `dev`, it will return true.

```javascript
var isDev = phusion.getEnvironmentModule().isDev();
console.log(isDev); // false
``` 

### isProd(): boolean

Helper method that returns a boolean. If the result of `getEnv` is `prod`, it will return true.

```javascript
var isProd = phusion.getEnvironmentModule().isProd();
console.log(isProd); // true
```  

