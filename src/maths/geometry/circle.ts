import Point from "./point";
import Fraction from "../coefficients/fraction";
import Equation from "../algebra/equation";
import Polynom from "../algebra/polynom";


export default class Circle {
    private _center: Point;
    private _radius: Fraction;
    private _exists: boolean;
    constructor(...values: any) {
        this._exists = false

        if(values!==undefined){this.parse(...values)}
    }

    private parse(...values: any) {
        if(values.length===2){
            this._center = new Point(values[0])
            this._radius = new Fraction(values[1])
        }
    }

    get tex(): string {
        let cx, cy
        if(this._center.x.isZero()){
            cx = 'x^2'
        }else{
            cx = `\\left(x-${this._center.x.tex}\\right)^2`
        }
        if(this._center.y.isZero()){
            cy = 'y^2'
        }else{
            cy = `\\left(y-${this._center.y.tex}\\right)^2`
        }
        return `${cx}+${cy}=${this._radius.pow(2).tex}`
    }

    get developed():string {
        let equ = new Equation(
            new Polynom(`(x-(${this._center.x.display}))^2+(y-(${this._center.y.display}))^2`),
            new Polynom(`${this._radius.pow(2).display}`)
        )

        return equ.moveLeft().tex;
    }
}