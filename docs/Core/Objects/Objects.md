
## Objects  
  
 The `Objects` class provides utility functions for working with JavaScript objects.     

### getByKeyPath(keyPath: string, object: Object): any  
  
`getByKeyPath` allows you to parse the object for a specific key, regardless of how many levels deep it's nested.  
  
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


// Key path exists - will return a value
var myConfigValue = Objects.getByKeyPath('exampleConfigKey:nestedKey:secondNestedKey', appConfig);

// Key path does not exist - will return null
var nonExistentKeyPathValue = Objects.getByKeyPath('this:keypath:does:not:exist', appConfig);  
  
console.log(myConfigValue); // "This is an example config value!!"
console.log(nonExistentKeyPathValue); // null  
```


### merge(target: Object, ...sourceObjects: Array): Object  
  
Recursively merge as many javascript objects as you like. 
The first argument is the object you'd like all the other objects
merged into. The next argument is variadic and allows you to pass
in as many objects as you like to be merged in.

```javascript
var objectOne = {  
  exampleKeyOne: "Example object value"
};

var objectTwo = {  
  exampleKeyTwo: 123
};

var objectThree = {  
  exampleKeyThree: {
    anotherExample: true
  }
};


var mergedObject = Objects.merge({}, objectOne, objectTwo, objectThree);  
  
// { exampleKeyOne: "Example object value", exampleKeyTwo: 123, exampleKeyThree: { anotherExample: true } }
console.log(mergedObject); 
```