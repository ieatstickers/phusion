
  
## UserAgent

The `UserAgent` class provides browser and operating system information as well as some helper methods e.g. `isChrome()`, `isMac()`, `isWindows()` etc.

### getBrowserName(): string

Returns the browser name e.g. `Chrome`.

```javascript
var browserName = UserAgent.getBrowserName();

console.log(browserName); // 'Chrome'
```

### getMajorBrowserVersion(): number
Returns the major browser version e.g. `72`

```javascript
var browserVersion = UserAgent.getMajorBrowserVersion();

console.log(browserVersion); // 72
```

### getOsName(): string
Returns the OS name e.g. `Mac OS X`

```javascript
var osName = UserAgent.getOsName();

console.log(osName); // 'Mac OS X'
```

### getOsVersion(): number
Returns the OS version e.g. `10.14`

```javascript
var osVersion = UserAgent.getOsVersion();

console.log(osVersion); // 10.14
```

### isChrome(): boolean
Returns true if current browser is Chrome.

```javascript
var isChrome = UserAgent.isChrome();

console.log(isChrome); // true
```

### isEdge(): boolean
Returns true if current browser is Microsoft Edge.

```javascript
var isEdge = UserAgent.isEdge();

console.log(isEdge); // false
```

### isFirefox(): boolean
Returns true if current browser is Mozilla Firefox.

```javascript
var isFirefox = UserAgent.isFirefox();

console.log(isFirefox); // false
```

### isOpera(): boolean
Returns true if current browser is Opera.

```javascript
var isOpera = UserAgent.isOpera();

console.log(isOpera); // false
```

### isIE(): boolean
Returns true if current browser is Internet Explorer.

```javascript
var isIE = UserAgent.isIE();

console.log(isIE); // false
```

### isMac(): boolean
Returns true if current OS is Mac OS.

```javascript
var isMac = UserAgent.isMac();

console.log(isMac); // true
```

### isMobile(): boolean
Returns true if current OS is iOS or Android.

```javascript
var isMobile = UserAgent.isMobile();

console.log(isMobile); // true
```

### isIos(): boolean
Returns true if current OS is iOS.

```javascript
var isIos = UserAgent.isIos();

console.log(isIos); // false
```

### isAndroid(): boolean
Returns true if current OS is Android.

```javascript
var isAndroid = UserAgent.isAndroid();

console.log(isAndroid); // false
```


### isWindows(): boolean
Returns true if current OS is Windows.

```javascript
var isWindows = UserAgent.isWindows();

console.log(isWindows); // false
```