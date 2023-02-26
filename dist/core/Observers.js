var Observers;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./exports/Core/Observers.ts":
/*!***********************************!*\
  !*** ./exports/Core/Observers.ts ***!
  \***********************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Observers_1 = __webpack_require__(/*! ../../src/Core/Observers/Observers */ "./src/Core/Observers/Observers.ts");
module.exports = Observers_1.Observers;


/***/ }),

/***/ "./src/Core/Observers/Observers.ts":
/*!*****************************************!*\
  !*** ./src/Core/Observers/Observers.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Observers = void 0;
var Observers = /** @class */ (function () {
    function Observers() {
    }
    Observers.onResize = function (elements, callback) {
        // @ts-ignore
        var resizeObserver = new ResizeObserver(function (resizeObserverEntries) {
            for (var _i = 0, resizeObserverEntries_1 = resizeObserverEntries; _i < resizeObserverEntries_1.length; _i++) {
                var resizeObserverEntry = resizeObserverEntries_1[_i];
                callback({
                    target: resizeObserverEntry.target,
                    width: resizeObserverEntry.contentRect.width,
                    height: resizeObserverEntry.contentRect.height,
                    top: resizeObserverEntry.contentRect.top,
                    bottom: resizeObserverEntry.contentRect.bottom,
                    left: resizeObserverEntry.contentRect.left,
                    right: resizeObserverEntry.contentRect.right,
                    x: resizeObserverEntry.contentRect.x,
                    y: resizeObserverEntry.contentRect.y
                });
            }
        });
        var elementsArray = Array.isArray(elements) ? elements : [elements];
        for (var _i = 0, elementsArray_1 = elementsArray; _i < elementsArray_1.length; _i++) {
            var element = elementsArray_1[_i];
            resizeObserver.observe(element);
        }
        return function () {
            resizeObserver.disconnect();
        };
    };
    return Observers;
}());
exports.Observers = Observers;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./exports/Core/Observers.ts");
/******/ 	Observers = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=Observers.map