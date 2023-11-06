import {Fraction} from "./fraction";
import {RootFraction} from "./rootFraction";
import {Numeric} from "../numeric";


export type CoefficientTypes = Fraction | RootFraction
export type CoefficientParserTypes = CoefficientTypes | number | string

export enum COEFFICIENT_MODE {
    "FRACTION",
    "ROOT",
    "RADIAN",
    "COMPLEX"
}

export enum FRACTION_FRAC {
    "frac",
    "dfrac",
    "tfrac",
}

export abstract class CoefficientCore<T extends CoefficientTypes> {
    private _fracType: FRACTION_FRAC

    get fracType(): FRACTION_FRAC {
        return this._fracType;
    }

    set fracType(value: FRACTION_FRAC) {
        this._fracType = value;
    }

    private _numerator: number

    get numerator(): number {
        return this._numerator;
    }

    set numerator(value: number) {
        this._numerator = value;
    }

    private _denominator: number

    get denominator(): number {
        return this._denominator;
    }

    set denominator(value: number) {
        this._denominator = value;
    }

    get value(): number {
        return this._numerator / this._denominator
    }

    get sign(): number {
        return (this.numerator * this.denominator >= 0) ? 1 : -1;
    };

    get signTeX(): string {
        return this.sign === 1 ? '+' : '-'
    }

    get fracTeX(): string {
        return this._fracType === FRACTION_FRAC.frac ? '\\frac' : this._fracType === FRACTION_FRAC.dfrac ? '\\dfrac' : '\\tfrac'
    }

    abstract get tex(): string

    abstract get display(): string

    static max = <T extends CoefficientTypes>(...values: T[]): T => {
        const [first, ...rest] = values
        return rest.reduce((acc, cur) => acc.isGreaterThan(cur) ? acc : cur, first)
    }

    static min = <T extends CoefficientTypes>(...values: T[]): T => {
        const [first, ...rest] = values
        return rest.reduce((acc, cur) => acc.isGreaterThan(cur) ? cur : acc, first)
    }

    static unique = <T extends CoefficientTypes>(values: T[], sort?: boolean): T[] => {
        let uniqueObjects: T[] = [],
            uniqueValues: number[] = []

        values.forEach((value, index) => {
            if (!uniqueValues.includes(value.value)) {
                uniqueValues.push(value.value)
                uniqueObjects.push(value)
            }
        })

        if (sort) return CoefficientCore.sort(uniqueObjects)

        return uniqueObjects
    }

    static sort = <T extends CoefficientTypes>(values: T[], reverse?: boolean): T[] => {
        let sorted = values.sort((a, b) => a.value - b.value)

        if (reverse) sorted = sorted.reverse()

        return sorted
    }

    abstract createInstance(value?: number | string | T): T

    abstract clone(): T

    abstract reduce(): T

    getReducedCoefficient = (): { N: number, D: number } => {
        if (this.numerator === 1 || this.denominator === 1) return {N: this.numerator, D: this.denominator}

        let g = Numeric.gcd(this.numerator, this.denominator);
        let [N, D] = [this.numerator, this.denominator]

        N = N / g;
        D = D / g;

        if (D < 0) {
            D = -D;
            N = -N;
        }

        return {N, D}
    };

    zero = (): T => {
        this.numerator = 0;
        this.denominator = 1;
        return this as unknown as T;
    };

    one = (): T => {
        this.numerator = 1;
        this.denominator = 1;
        return this as unknown as T;
    };

    infinite = (): T => {
        this.numerator = Infinity;
        this.denominator = 1;
        return this as unknown as T;
    };

    invalid = (): T => {
        this.numerator = NaN;
        this.denominator = 1;
        return this as unknown as T
    };

    abstract add(...coefficients: (T | number | string)[]): T

    opposite = (): T => {
        this.numerator = -this.numerator;
        return this as unknown as T;
    }

    subtract = (...coefficients: (T | number | string)[]): T => this.add(...coefficients.map(c => this.createInstance(c).opposite() as T))

    abstract multiply(...coefficients: (T | number | string)[]): T

    abstract invert(): T

    divide = (F: T | number): T => this.multiply(this.createInstance(F).invert() as T);

    abs = (): T => {
        this.numerator = Math.abs(this.numerator);
        return this as unknown as T;
    }

    pow = (value: number | CoefficientTypes): T => {
        if (Number.isSafeInteger(value)) {
            const factor = this.clone(),
                abs = Math.abs(value as number)
            for (let i = abs; i <= abs; i++) {
                this.multiply(factor)
            }

            if ((value as number) < 0) this.invert()
        } else {
            throw new Error('Cannot raise a coefficient to a non-integer power')
        }
        return this as unknown as T
    }

    abstract root(value: number | CoefficientTypes): T

    sqrt = (): T => this.root(2)

    asTopFraction = (): T => {
        this.fracType = FRACTION_FRAC.tfrac
        return this as unknown as T
    }

    asDisplayFraction = (): T => {
        this.fracType = FRACTION_FRAC.dfrac
        return this as unknown as T
    }


    /**
     * All the is* methods without argument
     */

    isReduced = (): boolean => Math.abs(Numeric.gcd(this._numerator, this._denominator)) === 1

    isOne = (): boolean => this._numerator === 1 && this._denominator === 1

    isMinusOne = (): boolean => this._numerator === -1 && this._denominator === 1

    isUnit = (): boolean => this.isOne() || this.isMinusOne()

    isZero = (): boolean => this._numerator === 0

    isFinite = (): boolean => !this.isInfinity() && !this.isNaN()

    isSquare = (): boolean => Math.sqrt(this._numerator) % 1 === 0 && Math.sqrt(this._denominator) % 1 === 0

    isNaN = (): boolean => isNaN(this.value)

    isPositive = (): boolean => this.sign === 1

    isNegative = (): boolean => this.sign === -1

    isStrictlyNegative = (): boolean => this.value < 0

    isStrictlyPositive = (): boolean => this.value > 0

    isNatural = (): boolean => this.isRelative() && this.isPositive()

    isRelative = (): boolean => {
        const {N, D} = this.getReducedCoefficient()
        return D === 1
    }

    isRational = (): boolean => !this.isRelative()

    isReal = (): boolean => true

    isComplex = (): boolean => false

    isInfinity = (): boolean => Math.abs(this.value) === Infinity

    isEven = (): boolean => this.isRelative() && this.value % 2 === 0

    isOdd = (): boolean => this.isRelative() && this.value % 2 === 1

    isApproximative = (): boolean => this._numerator.toString().length >= 15 && this._denominator.toString().length >= 15

    isExact = (): boolean => !this.isApproximative()

    isGreaterThan = (than: CoefficientCore<any> | number | string): boolean => this.value > this.createInstance(than as T).value;

    isSimilarTo = (to: CoefficientCore<any> | number | string): boolean => true;

    isGreaterOrEqualTo = (than: CoefficientCore<any> | number | string): boolean => this.value >= this.createInstance(than as T).value;

    isLesserOrEqualTo = (than: CoefficientCore<any> | number | string): boolean => this.value <= this.createInstance(than as T).value;

    isLesserThan = (than: CoefficientCore<any> | number | string): boolean => this.value < this.createInstance(than as T).value;

    isEqualTo = (than: CoefficientCore<any> | number | string): boolean => this.value === this.createInstance(than as T).value

    isOpposedTo = (to: CoefficientCore<any> | number | string): boolean => this.isEqualTo(this.createInstance(to as T).opposite())

    isInvertedTo = (to: CoefficientCore<any> | number | string): boolean => this.isEqualTo(this.createInstance(to as T).invert())

}
