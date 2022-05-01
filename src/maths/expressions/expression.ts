import {ExpressionMember} from "./expressionMember";


export class Expression {
    private _members: ExpressionMember[]

    constructor() {
        this._members = []
    }

    get tex(): string {
        return ''
    }


    get members(): ExpressionMember[] {
        return this._members;
    }

    set members(value: ExpressionMember[]) {
        this._members = value;
    }

    addMembers(...values: ExpressionMember[]): Expression {

        for (let value of values) {
            this._members.push(value)
        }

        return this
    }


    hasVariable(variable: string): boolean {
        for (let member of this._members) {
            if (member.hasVariable(variable)) {
                return true
            }
        }

        // The variable hasn't been found !
        return false
    }

    isZero(): boolean {
        // TODO: Must check if all the members has a value of zero
        if (this._members.length === 0) {
            return true
        }

        for (let member of this._members) {
            if (member.isZero()) {
                return true
            }
        }

        return false
    }
}