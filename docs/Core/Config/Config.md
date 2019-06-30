
## Config  
  
 The `Config` class exposes your application config in a way that allows for easy searching by a given config path.    

### setConfigObject()

To set up the Config class, call the Config.setConfigObject() method, passing in your application config object.

```javascript
var configObject = {
  stripe: {
    apiKey: '7hfuyi583547y7bcy7bcutc'
  }
};

Config.setConfigObject(configObject);
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

Config.setConfigObject(appConfig);  
  
// Key path exists - will return a value
var myConfigValue = Config.getByPath('exampleConfigKey:nestedKey:secondNestedKey');

// Key path does not exist - will return null
var nonExistentKeyPathValue = Config.getByPath('this:keypath:does:not:exist');  
  
console.log(myConfigValue); // "This is an example config value!!"
console.log(nonExistentKeyPathValue); // null  
```

### toObject(): Object  
  
At any point, if you want to work with the raw JavaScript object behind the Config class instance, you can call the `toObject` method to return it.  
  
```javascript  
  
var configObject = Config.toObject();  
  
console.log(configObject); // { exampleConfigKey: { nestedKey: { secondNestedKey: "This is an example config value!!" } } }  
```