var Time;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./exports/Core/Time.ts":
/*!******************************!*\
  !*** ./exports/Core/Time.ts ***!
  \******************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Time_1 = __webpack_require__(/*! ../../src/Core/Time/Time */ "./src/Core/Time/Time.ts");
module.exports = Time_1.Time;


/***/ }),

/***/ "./src/Core/Time/Time.ts":
/*!*******************************!*\
  !*** ./src/Core/Time/Time.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Time = void 0;
var Time = /** @class */ (function () {
    function Time() {
    }
    /**
     * timeString either expects a string in the following format:
     * colon (:) delimited string e.g. 5w:3d:2h:4m:3s
     * can be any combination of w | d | h | m | s
     * e.g. '1w', '2d', '2m:30s', '4w:3d'
     */
    Time.timeStringToSeconds = function (timeString) {
        var timeInSeconds = 0;
        var parts = timeString.split(':');
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            var suffix = part.substr(part.length - 1, 1);
            var number = parseInt(part);
            switch (suffix) {
                case ('w'):
                    timeInSeconds += number * 604800;
                    break;
                case ('d'):
                    timeInSeconds += number * 86400;
                    break;
                case ('h'):
                    timeInSeconds += number * 3600;
                    break;
                case ('m'):
                    timeInSeconds += number * 60;
                    break;
                case ('s'):
                    timeInSeconds += number;
                    break;
                default:
                    throw new Error("Invalid time string: " + timeString);
            }
        }
        return timeInSeconds;
    };
    return Time;
}());
exports.Time = Time;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./exports/Core/Time.ts");
/******/ 	Time = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=Time.map