
## Config  
  
 The `Config` class exposes the registered application config in a way that allows for easy searching by a given config path.    

```javascript
var config = phusion.getConfigModule().getConfig();
```
There is also a method available directly on the [`Phusion`](../../Phusion.md) class called `getConfig` which is an alias for `phusion.getConfigModule().getConfig()`.
```javascript
var config = phusion.getConfig();
```
  
  
### getByPath(keyPath: string): any  
  
`getByPath` allows you to parse the config object for a specific key, regardless of how many levels deep it's nested.  
  
The example below shows an example config object, with a  value nested 3 levels deep. To access that value, we would need to pass in each of the config keys we want to access, delimited by a `:`, which in this case would be `'exampleConfigKey:nestedKey:secondNestedKey'`.  
  
The object will be parsed one key at a time until it reaches the value stored at that key path. If any of the keys in the path does not exist, `null` will be returned by default.
  
```javascript
var appConfig = {  
  exampleConfigKey: {
    nestedKey: {    
      secondNestedKey: "This is an example config value!!"  
    } 
  }
};    

const phusion = new Phusion(appConfig); 

var config = phusion.getConfigModule().getConfig();  
  
// Key path exists - will return a value
var myConfigValue = config.getByPath('exampleConfigKey:nestedKey:secondNestedKey');

// Key path does not exist - will return null
var nonExistentKeyPathValue = config.getByPath('this:keypath:does:not:exist');  
  
console.log(myConfigValue); // "This is an example config value!!"
console.log(nonExistentKeyPathValue); // null  
```

If the value at the given key path is an object, a new instance of the `Config` class will be returned representing the new object, so you can continue parsing keys from there.
  
```javascript
var config = phusion.getConfigModule().getConfig();  

var newConfig = config.getByPath('exampleConfigKey');  
console.log(newConfig) // New instance of Config class representing value found in 'exampleConfigKey'

var configValue = newConfig.getByPath('nestedKey:secondNestedKey');  
console.log(configValue); // This is an example config value!!  
```

### toObject(): Object  
  
At any point, if you want to work with the raw JavaScript object behind the Config class instance, you can call the `toObject` method to return it.  
  
```javascript
var config = phusion.getConfigModule().getConfig();  
  
var configObject = config.toObject();  
  
console.log(configObject); // { exampleConfigKey: { nestedKey: { secondNestedKey: "This is an example config value!!" } } }  
```