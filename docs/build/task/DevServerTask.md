
## Dev Server Task  
  
 The `DevServerTask` adds a light wrapper around BrowserSync with some options set by default and some validation on required config keys.
 
```javascript
var DevServerTask = require('phusion/dist/build/DevServerTask');

var outputBuildDir = __dirname + '/public';

var task = new DevServerTask(
  {
    browserSyncConfig: {
      serveStatic: [ outputBuildDir ]
    }
  }
);

task.run();
```

### Options

#### browserSyncConfig (required)

A [`BrowserSync`](https://www.browsersync.io/docs/options) options object. 

The only required option is `serveStatic` which tells BrowserSync which directories to serve. 