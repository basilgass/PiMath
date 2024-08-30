import { Fraction } from "../coefficients/fraction";
import { Polynom } from "./polynom";
export class Rational {
    #numerator;
    #denominator;
    constructor(value, denominator) {
        if (value === undefined) {
            this.#numerator = new Polynom().zero();
            this.#denominator = new Polynom().one();
        }
        else if (value instanceof Rational) {
            return value.clone();
        }
        else {
            this.#numerator = new Polynom(value);
            this.#denominator = new Polynom(denominator ?? 1);
        }
    }
    get tex() {
        return `\\frac{ ${this.#numerator.tex} }{ ${this.#denominator.tex} }`;
    }
    get display() {
        return `(${this.#numerator.display})/(${this.#denominator.display})`;
    }
    get numerator() {
        return this.#numerator;
    }
    get denominator() {
        return this.#denominator;
    }
    clone() {
        return new Rational(this.#numerator.clone(), this.#denominator.clone());
    }
    parse() {
        throw new Error("Method not implemented.");
    }
    zero() {
        this.#numerator.zero();
        this.#denominator.one();
        return this;
    }
    one() {
        this.#numerator.one();
        this.#denominator.one();
        return this;
    }
    add(value) {
        throw new Error("Method not implemented.");
    }
    subtract(value) {
        throw new Error("Method not implemented.");
    }
    opposite() {
        this.#numerator.opposite();
        return this;
    }
    multiply(value) {
        if (value instanceof Rational) {
            this.#numerator.multiply(value.numerator);
            this.#denominator.multiply(value.denominator);
        }
        else {
            this.#numerator.multiply(value);
        }
        return this;
    }
    divide(value) {
        return this.inverse().multiply(value);
    }
    reduce() {
        throw new Error("Method not implemented.");
    }
    isEqual(value) {
        throw new Error("Method not implemented.");
    }
    isZero() {
        return this.#numerator.isZero();
    }
    isOne() {
        return this.#numerator.isOne() && this.#denominator.isOne();
    }
    inverse() {
        const num = this.#numerator.clone(), den = this.#denominator.clone();
        this.#numerator = den;
        this.#denominator = num;
        return this;
    }
    pow(value) {
        if (!Number.isSafeInteger(value)) {
            throw new Error('Cannot take the power of a polynom with a non integer value');
        }
        if (value < 0) {
            return this.inverse().pow(-value);
        }
        this.#numerator.pow(value);
        this.#denominator.pow(value);
        return this;
    }
    sqrt() {
        throw new Error('Cannot take the square root from a polynom');
    }
    root() {
        throw new Error('Cannot take the nth root from a polynom');
    }
    derivative() {
        throw new Error("Method not implemented.");
    }
    primitive() {
        throw new Error("Method not implemented.");
    }
    integrate(a, b, letter) {
        throw new Error("Method not implemented.");
    }
    get variables() {
        const num = this.#numerator.variables, den = this.#denominator.variables;
        return [...new Set([...num, ...den])];
    }
    hasVariable(letter) {
        return this.#numerator.hasVariable(letter) || this.#denominator.hasVariable(letter);
    }
    degree() {
        throw new Error("Getting the degree of a rational polynom is not possible");
    }
    evaluate(values, asNumeric) {
        const N = this.#numerator.evaluate(values, asNumeric), D = this.#denominator.evaluate(values, asNumeric);
        if (N instanceof Fraction && D instanceof Fraction) {
            return N.divide(D);
        }
        return N / D;
    }
}
//# sourceMappingURL=rational.js.map