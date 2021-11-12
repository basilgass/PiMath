import rndPolynom from "./rndPolynom";
import rndMonom from "./rndMonom";
import rndHelpers from "./rndHelpers";

export let Random  = {
    monom: rndMonom,
    polynom: rndPolynom,
    number: rndHelpers.randomInt,
    numberSym: rndHelpers.randomIntSym,
    bool: rndHelpers.randomBool,
    array: rndHelpers.randomArray,
    item: rndHelpers.randomItem,
    shuffle: rndHelpers.shuffleArray
}
