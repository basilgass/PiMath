// TODO: Remove NthRoot class
/**
 * NthRoot is something like "a+b\sqrt{3}
 */
export class NthRoot {
    #radical: number
    #nth: number
    #coefficient: number
    #isValid: boolean

    constructor(...values: number[]) {
        this.#radical = 1
        this.#coefficient = 1
        this.#nth = 2
        this.#isValid = true

        if (values.length > 0) {
            this.parse(values[0], values[1], values[2])
        }
    }

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get radical(): number {
        return this.#radical
    }

    set radical(value: number) {
        this.#radical = value
    }

    get nth(): number {
        return this.#nth
    }

    set nth(value: number) {
        if (Number.isSafeInteger(value) && value >= 2) {
            this.#nth = value
        } else {
            // Error setting the nth root.
            console.log('Error setting the nth root')
            this.#nth = 2
        }
    }

    get coefficient(): number {
        return this.#coefficient
    }

    set coefficient(value: number) {
        this.#coefficient = value
    }

    get tex(): string {
        let C: string

        if (this.#coefficient === 1) {
            C = ''
        } else if (this.#coefficient === -1) {
            C = '-'
        } else {
            C = this.#coefficient.toString()
        }

        if (this.#radical === 1) {
            return `${this.#coefficient}`
        } else {
            if (this.#nth === 2) {
                return `${C}\\sqrt{${this.#radical}}`
            } else {
                return `${C}\\sqrt[${this.#nth}]{${this.#radical}}`
            }
        }
    }

    get display(): string {
        let C: string

        if (this.#coefficient === 1) {
            C = ''
        } else if (this.#coefficient === -1) {
            C = '-'
        } else {
            C = this.#coefficient.toString()
        }

        if (this.#radical === 1) {
            return `${this.#coefficient}`
        } else {
            if (this.#nth === 2) {
                return `${C}sqrt{${this.#radical}}`
            } else {
                return `${C}root(${this.#nth}){${this.#radical}}`
            }
        }
    }

    get value(): number {
        return this.#coefficient * Math.pow(this.#radical, 1 / this.#nth)
    }

    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    parse = (radical: number, nthroot?: number, coefficient?: number): this => {
        this.#coefficient = coefficient ?? 1
        this.#nth = nthroot ?? 2
        this.#radical = radical

        if (this.#nth % 2 === 0 && this.#radical < 0) {
            this.#isValid = false
        }
        return this
    }

    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    reduce = (): this => {
        // Max value to test.
        let V = Math.floor(Math.pow(this.#radical, 1 / this.#nth))
        while (V > 1) {
            if (this.#radical % Math.pow(V, this.#nth) === 0) {
                // It's dividable by V^n
                this.#coefficient *= V
                this.#radical = this.#radical / Math.pow(V, this.#nth)

                // Redifine the new testing value (this is optimization)
                V = Math.floor(Math.pow(this.#radical, 1 / this.#nth))
                continue
            }
            V--
        }
        return this
    }

    multiply = (N: NthRoot): this => {
        this.#radical *= N.radical
        return this.reduce()
    }

    // ------------------------------------------
    // Help functions
    // ------------------------------------------
    hasRadical = (): boolean => {
        return !(this.#radical === 1 || this.#radical === 0 || !this.#isValid)
    }
}