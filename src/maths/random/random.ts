import rndPolynom from "./rndPolynom";
import rndMonom from "./rndMonom";
import rndHelpers from "./rndHelpers";
import {randomMonomConfig, randomPolynomConfig} from "./rndTypes";
import Monom from "../algebra/monom";
import Polynom from "../algebra/polynom";

// export var Random = {
//     monom: rndMonom,
//     polynom: rndPolynom,
//     number: rndHelpers.randomInt,
//     numberSym: rndHelpers.randomIntSym,
//     bool: rndHelpers.randomBool,
//     array: rndHelpers.randomArray,
//     item: rndHelpers.randomItem,
//     shuffle: rndHelpers.shuffleArray
// }

export namespace Random {
    export function polynom(config?: randomPolynomConfig): Polynom {
        return new rndPolynom(config).generate()
    }

    export function monom(config?: randomMonomConfig): Monom {
        return new rndMonom(config).generate()
    }

    export function number(from:number, to:number):number { return rndHelpers.randomInt(from,to)}
    export function numberSym(max:number, allowZero?:boolean):number { return rndHelpers.randomIntSym(max, allowZero)}
    export function bool(percent?:number):boolean { return rndHelpers.randomBool(percent)}
    export function array(arr:any[], number?:number):any[] { return rndHelpers.randomArray(arr, number)}
    export function item(arr:any[]):any { return rndHelpers.randomItem(arr)}
    export function shuffle(arr:any[]):any { rndHelpers.shuffleArray(arr)}


}