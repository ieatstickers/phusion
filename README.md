# Phusion

Phusion is a TypeScript library designed to help with building Javascript/TypeScript applications. As well as providing pre-built modules to handle making HTTP requests, caching responses, accessing browser storage and more, it can also act as a dependency injection container if you want to extend it and add your own modules.

### The Phusion Class

If you're using JavaScript, the simplest way to get started is to pull in Phusion using a script tag which exposes the Phusion class globally. All you need to do then is instantiate the class.

As Phusion is written in TypeScript, you can also just import the class and run it through your module bundler of choice e.g. Webpack.

#### JavaScript
```html
<body>

  <h1>Phusion Example</h1>	
  
  <!-- Pull in Phusion library -->
  <script src="node_modules/phusion/dist/core/Phusion.js"></script>
  <script>
	// Create new instance of Phusion
    const phusion = new Phusion();
  </script>
</body>
```

#### TypeScript

```javascript
import {Phusion} from 'phusion/src/core/Phusion';

const phusion = new Phusion();
```

## Documentation:

### Core Library

#### The Phusion Class  
- [Phusion](docs/core/Phusion.md)

#### Configuration 
- [ConfigModule](docs/core/module/Config/ConfigModule.md)
	- [Config](docs/core/module/Config/Config.md)    

#### Browser Storage
- [CookieModule](docs/core/module/Cookie/CookieModule.md)
	- [Cookie](docs/core/module/Cookie/Cookie.md)
- [LocalStorageModule](docs/core/module/LocalStorage/LocalStorageModule.md)
	- [LocalStorageItem](docs/core/module/LocalStorage/LocalStorageItem.md)
- [SessionStorageModule](docs/core/module/SessionStorage/SessionStorageModule.md)
	- [SessionStorageItem](docs/core/module/SessionStorage/SessionStorageItem.md)


#### Environment
- [EnvironmentModule](docs/core/module/Environment/EnvironmentModule.md)
	- [User Agent](docs/core/module/Environment/UserAgent.md)

#### Custom Events
- [EventModule](docs/core/module/Event/EventModule.md)

#### Making HTTP Requests
- [HttpModule](docs/core/module/Http/HttpModule.md)
	- [HttpRequest](docs/core/module/Http/HttpRequest.md)
	- [HttpResponse](docs/core/module/Http/HttpResponse.md)
	- [HttpError](docs/core/module/Http/HttpError.md)
	- [HttpProvider](docs/core/module/Http/HttpProvider.md)



### Build Tasks

- [ConfigTask](docs/build/task/ConfigTask.md)
- [DevServerTask](docs/build/task/DevServerTask.md)


