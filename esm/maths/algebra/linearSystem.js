import { Fraction } from "../coefficients/fraction";
import { Equation } from "./equation";
import { Polynom } from "./polynom";
import { Random } from "../random/random";
export class LinearSystem {
    _solutions;
    _resolutionSteps;
    _equations;
    _letters;
    constructor(...equationStrings) {
        this._equations = [];
        this._letters = 'xy'.split('');
        if (equationStrings !== undefined && equationStrings.length > 0) {
            this.parse(...equationStrings);
        }
        return this;
    }
    get isLinerarSystem() {
        return true;
    }
    get equations() {
        return this._equations;
    }
    set equations(value) {
        this._equations = value;
    }
    get letters() {
        return this._letters.join('');
    }
    set letters(value) {
        this._letters = value.split('');
    }
    get isSolvable() {
        let V = this.variables;
        if (V.length !== this._equations.length) {
            return false;
        }
        return true;
    }
    get variables() {
        let V = [];
        for (let E of this._equations) {
            V = V.concat(E.variables);
        }
        return [...new Set(V)].sort();
    }
    get tex() {
        let LS = this.clone().reorder(), letters = LS.variables, equStr, equArray = [], m;
        for (let equ of LS.equations) {
            equStr = [];
            for (let L of letters) {
                m = equ.left.monomByLetter(L);
                if (equStr.length === 0) {
                    equStr.push(m.isZero() ? '' : m.tex);
                }
                else {
                    equStr.push(m.isZero() ? '' : ((m.coefficient.sign() === 1) ? '+' : '') + m.tex);
                }
            }
            equStr.push('=');
            equStr.push(equ.right.tex);
            equArray.push(equStr.join('&'));
        }
        return `\\left\\{\\begin{array}{${"r".repeat(letters.length)}cl}${equArray.join('\\\\\ ')}\\end{array}\\right.`;
    }
    get texSolution() {
        let tex = [];
        if (this._solutions === undefined) {
            this.solve();
        }
        for (let letter in this._solutions) {
            if (this._solutions[letter].isReal) {
                console.log(`Undetermined (letter ${letter})`);
                return;
            }
            if (this._solutions[letter].isVarnothing) {
                console.log(`Undefined (letter ${letter})`);
                return;
            }
            tex.push(this._solutions[letter].value.dfrac);
        }
        return `(${tex.join(';')})`;
    }
    parse = (...equations) => {
        this._equations = equations.map(value => new Equation(value));
        this._findLetters();
        return this;
    };
    setCoefficient = (...coefficients) => {
        this._equations = [];
        let i = 0;
        while (i < coefficients.length - this._letters.length) {
            let left = new Polynom().parse(this._letters.join(''), ...coefficients.slice(i, i + this._letters.length)), right = new Polynom(coefficients[i + this._letters.length].toString()), equ = new Equation().create(left, right);
            this._equations.push(equ.clone());
            i = i + this._letters.length + 1;
        }
        return this;
    };
    clone = () => {
        return new LinearSystem().parse(...this._equations.map(equ => equ.clone()));
    };
    setLetters = (...letters) => {
        this._letters = letters;
        return this;
    };
    _findLetters = () => {
        let variables = new Set();
        for (let equ of this._equations) {
            variables = new Set([...variables, ...equ.variables]);
        }
        this._letters = [...variables];
        return this;
    };
    generate = (...solutions) => {
        let solutionsF = [];
        for (let s of solutions) {
            if (typeof s === "number") {
                solutionsF.push(new Fraction(s.toString()));
            }
            else {
                solutionsF.push(s.clone());
            }
        }
        this._equations = [];
        for (let i = 0; i < solutions.length; i++) {
            this._equations.push(this._generateOneEquation(...solutionsF));
        }
        return this;
    };
    _generateOneEquation = (...solutions) => {
        let coeff = [], leftValue = new Fraction().zero(), letters = ['x', 'y', 'z', 't', 'u', 'v', 'w', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'], equString = '', equ;
        for (let i = 0; i < solutions.length; i++) {
            coeff.push(Random.numberSym(5));
            leftValue.add(solutions[i].clone().multiply(coeff[i]));
            equString += `${(coeff[i] < 0) ? coeff[i] : '+' + coeff[i]}${letters[i]}`;
        }
        equ = new Equation(`${equString}=${leftValue.display}`);
        if (equ.right.monoms[0].coefficient.denominator != 1) {
            equ.multiply(new Fraction(equ.right.monoms[0].coefficient.denominator, 1));
        }
        if (this._checkIfLinerCombination(equ)) {
            return equ;
        }
        else {
            return this._generateOneEquation(...solutions);
        }
    };
    _linearReduction(eq1, eq2, letter) {
        let c1 = eq1.left.monomByDegree(1, letter).coefficient.clone(), c2 = eq2.left.monomByDegree(1, letter).coefficient.clone().opposed();
        return this.mergeEquations(eq1, eq2, c2, c1);
    }
    mergeEquations = (eq1, eq2, factor1, factor2) => {
        let eq1multiplied = eq1.clone().multiply(new Fraction(factor1)), eq2multiplied = eq2.clone().multiply(new Fraction(factor2));
        eq1multiplied.left.add(eq2multiplied.left);
        eq1multiplied.right.add(eq2multiplied.right);
        return eq1multiplied;
    };
    reorder = () => {
        for (let E of this._equations) {
            E.reorder();
        }
        return this;
    };
    solve = () => {
        this._solutions = {};
        this._resolutionSteps = [];
        this.reorder();
        let V = this.variables.sort();
        for (let letter of V) {
            this._solutions[letter] = this._solveOneLetter(letter, V);
        }
        return this;
    };
    _checkIfLinerCombination = (equ) => {
        return true;
    };
    _solveOneLetter(letter, V) {
        let LE = this.clone().equations, reducedEquations = [];
        for (let L of V) {
            if (L === letter) {
                continue;
            }
            for (let i = 0; i < LE.length - 1; i++) {
                reducedEquations.push(this._linearReduction(LE[i], LE[i + 1], L));
            }
            this._resolutionSteps.push(new LinearSystem().parse(...reducedEquations));
            LE = this._resolutionSteps[this._resolutionSteps.length - 1].clone().equations;
            reducedEquations = [];
        }
        let E = this._resolutionSteps[this._resolutionSteps.length - 1].equations[0];
        E.solve();
        return {
            value: new Fraction(E.solutions[0]),
            isReal: E.isReal,
            isVarnothing: E.isVarnothing
        };
    }
    log = () => {
        let str = '';
        for (let E of this._equations) {
            console.log(E.tex);
            str += `${E.tex}\\n}`;
        }
        return str;
    };
}
//# sourceMappingURL=linearSystem.js.map