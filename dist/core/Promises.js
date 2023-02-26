var Promises;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./exports/Core/Promises.ts":
/*!**********************************!*\
  !*** ./exports/Core/Promises.ts ***!
  \**********************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Promises_1 = __webpack_require__(/*! ../../src/Core/Promises/Promises */ "./src/Core/Promises/Promises.ts");
module.exports = Promises_1.Promises;


/***/ }),

/***/ "./src/Core/Promises/Promises.ts":
/*!***************************************!*\
  !*** ./src/Core/Promises/Promises.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Promises = void 0;
var Promises = /** @class */ (function () {
    function Promises() {
    }
    Promises.all = function (promises) {
        return new Promise(function (resolve, reject) {
            var promiseArray = [];
            var keyMap = {};
            var currentIndex = 0;
            // For each key
            for (var _i = 0, _a = Object.keys(promises); _i < _a.length; _i++) {
                var key = _a[_i];
                // Add promise to array
                promiseArray.push(promises[key]);
                // Add key to keyMap
                keyMap[currentIndex] = key;
                // Increment current index
                ++currentIndex;
            }
            Promise
                .all(promiseArray)
                .then(function (responses) {
                var responsesByKey = {};
                // For each response
                for (var index in responses) {
                    // Find key
                    // Set response on responsesByKey
                    responsesByKey[keyMap[index]] = responses[index];
                }
                // Resolve
                return resolve(responsesByKey);
            })
                .catch(reject);
        });
    };
    return Promises;
}());
exports.Promises = Promises;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./exports/Core/Promises.ts");
/******/ 	Promises = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=Promises.map