
## Phusion   

The `Phusion` class is the backbone of the library, with getter methods for lazy loading all available modules.

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

### getConfig(): `Config`

Alias for [`phusion.getConfigModule().getConfig();`](./module/Config/ConfigModule.md)

### getConfigModule(): `ConfigModule`

Returns an instance of the [`ConfigModule`](./module/Config/ConfigModule.md).

### getCookieModule(): `CookieModule`

Returns an instance of the [`CookieModule`](./module/Cookie/CookieModule.md).

### getEnvironmentModule(): `EnvironmentModule`

Returns an instance of the [`EnvironmentModule`](./module/Environment/EnvironmentModule.md).

### getEventModule(): `EventModule`

Returns an instance of the [`EventModule`](./module/Event/EventModule.md).

### getHttpModule(): `HttpModule`

Returns an instance of the [`HttpModule`](./module/Http/HttpModule.md).

### getLocalStorageModule(): `LocalStorageModule`

Returns an instance of the [`LocalStorageModule`](./module/LocalStorage/LocalStorageModule.md).

### getSessionStorageModule(): `SessionStorageModule`

Returns an instance of the [`SessionStorageModule`](./module/SessionStorage/SessionStorageModule.md).
