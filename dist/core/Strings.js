var Strings;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./exports/Core/Strings.ts":
/*!*********************************!*\
  !*** ./exports/Core/Strings.ts ***!
  \*********************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Strings_1 = __webpack_require__(/*! ../../src/Core/Strings/Strings */ "./src/Core/Strings/Strings.ts");
module.exports = Strings_1.Strings;


/***/ }),

/***/ "./src/Core/Strings/Strings.ts":
/*!*************************************!*\
  !*** ./src/Core/Strings/Strings.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Strings = void 0;
var Strings = /** @class */ (function () {
    function Strings() {
    }
    Strings.contains = function (haystack, needle) {
        return haystack.indexOf(needle) >= 0;
    };
    Strings.startsWith = function (string, prefix) {
        return string.indexOf(prefix) === 0;
    };
    Strings.endsWith = function (string, suffix) {
        return string.indexOf(suffix, string.length - suffix.length) >= 0;
    };
    Strings.random = function (length, blacklistedStrings) {
        if (length === void 0) { length = 10; }
        var string;
        while (!string || (blacklistedStrings && blacklistedStrings.length && blacklistedStrings.includes(string))) {
            string = this.generateRandomString(length, this.RANDOM_STRING_AVAILABLE_CHARS);
        }
        return string;
    };
    Strings.password = function (length) {
        return this.generateRandomString(length, this.PASSWORD_AVAILABLE_CHARS);
    };
    Strings.initialCaps = function (string) {
        var words = string.split(' ');
        return words.reduce(function (result, word, index) {
            result += word.charAt(0).toUpperCase() + word.slice(1);
            if (index < words.length - 1)
                result += ' ';
            return result;
        }, '');
    };
    Strings.generateRandomString = function (length, availableCharacters) {
        if (length === void 0) { length = 10; }
        if (availableCharacters === void 0) { availableCharacters = this.RANDOM_STRING_AVAILABLE_CHARS; }
        var result = '';
        var charactersLength = availableCharacters.length;
        for (var i = 0; i < length; i++) {
            result += availableCharacters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    Strings.RANDOM_STRING_AVAILABLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    Strings.PASSWORD_AVAILABLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-_.+!*\'(),,';
    return Strings;
}());
exports.Strings = Strings;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./exports/Core/Strings.ts");
/******/ 	Strings = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=Strings.map