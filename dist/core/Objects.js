var Objects =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./exports/Core/Objects.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./exports/Core/Objects.ts":
/*!*********************************!*\
  !*** ./exports/Core/Objects.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Objects_1 = __webpack_require__(/*! ../../src/Core/Objects/Objects */ "./src/Core/Objects/Objects.ts");
module.exports = Objects_1.Objects;


/***/ }),

/***/ "./src/Core/Arrays/Arrays.ts":
/*!***********************************!*\
  !*** ./src/Core/Arrays/Arrays.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Objects_1 = __webpack_require__(/*! ../Objects/Objects */ "./src/Core/Objects/Objects.ts");
var Arrays = /** @class */ (function () {
    function Arrays() {
    }
    Arrays.inArray = function (needle, haystack) {
        return Boolean(haystack.indexOf(needle) !== -1);
    };
    Arrays.clone = function (array) {
        if (!Array.isArray(array)) {
            throw new Error("Cannot clone array -  must be of type 'array'.");
        }
        var clone = [];
        for (var key in array) {
            var arrayItem = array[key];
            // If array item is an array
            if (Array.isArray(arrayItem)) {
                // Clone the array
                clone.push(this.clone(arrayItem));
            }
            // If value is an object
            else if (typeof arrayItem == 'object') {
                clone.push(Objects_1.Objects.clone(arrayItem));
            }
            else {
                clone.push(arrayItem);
            }
        }
        return clone;
    };
    return Arrays;
}());
exports.Arrays = Arrays;


/***/ }),

/***/ "./src/Core/Objects/Objects.ts":
/*!*************************************!*\
  !*** ./src/Core/Objects/Objects.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Arrays_1 = __webpack_require__(/*! ../Arrays/Arrays */ "./src/Core/Arrays/Arrays.ts");
var Objects = /** @class */ (function () {
    function Objects() {
    }
    Objects.getByKeyPath = function (keyPath, object, delimiter) {
        if (delimiter === void 0) { delimiter = ':'; }
        if (!object) {
            return null;
        }
        // Split path into array of keys
        var keysArray = keyPath.split(delimiter);
        // Get the total number of keys
        var keyCount = keysArray.length;
        var count = 1;
        // For each key
        for (var _i = 0, keysArray_1 = keysArray; _i < keysArray_1.length; _i++) {
            var key = keysArray_1[_i];
            // If key exists
            if (object.hasOwnProperty(key)) {
                // If this is the last key to be accessed
                if (count == keyCount) {
                    // Return it
                    return object[key];
                }
                // If the key doesn't exist
                if (!object[key]) {
                    return null;
                }
                // Adjust object pointer for next key iteration
                object = object[key];
                // Increment count
                count++;
            }
            else {
                return null;
            }
        }
    };
    ;
    Objects.setByKeyPath = function (keyPath, value, target) {
        var keys = keyPath.split(':');
        var sourceObject = this.setByPath(keys, value, {});
        // @ts-ignore
        return Object.assign(target, sourceObject);
    };
    Objects.setByPath = function (keys, value, object) {
        var key = keys.shift();
        if (typeof object[key] == 'undefined') {
            if (keys.length) {
                object[key] = this.setByPath(keys, value, {});
            }
            else {
                object[key] = value;
            }
        }
        return object;
    };
    Objects.merge = function (target) {
        var sourceObjects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sourceObjects[_i - 1] = arguments[_i];
        }
        // If no sources passed in, return target
        if (!sourceObjects.length) {
            return target;
        }
        // Get first source item
        var source = sourceObjects.shift();
        // Assign functions that need to be used inside "forEach" function below
        var merge = this.merge.bind(this);
        var isMergebleObject = (function (item) {
            return item !== null && typeof item === 'object' && !Array.isArray(item);
        }).bind(this);
        // If target and source are both mergeble
        if (isMergebleObject(target) && isMergebleObject(source)) {
            // For each object key in source object
            Object.keys(source).forEach(function (key) {
                // If value at current key is a mergeable object
                if (isMergebleObject(source[key])) {
                    // If key doesn't exist on target
                    if (!target[key]) {
                        // Set to empty object
                        target[key] = {};
                    }
                    // Deep merge target value and source value
                    merge(target[key], source[key]);
                }
                // Else, if value is not a mergable object
                else {
                    // Set value
                    target[key] = source[key];
                }
            });
        }
        return merge.apply(void 0, [target].concat(sourceObjects));
    };
    ;
    Objects.clone = function (object) {
        if (typeof object !== 'object') {
            throw new Error("Cannot clone object. Source object must be of type 'object'.");
        }
        return this.hydrate(Object.create(object), object);
    };
    Objects.hydrate = function (dest, source, mutators, excludeNullValues, excludeMethods) {
        if (mutators === void 0) { mutators = {}; }
        if (excludeNullValues === void 0) { excludeNullValues = false; }
        if (excludeMethods === void 0) { excludeMethods = true; }
        if (typeof dest !== 'object' || typeof source !== 'object') {
            throw new Error("Cannot hydrate object. Source and destination object must both be of type 'object'.");
        }
        for (var property in source) {
            var propertyValue = source[property];
            if (typeof propertyValue == "function" && excludeMethods)
                continue;
            if (source[property] == null) {
                if (excludeNullValues)
                    continue;
                dest[property] = null;
            }
            // If a mutator is present
            else if (mutators.hasOwnProperty(property) && typeof mutators[property] == 'function') {
                dest[property] = mutators[property](source[property]);
            }
            // If property value is an array
            else if (Array.isArray(propertyValue)) {
                // Clone array
                dest[property] = Arrays_1.Arrays.clone(propertyValue);
            }
            // If value is an object
            else if (typeof propertyValue == 'object') {
                dest[property] = this.clone(propertyValue);
            }
            else {
                dest[property] = propertyValue;
            }
        }
        return dest;
    };
    return Objects;
}());
exports.Objects = Objects;


/***/ })

/******/ });
//# sourceMappingURL=Objects.map