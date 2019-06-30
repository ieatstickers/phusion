
/*--------------------
  Dependencies
--------------------*/

const { dest, src } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if')


/*--------------------
  Variables
--------------------*/

const env = process.env['ENV'];
const outputBuildDir = process.env['OUTPUT_BUILD_DIR'];
const projectRoot = process.env['PROJECT_ROOT_DIR'];

var jsFilesToConcat = [
  './dist/core/Config.js',
  './dist/core/Cookies.js',
  './dist/core/Event.js',
  './dist/core/Http.js',
  './dist/core/LocalStorage.js',
  './dist/core/Objects.js',
  './dist/core/SessionStorage.js',
  './dist/core/Strings.js',
  './dist/core/Time.js',
  './dist/core/UserAgent.js',
];

var jsConcatOutputFileName = env === 'prod' ? 'phusion.min.js' : 'phusion.js';
var jsConcatOutputDirectory = outputBuildDir + '/';


/*--------------------
  Task: jsUglify
--------------------*/

function jsConcat()
{
  return src(jsFilesToConcat)
    .pipe(concat(jsConcatOutputFileName))
    .pipe(gulpIf(env === 'prod', uglify()))
    .pipe(dest(jsConcatOutputDirectory));
}

exports.jsConcatTask = jsConcat;
