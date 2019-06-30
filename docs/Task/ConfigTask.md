
## Config Task  
  
 The `ConfigTask` recursively merges all `.yaml` files in a given directory and outputs the JSON result to a specified file.
 
 To run the task, instantiate the class, passing the required config as a constructor argument and call `.run()` 
 
```javascript
var ConfigTask = require('phusion/dist/task/ConfigTask');

var task = new ConfigTask(
  {
    configDirPath: __dirname + '/config/',
    outputFilePath: __dirname + '/cache/config.js',
    outputFormat: 'js', // Default
    variableName: 'config' // Default (only used if outputFormat is "js")
  }
);

task.run();
```

The output format controls how the JSON is formatted in the output file. The available options are as follows:

### Options

#### configDirPath (required)

Directory containing `.yaml` config files to be merged e.g. `"/Users/MyUser/code/my-project/config"`

#### outputFilePath (required)

File path to write merged JSON object to e.g. `"/Users/MyUser/code/my-project/config.json"` 

#### outputFormat

Set format of output JSON config.

Default: `json`

Available options:  

`js`
  

This option allows you to write your JSON config to a `.js` file as a variable declaration. You can then use a script tag to include this file on your page and the config object will be accessible in the variable name you provide in the task config under the `variableName` key.


Example file output (config.js):
```javascript
const config = {
  "example": {
    "exampleKey": "Test config value",
    "anotherExampleKey": "Another test config value"
  }
}
```

Example usage:
```html
<body>
  <h1>Example</h1>
  
  <script src="config.js"></script>
  <script src="node_modules/phusion/dist/core/Phusion.js"></script>
  
  <script>
    console.log(window.config); // { example: { exampleKey: "Test config value", anotherExampleKey: "Another test config value" } }
    const phusion = new Phusion(window.config);
    ...
  </script>
</body>

```
  
`node`

If you'd like to use your config in a NodeJS environment or you're using a module bundling tool like Webpack, you'll want to use this option. It will write your JSON config to a `.js` file as a module export. You can then use `require()` to import it and the config object will be accessible in the variable name you assign it to.

Example file output:
```javascript
module.exports = {
  "example": {
    "exampleKey": "Test config value",
    "anotherExampleKey": "Another test config value"
  }
}
```

Example usage:
```javascript
var applicationConfig = require('./config.js');

console.log(applicationConfig); // { example: { exampleKey: "Test config value", anotherExampleKey: "Another test config value" } }
```

`json`
  
 If you'd like the config file as a plain and simple JSON file, use this option. It will write the JSON string to the file as is without appending or prepending anything.
 
 ```json
 {
   "example": {
     "exampleKey": "Test config value",
     "anotherExampleKey": "Another test config value"
   }
 }
 ```
 
 #### variableName
 
 If the `js` option is set under the `outputFormat` key, this variable name is used in the JavaScript declaration.
 
 Default: `config`

 