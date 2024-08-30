import { Fraction } from "../coefficients/fraction";
import { Factor } from "./factor";
import { Polynom } from "./polynom";
export class PolyFactor {
    #factors = [];
    constructor(...values) {
        this.parse(...values);
        return this;
    }
    parse(...values) {
        this.#factors = values.map(value => {
            if (value instanceof Factor) {
                return value;
            }
            return new Factor(value);
        });
        return this;
    }
    clone() {
        return new PolyFactor(...this.#factors.map(f => f.clone()));
    }
    add(...values) {
        let PF = [this, ...values];
        const gcd = PolyFactor.gcd(...PF);
        PF = PF.map(pf => pf.divide(gcd).reduce());
        const P = new Polynom('0');
        PF.forEach(pf => P.add(pf.develop()));
        this.#factors = [
            ...gcd.factors,
            new Factor(P)
        ];
        return this;
    }
    degree(letter) {
        return this.#factors.reduce((acc, f) => acc.add(f.degree(letter)), new Fraction('0'));
    }
    derivative() {
        const dPF = [];
        const length = this.#factors.length;
        for (let i = 0; i < length; i++) {
            const factors = this.#factors.slice();
            const factor = factors.splice(i, 1)[0];
            dPF.push(new PolyFactor(...factors).multiply(new PolyFactor(...factor.derivative())));
        }
        dPF.forEach(pf => pf.reduce());
        const first = dPF.shift();
        if (first !== undefined) {
            this.#factors = first.factors;
        }
        return this.add(...dPF);
    }
    develop() {
        const P = new Polynom('1');
        this.#factors.forEach(f => {
            P.multiply(f.develop());
        });
        return P;
    }
    divide(value) {
        this.#factors = this.#factors.concat(value.clone().factors.map(f => f.inverse()));
        return this;
    }
    evaluate(values, asNumeric) {
        if (asNumeric) {
            return this.#factors
                .reduce((acc, f) => acc * f.evaluate(values, asNumeric), 1);
        }
        return this.#factors
            .reduce((acc, f) => acc.multiply(f.evaluate(values)), new Fraction('1'));
    }
    hasVariable(letter) {
        return this.#factors.some(f => f.hasVariable(letter));
    }
    inverse() {
        this.#factors = this.#factors.map(f => f.inverse());
        return this;
    }
    isEqual(value) {
        const gcd = PolyFactor.gcd(this, value);
        const PF1 = this.clone().divide(gcd).reduce();
        const PF2 = value.clone().divide(gcd).reduce();
        return PF1.isOne() && PF2.isOne();
    }
    isOne() {
        return this.#factors.every(f => f.isOne());
    }
    isZero() {
        return this.#factors.every(f => f.isZero());
    }
    multiply(...values) {
        values.forEach(value => {
            this.#factors = this.#factors.concat(value.clone().factors);
        });
        return this;
    }
    one() {
        this.#factors = [new Factor('1', '1')];
        return this;
    }
    opposite() {
        const index = this.#factors.findIndex(f => f.display === '(-1)');
        if (index >= 0) {
            this.#factors.splice(index, 1);
        }
        else {
            this.#factors.push(new Factor('-1', '1'));
        }
        return this;
    }
    pow(value) {
        this.#factors = this.#factors.map(f => f.pow(value));
        return this;
    }
    primitive() {
        throw new Error("Method not implemented.");
    }
    reduce() {
        const factors = keyFactors(this);
        this.#factors = Object.values(factors)
            .map(f => {
            const base = f[0].polynom;
            const power = f.reduce((acc, f) => acc.add(f.power), new Fraction('0'));
            return new Factor(base, power.reduce());
        })
            .filter(f => !f.power.isZero());
        return this;
    }
    root(value) {
        this.#factors = this.#factors.map(f => f.root(value));
        return this;
    }
    sort() {
        this.#factors = this.#factors
            .sort((a, b) => a.degree().isLeq(b.degree()) ? -1 : 1);
        return this;
    }
    sqrt() {
        this.#factors = this.#factors.map(f => f.sqrt());
        return this;
    }
    subtract(...values) {
        return this.add(...values.map(f => f.opposite()));
    }
    zero() {
        this.#factors = [new Factor('0', '1')];
        return this;
    }
    static gcd(...values) {
        if (values.length === 0) {
            return new PolyFactor().one();
        }
        if (values.length === 1) {
            return values[0];
        }
        if (values.length === 2) {
            return PolyFactor._gcdWith(values[0], values[1]);
        }
        let PF = values[0];
        values.shift();
        values.forEach(value => PF = PolyFactor._gcdWith(PF, value));
        return PF;
    }
    get display() {
        return this.#factors.map(f => f.display).join("");
    }
    get factors() {
        return this.#factors;
    }
    set factors(value) {
        this.#factors = value;
    }
    get tex() {
        return this.#factors.map(f => f.tex).join("");
    }
    get variables() {
        return this.#factors
            .reduce((acc, f) => acc.concat(f.variables), []);
    }
    static _gcdWith(PF1, PF2) {
        const factors1 = keyFactors(PF1);
        const factors2 = keyFactors(PF2);
        const common = Object.keys(factors1).filter(k => Object.hasOwn(factors2, k));
        const factors = common.map(k => {
            const power = factors1[k].reduce((acc, f) => acc.add(f.power), new Fraction('0'));
            const power2 = factors2[k].reduce((acc, f) => acc.add(f.power), new Fraction('0'));
            return new Factor(k, Fraction.min(power, power2));
        });
        return new PolyFactor(...factors);
    }
}
function keyFactors(value) {
    const coefficient = new Fraction().one();
    const kF = value.factors.reduce((acc, f) => {
        if (f.polynom.degree().isZero()) {
            if (f.polynom.monoms.length > 0) {
                coefficient.multiply(f.polynom.monoms[0].coefficient);
            }
            return acc;
        }
        const base = f.polynom.display;
        if (Object.hasOwn(acc, base)) {
            acc[base].push(f);
        }
        else {
            acc[base] = [f];
        }
        return acc;
    }, {});
    if (coefficient.isOne()) {
        return kF;
    }
    kF[coefficient.display] = [new Factor(coefficient.display, 1)];
    return kF;
}
//# sourceMappingURL=polyFactor.js.map