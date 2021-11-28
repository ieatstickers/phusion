/**
 * Dependencies
 */

var path = require('path');
var env = process.env.ENV ? process.env.ENV : 'dev';

/**
 * Config Options
 */
var configTaskPath = './exports/Task/ConfigTask';
var outputFileExt = (env === 'prod') ? '.min.js' : '.js';
var sourceMapOutputFileExt = '.map';
var mode = (env === 'prod') ? 'production' : 'development';
var sourcemap = (env === 'prod') ? undefined : 'source-map';

module.exports = [
  /**
   * Phusion
   */
  {
    mode:         mode,
    watch:        false,
    watchOptions: {
      aggregateTimeout: 300
    },
    entry:        {
      Arrays: './exports/Core/Arrays.ts',
      Config: './exports/Core/Config.ts',
      Cookies: './exports/Core/Cookies.ts',
      Event: './exports/Core/Event.ts',
      Http: './exports/Core/Http.ts',
      Numbers: './exports/Core/Numbers.ts',
      Objects: './exports/Core/Objects.ts',
      Promises: './exports/Core/Promises.ts',
      AsyncStorage: './exports/Core/AsyncStorage.ts',
      LocalStorage: './exports/Core/LocalStorage.ts',
      SessionStorage: './exports/Core/SessionStorage.ts',
      Strings: './exports/Core/Strings.ts',
      Time: './exports/Core/Time.ts',
      UserAgent: './exports/Core/UserAgent.ts'
    },
    devtool:      sourcemap,
    output:       {
      path:              path.resolve(__dirname, "dist/core"),
      filename:          '[name]' + outputFileExt,
      sourceMapFilename: '[name]' + sourceMapOutputFileExt,
      libraryTarget:     'var',
      library:           '[name]'
    },
    resolve:      {
      extensions: ['.js', '.ts']
    },
    module:       {
      rules: [
        {
          test:    /\.ts/,
          exclude: /node_modules\/(?!phusion|vue).*/,
          use:     ['ts-loader']
        }
      ]
    }
  },
  /**
   * ConfigTask
   */
  {
    mode:         mode,
    watch:        false,
    watchOptions: {
      aggregateTimeout: 300
    },
    entry:        {
      ConfigTask: configTaskPath
    },
    devtool:      sourcemap,
    output:       {
      path:              path.resolve(__dirname, "dist/task"),
      filename:          '[name]' + outputFileExt,
      sourceMapFilename: '[name]' + sourceMapOutputFileExt,
      libraryTarget:     'commonjs',
      library:           '[name]'
    },
    resolve:      {
      extensions: ['.js', '.ts']
    },
    target:       "node",
    module:       {
      rules: [
        {
          test:    /\.ts/,
          exclude: /node_modules\/(?!phusion|vue).*/,
          use:     ['ts-loader']
        }
      ]
    }
  }
];
