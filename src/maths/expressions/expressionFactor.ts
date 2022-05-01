import {Expression} from "./expression";

export abstract class ExpressionFactor {
    constructor(
        private _argument: Expression | string | number,
        private _power?: number,
        private _root?: number,
    ) {
        if (this._power === undefined) {
            this._power = 1
        }
        if (this._root === undefined) {
            this._root = 1
        }
    }

    get tex(): string {
        return this.template().replace('@', this.texArgument)
    }

    get texArgument(): string {
        if (this._argument instanceof Expression) {
            return this._argument.tex
        } else {
            return this._argument.toString()
        }
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


    get argument(): Expression | string | number {
        return this._argument;
    }

    set argument(value: Expression | string | number) {
        this._argument = value;
    }

    abstract template(): string

    abstract derivative(variable: string): Expression

    abstract integrate(variable: string): Expression

    hasVariable(variable: string): boolean {
        // The argument is an Expression
        if (this._argument instanceof Expression) {
            return this._argument.hasVariable(variable)
        }

        // The argument is either a number (falsy) or a string (might be truthy)
        return variable === this._argument;

    }

    texPower(tex: string): string {
        if (this.power !== 1 && this.power !== -1) {
            return `${tex}^{ ${Math.abs(this.power)} }`
        }
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
