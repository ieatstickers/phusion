var AsyncStorage =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./exports/Core/AsyncStorage.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./exports/Core/AsyncStorage.ts":
/*!**************************************!*\
  !*** ./exports/Core/AsyncStorage.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AsyncStorage_1 = __webpack_require__(/*! ../../src/Core/Storage/AsyncStorage */ "./src/Core/Storage/AsyncStorage.ts");
module.exports = AsyncStorage_1.AsyncStorage;


/***/ }),

/***/ "./node_modules/@react-native-async-storage/async-storage/lib/module/AsyncStorage.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@react-native-async-storage/async-storage/lib/module/AsyncStorage.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AsyncStorage; });
/* harmony import */ var merge_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! merge-options */ "./node_modules/merge-options/index.js");
/* harmony import */ var merge_options__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(merge_options__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

const merge = merge_options__WEBPACK_IMPORTED_MODULE_0___default.a.bind({
  concatArrays: true,
  ignoreUndefined: true
});

const mergeLocalStorageItem = (key, value) => {
  const oldValue = window.localStorage.getItem(key);
  const oldObject = JSON.parse(oldValue);
  const newObject = JSON.parse(value);
  const nextValue = JSON.stringify(merge(oldObject, newObject));
  window.localStorage.setItem(key, nextValue);
};

const createPromise = (getValue, callback) => {
  return new Promise((resolve, reject) => {
    try {
      const value = getValue();

      if (callback) {
        callback(null, value);
      }

      resolve(value);
    } catch (err) {
      if (callback) {
        callback(err);
      }

      reject(err);
    }
  });
};

const createPromiseAll = (promises, callback, processResult) => {
  return Promise.all(promises).then(result => {
    const value = processResult ? processResult(result) : null;
    callback && callback(null, value);
    return Promise.resolve(value);
  }, errors => {
    callback && callback(errors);
    return Promise.reject(errors);
  });
};

class AsyncStorage {
  /**
   * Fetches `key` value.
   */
  static getItem(key, callback) {
    return createPromise(() => {
      return window.localStorage.getItem(key);
    }, callback);
  }
  /**
   * Sets `value` for `key`.
   */


  static setItem(key, value, callback) {
    return createPromise(() => {
      window.localStorage.setItem(key, value);
    }, callback);
  }
  /**
   * Removes a `key`
   */


  static removeItem(key, callback) {
    return createPromise(() => {
      return window.localStorage.removeItem(key);
    }, callback);
  }
  /**
   * Merges existing value with input value, assuming they are stringified JSON.
   */


  static mergeItem(key, value, callback) {
    return createPromise(() => {
      mergeLocalStorageItem(key, value);
    }, callback);
  }
  /**
   * Erases *all* AsyncStorage for the domain.
   */


  static clear(callback) {
    return createPromise(() => {
      window.localStorage.clear();
    }, callback);
  }
  /**
   * Gets *all* keys known to the app, for all callers, libraries, etc.
   */


  static getAllKeys(callback) {
    return createPromise(() => {
      const numberOfKeys = window.localStorage.length;
      const keys = [];

      for (let i = 0; i < numberOfKeys; i += 1) {
        const key = window.localStorage.key(i);
        keys.push(key);
      }

      return keys;
    }, callback);
  }
  /**
   * (stub) Flushes any pending requests using a single batch call to get the data.
   */


  static flushGetRequests() {}
  /**
   * multiGet resolves to an array of key-value pair arrays that matches the
   * input format of multiSet.
   *
   *   multiGet(['k1', 'k2']) -> [['k1', 'val1'], ['k2', 'val2']]
   */


  static multiGet(keys, callback) {
    const promises = keys.map(key => AsyncStorage.getItem(key));

    const processResult = result => result.map((value, i) => [keys[i], value]);

    return createPromiseAll(promises, callback, processResult);
  }
  /**
   * Takes an array of key-value array pairs.
   *   multiSet([['k1', 'val1'], ['k2', 'val2']])
   */


  static multiSet(keyValuePairs, callback) {
    const promises = keyValuePairs.map(item => AsyncStorage.setItem(item[0], item[1]));
    return createPromiseAll(promises, callback);
  }
  /**
   * Delete all the keys in the `keys` array.
   */


  static multiRemove(keys, callback) {
    const promises = keys.map(key => AsyncStorage.removeItem(key));
    return createPromiseAll(promises, callback);
  }
  /**
   * Takes an array of key-value array pairs and merges them with existing
   * values, assuming they are stringified JSON.
   *
   *   multiMerge([['k1', 'val1'], ['k2', 'val2']])
   */


  static multiMerge(keyValuePairs, callback) {
    const promises = keyValuePairs.map(item => AsyncStorage.mergeItem(item[0], item[1]));
    return createPromiseAll(promises, callback);
  }

}
//# sourceMappingURL=AsyncStorage.js.map

/***/ }),

/***/ "./node_modules/@react-native-async-storage/async-storage/lib/module/hooks.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@react-native-async-storage/async-storage/lib/module/hooks.js ***!
  \************************************************************************************/
