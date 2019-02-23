
  
## UserAgent

The `UserAgent` class provides browser and operating system information as well as some helper methods e.g. `isChrome()`, `isMac()`, `isWindows()` etc.

### getBrowserName(): string

Returns the browser name e.g. `Chrome`.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var browserName = userAgent.getBrowserName();

console.log(browserName); // 'Chrome'
```

### getMajorBrowserVersion(): number
Returns the major browser version e.g. `72`

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var browserVersion = userAgent.getMajorBrowserVersion();

console.log(browserVersion); // 72
```

### getOsName(): string
Returns the OS name e.g. `Mac OS X`

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var osName = userAgent.getOsName();

console.log(osName); // 'Mac OS X'
```

### getOsVersion(): number
Returns the OS version e.g. `10.14`

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var osVersion = userAgent.getOsVersion();

console.log(osVersion); // 10.14
```

### isChrome(): boolean
Returns true if current browser is Chrome.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var isChrome = userAgent.isChrome();

console.log(isChrome); // true
```

### isEdge(): boolean
Returns true if current browser is Microsoft Edge.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var isEdge = userAgent.isEdge();

console.log(isEdge); // false
```

### isFirefox(): boolean
Returns true if current browser is Mozilla Firefox.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var isFirefox = userAgent.isFirefox();

console.log(isFirefox); // false
```

### isOpera(): boolean
Returns true if current browser is Opera.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var isOpera = userAgent.isOpera();

console.log(isOpera); // false
```

### isIE(): boolean
Returns true if current browser is Internet Explorer.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var isIE = userAgent.isIE();

console.log(isIE); // false
```

### isMac(): boolean
Returns true if current OS is Mac OS.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var isMac = userAgent.isMac();

console.log(isMac); // true
```

### isMobile(): boolean
Returns true if current OS is iOS or Android.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var isMobile = userAgent.isMobile();

console.log(isMobile); // true
```

### isIos(): boolean
Returns true if current OS is iOS.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var isIos = userAgent.isIos();

console.log(isIos); // false
```

### isAndroid(): boolean
Returns true if current OS is Android.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var isAndroid = userAgent.isAndroid();

console.log(isAndroid); // false
```


### isWindows(): boolean
Returns true if current OS is Windows.

```javascript
var userAgent = phusion.getEnvironmentModule().getUserAgent();

var isWindows = userAgent.isWindows();

console.log(isWindows); // false
```