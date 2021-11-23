import { rndPolynom } from "./rndPolynom";
import { rndMonom } from "./rndMonom";
import { rndHelpers } from "./rndHelpers";
export * from "./rndTypes";
export var Random;
(function (Random) {
    function polynom(config) {
        return (new rndPolynom(config)).generate();
    }
    Random.polynom = polynom;
    function monom(config) {
        return new rndMonom(config).generate();
    }
    Random.monom = monom;
    function number(from, to) { return rndHelpers.randomInt(from, to); }
    Random.number = number;
    function numberSym(max, allowZero) { return rndHelpers.randomIntSym(max, allowZero); }
    Random.numberSym = numberSym;
    function bool(percent) { return rndHelpers.randomBool(percent); }
    Random.bool = bool;
    function array(arr, number) { return rndHelpers.randomArray(arr, number); }
    Random.array = array;
    function item(arr) { return rndHelpers.randomItem(arr); }
    Random.item = item;
    function shuffle(arr) { rndHelpers.shuffleArray(arr); }
    Random.shuffle = shuffle;
})(Random || (Random = {}));
//# sourceMappingURL=index.js.map