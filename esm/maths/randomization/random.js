"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = {
          enumerable: true, get: function () {
              return m[k];
          }
      };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const rndPolynom_1 = require("./rndPolynom");
const rndMonom_1 = require("./rndMonom");
const rndHelpers_1 = require("./rndHelpers");
const rndFraction_1 = require("./rndFraction");
__exportStar(require("./rndTypes"), exports);
var Random;
(function (Random) {
    function polynom(config) {
        return (new rndPolynom_1.rndPolynom(config)).generate();
    }
    Random.polynom = polynom;
    function monom(config) {
        return (new rndMonom_1.rndMonom(config)).generate();
    }
    Random.monom = monom;
    function fraction(config) {
        return (new rndFraction_1.rndFraction(config)).generate();
    }
    Random.fraction = fraction;
    function number(from, to) {
        return rndHelpers_1.rndHelpers.randomInt(from, to);
    }
    Random.number = number;
    function numberSym(max, allowZero) {
        return rndHelpers_1.rndHelpers.randomIntSym(max, allowZero);
    }
    Random.numberSym = numberSym;
    function bool(percent) {
        return rndHelpers_1.rndHelpers.randomBool(percent);
    }
    Random.bool = bool;
    function array(arr, number) {
        return rndHelpers_1.rndHelpers.randomArray(arr, number);
    }
    Random.array = array;
    function item(arr) {
        return rndHelpers_1.rndHelpers.randomItem(arr);
    }
    Random.item = item;
    function shuffle(arr) {
        rndHelpers_1.rndHelpers.shuffleArray(arr);
    }
    Random.shuffle = shuffle;
})(Random = exports.Random || (exports.Random = {}));
//# sourceMappingURL=random.js.map