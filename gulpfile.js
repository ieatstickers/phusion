
/*--------------------
  Dependencies
--------------------*/

const { series, parallel } = require('gulp');

/*--------------------
  Set global vars
--------------------*/

// If there is no ENV set, default to dev
if (!process.env['ENV']) process.env['ENV'] = 'dev';
// Set project root directory path
process.env['PROJECT_ROOT_DIR'] = process.cwd();
// Set output build directory path
process.env['OUTPUT_BUILD_DIR'] = __dirname + '/dist';


/*--------------------
  Define tasks
--------------------*/

// Build tasks
// const { classmapTask, classmapWatchTask } = require('./gulp/phusion-classmap');
const { jsConcatTask } = require('./gulp/js-concat');

// Alias tasks
const buildTask = parallel(jsConcatTask);

const defaultTask = series(buildTask);


/*--------------------
  Export tasks
--------------------*/

// Build tasks
exports.jsConcat = jsConcatTask;            // Concatenate & uglify JavaScript files

// Alias tasks
exports.build = buildTask;                  // Run all build tasks
exports.default = defaultTask;              // Run all build tasks then watch for changes
