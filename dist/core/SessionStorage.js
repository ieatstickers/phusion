var SessionStorage;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./exports/Core/SessionStorage.ts":
/*!****************************************!*\
  !*** ./exports/Core/SessionStorage.ts ***!
  \****************************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var SessionStorage_1 = __webpack_require__(/*! ../../src/Core/Storage/SessionStorage */ "./src/Core/Storage/SessionStorage.ts");
module.exports = SessionStorage_1.SessionStorage;


/***/ }),

/***/ "./src/Core/Storage/SessionStorage.ts":
/*!********************************************!*\
  !*** ./src/Core/Storage/SessionStorage.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionStorage = void 0;
var StorageApi_1 = __webpack_require__(/*! ./StorageApi */ "./src/Core/Storage/StorageApi.ts");
var SessionStorage = /** @class */ (function () {
    function SessionStorage() {
    }
    SessionStorage.clear = function () {
        return StorageApi_1.StorageApi.clear(window.sessionStorage);
    };
    SessionStorage.get = function (key) {
        return StorageApi_1.StorageApi.get(key, window.sessionStorage);
    };
    SessionStorage.remove = function (key) {
        return StorageApi_1.StorageApi.remove(key, window.sessionStorage);
    };
    SessionStorage.set = function (key, value) {
        return StorageApi_1.StorageApi.set(key, value, window.sessionStorage);
    };
    return SessionStorage;
}());
exports.SessionStorage = SessionStorage;


/***/ }),

/***/ "./src/Core/Storage/StorageApi.ts":
/*!****************************************!*\
  !*** ./src/Core/Storage/StorageApi.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageApi = void 0;
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 	var __webpack_exports__ = __webpack_require__("./exports/Core/SessionStorage.ts");
/******/ 	SessionStorage = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=SessionStorage.map