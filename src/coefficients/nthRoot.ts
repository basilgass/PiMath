/**
 * NthRoot is something like "a+b\sqrt{3}
 */
export class NthRoot {
    private _radical: number
    private _nth: number
    private _coefficient: number
    private _isValid: boolean

    constructor(...values: number[]) {
        this._radical = 1
        this._coefficient = 1
        this._nth = 2
        this._isValid = true

        if (values.length > 0) {
            this.parse(values[0], values[1], values[2])
        }
    }

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get radical(): number {
        return this._radical
    }

    set radical(value: number) {
        this._radical = value
    }

    get nth(): number {
        return this._nth
    }

    set nth(value: number) {
        if (Number.isSafeInteger(value) && value >= 2) {
            this._nth = value
        } else {
            // Error setting the nth root.
            console.log('Error setting the nth root')
            this._nth = 2
        }
    }

    get coefficient(): number {
        return this._coefficient
    }

    set coefficient(value: number) {
        this._coefficient = value
    }

    get tex(): string {
        let C: string

        if (this._coefficient === 1) {
            C = ''
        } else if (this._coefficient === -1) {
            C = '-'
        } else {
            C = this._coefficient.toString()
        }

        if (this._radical === 1) {
            return `${this._coefficient}`
        } else {
            if (this._nth === 2) {
                return `${C}\\sqrt{${this._radical}}`
            } else {
                return `${C}\\sqrt[${this._nth}]{${this._radical}}`
            }
        }
    }

    get display(): string {
        let C: string

        if (this._coefficient === 1) {
            C = ''
        } else if (this._coefficient === -1) {
            C = '-'
        } else {
            C = this._coefficient.toString()
        }

        if (this._radical === 1) {
            return `${this._coefficient}`
        } else {
            if (this._nth === 2) {
                return `${C}sqrt{${this._radical}}`
            } else {
                return `${C}root(${this._nth}){${this._radical}}`
            }
        }
    }

    get value(): number {
        return this._coefficient * Math.pow(this._radical, 1 / this._nth)
    }

    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    parse = (radical: number, nthroot?: number, coefficient?: number): this => {
        this._coefficient = coefficient ?? 1
        this._nth = nthroot ?? 2
        this._radical = radical

        if (this._nth % 2 === 0 && this._radical < 0) {
            this._isValid = false
        }
        return this
    }

    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    reduce = (): this => {
        // Max value to test.
        let V = Math.floor(Math.pow(this._radical, 1 / this._nth))
        while (V > 1) {
            if (this._radical % Math.pow(V, this._nth) === 0) {
                // It's dividable by V^n
                this._coefficient *= V
                this._radical = this._radical / Math.pow(V, this._nth)

                // Redifine the new testing value (this is optimization)
                V = Math.floor(Math.pow(this._radical, 1 / this._nth))
                continue
            }
            V--
        }
        return this
    }

    multiply = (N: NthRoot): this => {
        this._radical *= N.radical
        return this.reduce()
    }

    // ------------------------------------------
    // Help functions
    // ------------------------------------------
    hasRadical = (): boolean => {
        return !(this._radical === 1 || this._radical === 0 || !this._isValid)
    }
}