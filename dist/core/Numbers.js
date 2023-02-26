var Numbers;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./exports/Core/Numbers.ts":
/*!*********************************!*\
  !*** ./exports/Core/Numbers.ts ***!
  \*********************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Numbers_1 = __webpack_require__(/*! ../../src/Core/Numbers/Numbers */ "./src/Core/Numbers/Numbers.ts");
module.exports = Numbers_1.Numbers;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./exports/Core/Numbers.ts");
/******/ 	Numbers = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=Numbers.map