import {ExpressionFactor} from "./ExpressionFactor";


export class Expression {
    private _members: (ExpressionFactor[])[]

    constructor() {
        this._members = []
    }

    get tex(): string {
        return ''
    }


    get members(): ExpressionFactor[][] {
        return this._members;
    }

    set members(value: ExpressionFactor[][]) {
        this._members = value;
    }


    hasVariable(variable: string): boolean {
        for (let member of this._members) {
            for (let factor of member) {

                if (factor.hasVariable(variable)) {
                    return true
                }
            }
        }

        // The variable hasn't been found !
        return false
    }
}