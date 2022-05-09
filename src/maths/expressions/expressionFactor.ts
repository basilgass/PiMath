import {Expression} from "./internals";

export abstract class ExpressionFactor {
    constructor(
        private _argument: Expression,
        private _power?: number,
        private _root?: number,
        private _inline?: boolean
    ) {
        if (this._power === undefined) {
            this._power = 1
        }
        if (this._root === undefined) {
            this._root = 1
        }
        if (this._inline === undefined) {
            this._inline = false
        }
    }

    get inline(): boolean {
        return this._inline;
    }

    set inline(value: boolean) {
        this._inline = value;
    }

    get tex(): string {
        return this.makeTeX()
    }

    get power(): number {
        return this._power;
    }

    set power(value: number) {
        if (!Number.isSafeInteger(value)) {
            throw `Power value (${value}) is not a safe integer`
        }
        this._power = value;
    }

    get root(): number {
        return this._root;
    }

    set root(value: number) {
        if (!Number.isSafeInteger(value)) {
            throw `Root value (${value}) is not a safe integer`
        }
        this._root = value;
    }

    get argument(): Expression {
        return this._argument;
    }

    set argument(value: Expression) {
        this._argument = value;
    }

    abstract makeTeX(numberOfFactors?: number, position?: number): string

    abstract derivative(variable: string): Expression

    abstract integrate(variable: string): Expression

    hasVariable(variable?: string): boolean {

        if (variable === undefined) {
            return !this.isNumeric()
        }

        // The argument is an Expression
        if (this._argument instanceof Expression) {
            return this._argument.hasVariable(variable)
        }

        return false

    }

    isNumeric(): boolean {
        if (this._argument instanceof Expression) {
            return this.isNumeric()
        }


    }

    hasRoot(): boolean {
        return this.root > 1
    }

    hasPower(inline?: boolean): boolean {
        if (inline === true) {
            return !(this.power === 1)
        } else {
            return !(this.power === 1 || this.power === -1)
        }
    }


    texPowerAndRoot(tex: string): string {
        return this.texPower(this.texRoot(tex))
    }

    texPower(tex: string): string {
        if (this.hasPower(this.inline)) {
            return `${tex}^{ ${Math.abs(this.power)} }`
        }

        return tex
    }

    wrapWithParentheses(tex: string): string {
        return `\\left( ${tex} \\right)`
    }

    texRoot(tex: string): string {
        if (this.root === 2) {
            return `\\sqrt{ ${tex} }`
        } else if (this.root > 2) {
            return `\\sqrt[${this.root}]{ ${tex} }`
        }

        return tex
    }

    isZero(): Boolean {
        if (this._argument instanceof Expression) {
            return this._argument.isZero()
        }

        return this._argument === 0
    }
}