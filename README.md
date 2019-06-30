# Phusion

Phusion is a TypeScript library designed to help with building Javascript/TypeScript applications. It provides a number of utility classes to handle making HTTP requests, caching responses, accessing browser storage and more.

#### JavaScript
```html
<body>

  <h1>Phusion Example</h1>	
  
  <!-- Pull in Phusion library (includes all classes) -->
  <script src="node_modules/phusion/dist/core/phusion.js"></script>
  <!-- Or pull in just the classes you need -->
  <script src="node_modules/phusion/dist/core/Config.js"></script>
  <script src="node_modules/phusion/dist/core/Http.js"></script>
  <script src="node_modules/phusion/dist/core/LocalStorage.js"></script>
  
  <script>
    // Start using Phusion classes
    var storageItem = LocalStorage.get('myKey');
  </script>
</body>
```

#### TypeScript

If you're using TypeScript, just import the classes you want to use

```javascript
import {LocalStorage} from 'phusion/src/Core/Storage/LocalStorage';

let storageItem = LocalStorage.get('myKey');
```

## Documentation:

### Core Library

- [Config](docs/Core/Config/Config.md)
- [Cookies](docs/Core/Cookies/Cookies.md)    
- [Event](docs/Core/Event/Event.md)
- [Http](docs/Core/Http/Http.md)
- [Objects](docs/Core/Objects/Objects.md)
- [LocalStorage](docs/Core/Storage/LocalStorage.md)
- [SessionStorage](docs/Core/Storage/SessionStorage.md)
- [Strings](docs/Core/Strings/Strings.md)
- [Time](docs/Core/Time/Time.md)
- [UserAgent](docs/Core/UserAgent/UserAgent.md)

### Tasks

- [ConfigTask](docs/Task/ConfigTask.md)
- [DevServerTask](docs/Task/DevServerTask.md)
