
/**
 * Dependencies
 */

var path = require('path');
var env = process.env.ENV ? process.env.ENV : 'dev';

/**
 * Config Options
 */
var phusionEntryPath = './exports/core/Phusion';
var outputFileExt = (env === 'prod') ? '.min.js' : '.js';
var sourceMapOutputFileExt = '.map';
var mode = (env === 'prod') ? 'production' : 'development';
var sourcemap = (env === 'prod') ? undefined : 'source-map';

module.exports = [
  /**
   * Phusion
   */
  {
    mode: mode,
    watch: false,
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
      libraryTarget: 'var',
      library: '[name]'
    },
    resolve:      {
      extensions: ['.js', '.ts']
    },
    module:       {
      rules: [
        {
          test:    /\.ts/,
          exclude: /node_modules\/(?!phusion|vue).*/,
          use: ['ts-loader']
        }
      ]
    }
  }]
;
