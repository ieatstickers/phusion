## Config Module    
 The config module provides a way to register a configuration object for your application and easily retrieve values at runtime. To register your config, simply pass a JavaScript object into the constructor of the Phusion class.    
    
```javascript
var appConfig = {  
  exampleConfigKey: {
    nestedKey: {    
      secondNestedKey: "This is an example config value!!"  
    } 
  }
};    

const phusion = new Phusion(appConfig); 
```

 This config object can then be parsed at runtime. For details, check out the `getByPath` method in the [`Config`](./Config.md) documentation.  
    
##### NOTE: Config Generation Task

Phusion includes a pre-built config generation task that will scan a directory for `.yaml` files, recursively merge them and write the resulting JSON to a file that can be pulled into your application. Maintaining configs in `.yaml` files can be much easier than having them all in one file, especially for larger projects. 

This task can also be plugged into a Gulp task to be automated as part of your regular build process and triggered by a watch task when any of the files change.

See [`ConfigTask`](../../../build/task/ConfigTask.md).
    
### getConfig(): Config
 `getConfig` returns an instance of the [`Config`](./Config.md) class. The [`Config`](./Config.md) class provides a wrapper on top of your registered config object to allow you to easily parse nested keys to reach a config value.    
  
```javascript
var config = phusion.getConfigModule().getConfig();  
console.log(config); // Instance of Config class  
```  
### getObjectValueByKeyPath(keyPath: string, object: Object): any  

If you need to use the `getByPath` method's parsing capablity but want to parse an object other than the registered config, you can use this method by passing the key path and the object you want to parse.
    
```javascript
 var myObject = {
  exampleKey: {
    secondExampleKey: "My example value"
  }
};

var configModule = phusion.getConfigModule();    
var value = configModule.getObjectValueByKeyPath('exampleKey:secondExampleKey', myObject);
console.log(value); // "My example value"  
```

### merge(...objectsToBeMerged): Object
 
The `merge` method is variadic, meaning you can pass in as many arguments as you like. By passing any number of JavaScript objects, these objects will be recursively merged by key. They are merged in the order they are passed in so keys declared in one object will override any values set in previous objects for the same key path. This method is used under the hood when a new config is registered, allowing default Phusion config settings to be overridden and merged with the application config.
    
```javascript
var defaultObject = {
  user: {
    setting: {
      stayLoggedIn: true,
      autoSync: false
    }
  }
};

 var overrideObject = {
  user: {
    setting: {
      autoSync: true
    }
  }
};
 
var configModule = phusion.getConfigModule();

var mergedObject = configModule.merge(defaultObject, overrideObject);
console.log(mergedObject); // { user: { setting: { stayLoggedIn: true, autoSync: true } } }
```