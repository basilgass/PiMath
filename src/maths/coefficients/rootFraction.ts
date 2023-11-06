import {Fraction} from "./fraction";
import {CoefficientCore} from "./coefficientCore";

/**
 * RootFraction is something like "<coefficient>\sqrt[index]{<radical>}
 */
export class RootFraction extends CoefficientCore<RootFraction> {
    constructor(value?: number | string | Fraction | RootFraction, radical?: number | string, index?: number | string) {
        super();

        // Default values
        this._index = 2;
        this._radical = 1;

        // Parse the value
        if (value !== undefined) {
            if (value instanceof RootFraction) return this.parse(value)
            return this.parse(value, radical, index)
        }

        return this
    }

    private _index: number;

    get index(): number {
        return this._index;
    }

    set index(value: number) {
        this._index = value;
    }

    private _radical: number;

    get radical(): number {
        return this._radical;
    }

    set radical(value: number) {
        this._radical = value;
    }

    get value(): number {
        return this.numerator * Math.pow(this._radical, 1 / this._index) / this.denominator
    }

    get tex(): string {
        if (!this._hasRadical()) return this.fraction.tex

        const N = `${this.numerator} \\sqrt${this._index > 2 ? `[${this._index}]` : ''}{ ${this._radical} }`

        if (this.denominator === 1) return N

        return `\\frac{ ${N} }{ ${this.denominator} }`

    }

    get display(): string {
        if (!this._hasRadical()) return this.fraction.display
        const N = `${this.numerator}${this._index > 2 ? `root(${this._index})` : 'sqrt'}(${this._radical})`,
            D = this.denominator > 1 ? `/${this.denominator}` : ''

        return `${N}${D}`
    }

    createInstance(value?: string | number | Fraction | RootFraction): RootFraction {
        return new RootFraction(value)
    }

    clone = (): RootFraction => {
        return new RootFraction(this.fraction, this.radical, this.index)
    }

    reduce = (): RootFraction => {
        // Reduce the radical
        this._extractRadical()

        // Reduce the fraction
        this.fraction = this.fraction.reduce()
        return this
    }

    one = (): RootFraction => {
        super.one()
        this._resetRadical()
        return this
    }

    add = (...values: (Fraction | number | string | RootFraction)[]): RootFraction => {
        // Check that all values are similar
        const RF_list = values.map(x => new RootFraction(x))

        const allAreSimilar = RF_list.every(x => this.isSimilarTo(x))
        if (!allAreSimilar) throw new Error('All values must be similar')

        this.fraction = this.fraction.add(...RF_list.map(x => x.fraction))
        return this
    }

    multiply = (...values: (Fraction | number | string | RootFraction)[]): RootFraction => {
        const RF_list = values.map(x => new RootFraction(x))

        // Check that all values has the same index
        if (RF_list.every(x => x.index === this.index)) {
            // Multiply the fraction
            this.fraction = this.fraction.multiply(...RF_list.map(x => x.fraction))

            // Multiply the radical
            this.radical = RF_list.reduce((acc, x) => acc * x.radical, this.radical)

            return this
        }

        // Check that all values has the same radical
        if (RF_list.every(x => x.radical === this.radical)) {
            // Multiply the fraction
            this.fraction = this.fraction.multiply(...RF_list.map(x => x.fraction))

            // Add the index
            const idx: Fraction = new Fraction(1, this.index)
                .add(...RF_list.map(x => new Fraction(1, x.index)))

            this.radical = Math.pow(this.radical, idx.numerator)
            this.index = idx.denominator
            return this
        }
        return this
    }

    invert = (): RootFraction => {
        // 3sqrt(2)/7 -> 7/3sqrt(2) -> 7sqrt(2)/(3*2) -> 7sqrt(2)/6
        // 3root(3)(2)/7 -> 7/3root(3)(2) -> 7root(3)(2^2)/(3*2) -> 7root(3)(4)/6
        this.fraction = this.fraction.invert()
        this.denominator = this.denominator * this.radical
        this.radical = this.index - 1 > 1 ? Math.pow(this.radical, this.index - 1) : this.radical
        return this
    }

    root(value: number | (Fraction | RootFraction)): RootFraction {
        throw new Error("Method not implemented.");
    }

    isSimilarTo = (value: Fraction | number | string | RootFraction): boolean => {
        let RF = new RootFraction(value).reduce()

        // Check if the index and radical are the same
        return this.index === RF.index && this.radical === RF.radical
    }

    get fraction(): Fraction {
        return new Fraction(this.numerator, this.denominator)
    }

    set fraction(value: Fraction) {
        this.numerator = value.numerator
        this.denominator = value.denominator
    }

    parse = (value: number | string | Fraction | RootFraction, radical?: number | string, index?: number | string): RootFraction => {
        if (value instanceof RootFraction) return value.clone()

        if (value instanceof Fraction) {
            this.numerator = value.numerator
            this.denominator = value.denominator
        } else if (typeof value === "number") {
            this.numerator = value
            this.denominator = 1
        } else if (typeof value === "string") {
            this.fraction = new Fraction(value)
            // TODO parse a string with root code....
        }

        if (radical !== undefined) this.radical = +radical
        if (index !== undefined) this.index = +index

        return this
    }

    private _resetRadical = (): RootFraction => {
        this._index = 2
        this._radical = 1
        return this
    }

    private _hasRadical = (): boolean => {
        return this._radical !== 1 && this._index > 1
    }

    private _extractRadical = (): { extracted: number, radical: number } => {
        // Maximal value to test for extracting the radical
        let extracted = Math.floor(Math.pow(this._radical, 1 / this._index))

        while (extracted > 1) {
            const pow = Math.pow(extracted, this._index)

            if (this._radical % pow === 0) {
                // Extract the radical
                this._radical = this._radical / pow
                this.numerator *= extracted
                return {extracted, radical: this._radical}
            }
            extracted--
        }
        return {extracted: 1, radical: this._radical}
    }
}