var Event;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./exports/Core/Event.ts":
/*!*******************************!*\
  !*** ./exports/Core/Event.ts ***!
  \*******************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Event_1 = __webpack_require__(/*! ../../src/Core/Event/Event */ "./src/Core/Event/Event.ts");
module.exports = Event_1.Event;


/***/ }),

/***/ "./src/Core/Event/Event.ts":
/*!*********************************!*\
  !*** ./src/Core/Event/Event.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event() {
    }
    Event.dispatch = function (eventName, data) {
        if (data === void 0) { data = null; }
        var event = new CustomEvent(eventName, { detail: data });
        window.dispatchEvent(event);
    };
    Event.on = function (eventName, callback) {
        var eventListener = function (event) {
            return callback(event['detail']);
        };
        // Listen for the event
        window.addEventListener(eventName, eventListener, false);
        // Return unsubscriber
        return window.removeEventListener.bind(undefined, eventName, eventListener);
    };
    return Event;
}());
exports.Event = Event;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./exports/Core/Event.ts");
/******/ 	Event = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=Event.map