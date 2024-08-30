import { Fraction } from "../coefficients/fraction";
import { Polynom } from "./polynom";
export class Factor {
    #displayMode;
    #polynom;
    #power;
    constructor(value, power) {
        if (value instanceof Factor) {
            this.#polynom = value.polynom.clone();
            this.#power = value.power.clone();
        }
        else {
            this.#polynom = new Polynom(value);
            this.#power = new Fraction(power ?? 1);
        }
        this.#displayMode = FACTOR_DISPLAY.POWER;
        return this;
    }
    parse() {
        throw new Error("Method not implemented.");
    }
    clone() {
        return new Factor(this);
    }
    add() {
        throw new Error("Adding two factors is not possible");
    }
    get asPower() {
        this.#displayMode = FACTOR_DISPLAY.POWER;
        return this;
    }
    get asRoot() {
        this.#displayMode = FACTOR_DISPLAY.ROOT;
        return this;
    }
    degree(letter) {
        return this.polynom.degree(letter).multiply(this.power);
    }
    derivative() {
        if (this.power.isZero()) {
            return [new Factor('0', '1')];
        }
        if (this.power.isOne()) {
            return [new Factor(this.polynom.clone().derivative())];
        }
        return [
            new Factor(this.power.clone()),
            new Factor(this.polynom.clone().derivative()),
            new Factor(this.polynom.clone(), this.power.clone().subtract(1))
        ];
    }
    develop() {
        if (this.power.isNatural()) {
            return this.polynom.clone().pow(this.power.value);
        }
        throw new Error("The power must be a natural number");
    }
    get display() {
        const num = this.power.numerator;
        const den = this.power.denominator;
        let base;
        let power;
        if (this.#displayMode === FACTOR_DISPLAY.ROOT && den > 1) {
            base = `${den === 2 ? 'sqrt' : `root(${den})`}(${this.polynom.display})`;
            power = Math.abs(num) === 1 ? '' : `^(${Math.abs(num)})`;
        }
        else {
            base = `(${this.polynom.display})`;
            power = (den === 1 && Math.abs(num) === 1) ? '' : `^(${this.power.display})`;
        }
        base = `${base}${power}`;
        if (this.#displayMode === FACTOR_DISPLAY.ROOT && num < 0) {
            base = `1/(${base})`;
        }
        return base;
    }
    divide(value) {
        if (value instanceof Factor) {
            if (this.isSameAs(value)) {
                this.power.subtract(value.power);
                return this;
            }
        }
        const P = new Polynom(value);
        if (this.isSameAs(P)) {
            this.power.subtract(1);
            return this;
        }
        throw new Error("The two factors must be the same");
    }
    evaluate(values, asNumeric) {
        if (asNumeric) {
            return this.polynom.evaluate(values, true) ** this.power.value;
        }
        return this.polynom.evaluate(values).pow(this.power);
    }
    hasVariable(letter) {
        return this.polynom.hasVariable(letter);
    }
    inverse() {
        this.power.opposite();
        return this;
    }
    isEqual(value) {
        return this.isSameAs(value) &&
            this.power.isEqual(value.power);
    }
    isOne() {
        return this.polynom.isOne() || this.power.isZero();
    }
    isSameAs(value) {
        let P;
        if (value instanceof Factor) {
            P = value.polynom;
        }
        else if (value instanceof Polynom) {
            P = value;
        }
        else {
            P = new Polynom(value);
        }
        return this.polynom.isEqual(P);
    }
    isZero() {
        return this.polynom.isZero();
    }
    multiply(value) {
        if (value instanceof Factor) {
            if (this.isSameAs(value)) {
                this.power.add(value.power);
                return this;
            }
        }
        const P = new Polynom(value);
        if (this.isSameAs(P)) {
            this.power.add(1);
            return this;
        }
        throw new Error("The two factors must be the same");
    }
    one() {
        this.#polynom.one();
        this.#power.one();
        return this;
    }
    opposite() {
        throw new Error("Method not implemented.");
    }
    get polynom() {
        return this.#polynom;
    }
    set polynom(value) {
        this.#polynom = value;
    }
    pow(value) {
        this.power.multiply(value);
        return this;
    }
    get power() {
        return this.#power;
    }
    set power(value) {
        this.#power = new Fraction(value);
    }
    primitive() {
        throw new Error("Method not implemented.");
    }
    reduce() {
        throw new Error("Method not implemented.");
    }
    root(value) {
        this.power.divide(value);
        return this;
    }
    sqrt() {
        return this.root(2);
    }
    subtract() {
        throw new Error("Subtracting two factors is not possible");
    }
    get tex() {
        const num = this.power.numerator;
        const den = this.power.denominator;
        let base;
        let power;
        if (this.#displayMode === FACTOR_DISPLAY.ROOT && den > 1) {
            base = `\\sqrt${den === 2 ? '' : `[ ${den} ]`}{ ${this.polynom.tex} }`;
            power = Math.abs(num) === 1 ? '' : `^{ ${Math.abs(num)} }`;
        }
        else {
            base = `\\left( ${this.polynom.tex} \\right)`;
            power = (den === 1 && Math.abs(num) === 1) ? '' : `^{ ${this.power.tex} }`;
        }
        base = `${base}${power}`;
        if (this.#displayMode === FACTOR_DISPLAY.ROOT && num < 0) {
            base = `\\frac{ 1 }{ ${base} }`;
        }
        return base;
    }
    get variables() {
        return this.polynom.variables;
    }
    zero() {
        this.#polynom.zero();
        this.#power.one();
        return this;
    }
}
export var FACTOR_DISPLAY;
(function (FACTOR_DISPLAY) {
    FACTOR_DISPLAY[FACTOR_DISPLAY["ROOT"] = 0] = "ROOT";
    FACTOR_DISPLAY[FACTOR_DISPLAY["POWER"] = 1] = "POWER";
})(FACTOR_DISPLAY || (FACTOR_DISPLAY = {}));
//# sourceMappingURL=factor.js.map