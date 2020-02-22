import {Polynom} from "./polynom";

export class Equation {
    private _left:Polynom;
    private _right:Polynom;
    private _sign:string;
    constructor(left:Polynom, right:Polynom, sign?:string) {
        this._left = left;
        this._right = right;
        this._sign = sign !== undefined ? sign : '=';
    }
}