/*! exports provided: useAsyncStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAsyncStorage", function() { return useAsyncStorage; });
/* harmony import */ var _AsyncStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncStorage */ "./node_modules/@react-native-async-storage/async-storage/lib/module/AsyncStorage.js");
/**
 * @format
 * 
 */

function useAsyncStorage(key) {
  return {
    getItem: (...args) => _AsyncStorage__WEBPACK_IMPORTED_MODULE_0__["default"].getItem(key, ...args),
    setItem: (...args) => _AsyncStorage__WEBPACK_IMPORTED_MODULE_0__["default"].setItem(key, ...args),
    mergeItem: (...args) => _AsyncStorage__WEBPACK_IMPORTED_MODULE_0__["default"].mergeItem(key, ...args),
    removeItem: (...args) => _AsyncStorage__WEBPACK_IMPORTED_MODULE_0__["default"].removeItem(key, ...args)
  };
}
//# sourceMappingURL=hooks.js.map

/***/ }),

/***/ "./node_modules/@react-native-async-storage/async-storage/lib/module/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@react-native-async-storage/async-storage/lib/module/index.js ***!
  \************************************************************************************/
/*! exports provided: default, useAsyncStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AsyncStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncStorage */ "./node_modules/@react-native-async-storage/async-storage/lib/module/AsyncStorage.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hooks */ "./node_modules/@react-native-async-storage/async-storage/lib/module/hooks.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useAsyncStorage", function() { return _hooks__WEBPACK_IMPORTED_MODULE_1__["useAsyncStorage"]; });

/**
 * @format
 * 
 */

/* harmony default export */ __webpack_exports__["default"] = (_AsyncStorage__WEBPACK_IMPORTED_MODULE_0__["default"]);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/is-plain-obj/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-plain-obj/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = value => {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
};


/***/ }),

/***/ "./node_modules/merge-options/index.js":
/*!*********************************************!*\
  !*** ./node_modules/merge-options/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isOptionObject = __webpack_require__(/*! is-plain-obj */ "./node_modules/is-plain-obj/index.js");

const {hasOwnProperty} = Object.prototype;
const {propertyIsEnumerable} = Object;
const defineProperty = (object, name, value) => Object.defineProperty(object, name, {
	value,
	writable: true,
	enumerable: true,
	configurable: true
});

const globalThis = this;
const defaultMergeOptions = {
	concatArrays: false,
	ignoreUndefined: false
};

const getEnumerableOwnPropertyKeys = value => {
	const keys = [];

	for (const key in value) {
		if (hasOwnProperty.call(value, key)) {
			keys.push(key);
		}
	}

	/* istanbul ignore else  */
	if (Object.getOwnPropertySymbols) {
		const symbols = Object.getOwnPropertySymbols(value);

		for (const symbol of symbols) {
			if (propertyIsEnumerable.call(value, symbol)) {
				keys.push(symbol);
			}
		}
	}

	return keys;
};

function clone(value) {
	if (Array.isArray(value)) {
		return cloneArray(value);
	}

	if (isOptionObject(value)) {
		return cloneOptionObject(value);
	}

	return value;
}

function cloneArray(array) {
	const result = array.slice(0, 0);

	getEnumerableOwnPropertyKeys(array).forEach(key => {
		defineProperty(result, key, clone(array[key]));
	});

	return result;
}

function cloneOptionObject(object) {
	const result = Object.getPrototypeOf(object) === null ? Object.create(null) : {};

	getEnumerableOwnPropertyKeys(object).forEach(key => {
		defineProperty(result, key, clone(object[key]));
	});

	return result;
}

/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {string[]} keys keys to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 */
const mergeKeys = (merged, source, keys, config) => {
	keys.forEach(key => {
		if (typeof source[key] === 'undefined' && config.ignoreUndefined) {
			return;
		}

		// Do not recurse into prototype chain of merged
		if (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {
			defineProperty(merged, key, merge(merged[key], source[key], config));
		} else {
			defineProperty(merged, key, clone(source[key]));
		}
	});

	return merged;
};

/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 *
 * see [Array.prototype.concat ( ...arguments )](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat)
 */
const concatArrays = (merged, source, config) => {
	let result = merged.slice(0, 0);
	let resultIndex = 0;

	[merged, source].forEach(array => {
		const indices = [];

		// `result.concat(array)` with cloning
		for (let k = 0; k < array.length; k++) {
			if (!hasOwnProperty.call(array, k)) {
				continue;
			}

			indices.push(String(k));

			if (array === merged) {
				// Already cloned
				defineProperty(result, resultIndex++, array[k]);
			} else {
				defineProperty(result, resultIndex++, clone(array[k]));
			}
		}

		// Merge non-index keys
		result = mergeKeys(result, array, getEnumerableOwnPropertyKeys(array).filter(key => !indices.includes(key)), config);
	});

	return result;
};

/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 */
function merge(merged, source, config) {
	if (config.concatArrays && Array.isArray(merged) && Array.isArray(source)) {
		return concatArrays(merged, source, config);
	}

	if (!isOptionObject(source) || !isOptionObject(merged)) {
		return clone(source);
	}

	return mergeKeys(merged, source, getEnumerableOwnPropertyKeys(source), config);
}

module.exports = function (...options) {
	const config = merge(clone(defaultMergeOptions), (this !== globalThis && this) || {}, defaultMergeOptions);
	let merged = {_: {}};

	for (const option of options) {
		if (option === undefined) {
			continue;
		}

		if (!isOptionObject(option)) {
			throw new TypeError('`' + option + '` is not an Option Object');
		}

		merged = merge(merged, {_: option}, config);
	}

	return merged._;
};


/***/ }),

