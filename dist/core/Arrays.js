var Arrays;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./exports/Core/Arrays.ts":
/*!********************************!*\
  !*** ./exports/Core/Arrays.ts ***!
  \********************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Arrays_1 = __webpack_require__(/*! ../../src/Core/Arrays/Arrays */ "./src/Core/Arrays/Arrays.ts");
module.exports = Arrays_1.Arrays;


/***/ }),

/***/ "./src/Core/Arrays/Arrays.ts":
/*!***********************************!*\
  !*** ./src/Core/Arrays/Arrays.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Arrays = void 0;
var Numbers_1 = __webpack_require__(/*! ../Numbers/Numbers */ "./src/Core/Numbers/Numbers.ts");
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
    Arrays.randomItem = function (array) {
        return array[Numbers_1.Numbers.random(0, array.length - 1)];
    };
    return Arrays;
}());
exports.Arrays = Arrays;


/***/ }),

/***/ "./src/Core/Numbers/Numbers.ts":
/*!*************************************!*\
  !*** ./src/Core/Numbers/Numbers.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Numbers = void 0;
var Numbers = /** @class */ (function () {
    function Numbers() {
    }
    Numbers.random = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 100; }
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return Numbers;
}());
exports.Numbers = Numbers;


/***/ }),

/***/ "./src/Core/Objects/Objects.ts":
/*!*************************************!*\
  !*** ./src/Core/Objects/Objects.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Objects = void 0;
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
        return this.setByPath(keyPath.split(':'), value, target);
    };
    Objects.setByPath = function (keys, value, object) {
        var key = keys.shift();
        if (keys.length) {
            object[key] = this.setByPath(keys, value, object[key] ? object[key] : {});
        }
        else {
            object[key] = value;
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
        return merge.apply(void 0, __spreadArray([target], sourceObjects, false));
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

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./exports/Core/Arrays.ts");
/******/ 	Arrays = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=Arrays.map