/**
 * Dependencies
 */

var path = require('path');
var env = process.env.ENV ? process.env.ENV : 'dev';

/**
 * Config Options
 */
var phusionEntryPath = './exports/core/Phusion';
var configTaskPath = './exports/build/ConfigTask';
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
      Phusion: phusionEntryPath
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
    watch:        watch,
    watchOptions: {
      aggregateTimeout: 300
    },
    entry:        {
      ConfigTask: configTaskPath
    },
    devtool:      sourcemap,
    output:       {
      path:              path.resolve(__dirname, "dist/build"),
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
  }]
;