/***/ "./src/Core/Storage/AsyncStorage.ts":
/*!******************************************!*\
  !*** ./src/Core/Storage/AsyncStorage.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorage_1 = __webpack_require__(/*! ./LocalStorage */ "./src/Core/Storage/LocalStorage.ts");
var async_storage_1 = __importDefault(__webpack_require__(/*! @react-native-async-storage/async-storage */ "./node_modules/@react-native-async-storage/async-storage/lib/module/index.js"));
var AsyncStorage = /** @class */ (function () {
    function AsyncStorage() {
    }
    AsyncStorage.clear = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isWeb()) {
                LocalStorage_1.LocalStorage.clear();
                return resolve(true);
            }
            async_storage_1.default
                .clear()
                .then(function () {
                resolve(true);
            })
                .catch(reject);
        });
    };
    AsyncStorage.get = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isWeb()) {
                return resolve(LocalStorage_1.LocalStorage.get(key));
            }
            return async_storage_1.default
                .getItem(key)
                .then(function (value) {
                value = typeof value === 'undefined' ? null : value;
                if (typeof value === 'string') {
                    try {
                        value = JSON.parse(value);
                    }
                    catch (e) { }
                }
                return resolve(value);
            })
                .catch(reject);
        });
    };
    AsyncStorage.remove = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isWeb()) {
                LocalStorage_1.LocalStorage.remove(key);
                return resolve(true);
            }
            async_storage_1.default
                .removeItem(key)
                .then(function () {
                resolve(true);
            })
                .catch(reject);
        });
    };
    AsyncStorage.set = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isWeb()) {
                LocalStorage_1.LocalStorage.set(key, value);
                return resolve(true);
            }
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            async_storage_1.default
                .setItem(key, value)
                .then(function () {
                resolve(true);
            })
                .catch(reject);
        });
    };
    AsyncStorage.isWeb = function () {
        return Boolean(typeof window !== 'undefined');
    };
    return AsyncStorage;
}());
exports.AsyncStorage = AsyncStorage;


/***/ }),

/***/ "./src/Core/Storage/LocalStorage.ts":
/*!******************************************!*\
  !*** ./src/Core/Storage/LocalStorage.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StorageApi_1 = __webpack_require__(/*! ./StorageApi */ "./src/Core/Storage/StorageApi.ts");
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.clear = function () {
        return StorageApi_1.StorageApi.clear(window.localStorage);
    };
    LocalStorage.get = function (key) {
        return StorageApi_1.StorageApi.get(key, window.localStorage);
    };
    LocalStorage.remove = function (key) {
        return StorageApi_1.StorageApi.remove(key, window.localStorage);
    };
    LocalStorage.set = function (key, value) {
        return StorageApi_1.StorageApi.set(key, value, window.localStorage);
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;


/***/ }),

/***/ "./src/Core/Storage/StorageApi.ts":
/*!****************************************!*\
  !*** ./src/Core/Storage/StorageApi.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StorageApi = /** @class */ (function () {
    function StorageApi() {
    }
    StorageApi.clear = function (storageProvider) {
        storageProvider.clear();
        return this;
    };
    StorageApi.get = function (key, storageProvider) {
        var storageItemRawValue = storageProvider.getItem(key);
        if (storageItemRawValue === null || storageItemRawValue === undefined) {
            return null;
        }
        var storageValue = storageItemRawValue;
        try {
            storageValue = JSON.parse(storageItemRawValue);
        }
        catch (exception) { }
        if (typeof storageValue === 'object'
            && storageValue.key !== undefined
            && storageValue.value !== undefined
            && storageValue.created !== undefined
            && storageValue.expiry !== undefined) {
            return storageValue.value;
        }
        return storageValue;
    };
    StorageApi.remove = function (key, storageProvider) {
        storageProvider.removeItem(key);
        return this;
    };
    StorageApi.set = function (key, value, storageProvider) {
        var cacheValue = typeof value === 'object' ? JSON.stringify(value) : value;
        storageProvider.setItem(key, cacheValue);
        return this;
    };
    return StorageApi;
}());
exports.StorageApi = StorageApi;


/***/ })

/******/ });
//# sourceMappingURL=AsyncStorage.map