import { Fraction } from "../coefficients/fraction";
import { Numeric } from "../numeric";
import { Equation } from "./equation";
import { Monom } from "./monom";
import { Polynom } from "./polynom";
export class LinearSystem {
    #equations;
    _variables;
    constructor(...values) {
        this.#equations = [];
        this._variables = 'xyz'.split('');
        if (values.length > 0) {
            this.parse(...values);
        }
        return this;
    }
    parse = (...equations) => {
        this.#equations = equations.map(value => new Equation(value));
        this._findLetters();
        return this;
    };
    clone = () => {
        return new LinearSystem()
            .parse(...this.#equations.map(equ => equ.clone()));
    };
    static fromMatrix(matrix, letters = 'xyz') {
        const cols = matrix[0].length;
        if (matrix.some(row => row.length !== cols)) {
            throw new Error("All rows must have the same number of columns");
        }
        const vars = letters.split('')
            .splice(0, cols - 1);
        return new LinearSystem(...matrix.map(row => {
            const P = new Polynom(vars.join(''), ...row);
            return new Equation(P, 0);
        }));
    }
    add(value, index) {
        if (value instanceof LinearSystem) {
            const length = value.equations.length;
            if (length !== this.#equations.length) {
                throw new Error("The number of equations must be the same");
            }
            for (let i = 0; i < length; i++) {
                this.#equations[i].add(value.equations[i]);
            }
        }
        else {
            if (index === undefined || index < 0 || index >= this.#equations.length) {
                throw new Error("Index out of range");
            }
            const equ = new Equation(value);
            this.#equations[index].add(equ);
        }
        return this;
    }
    buildTex = (equations, operators) => {
        let equStr;
        let m;
        let letters = [];
        const equArray = [];
        for (const equ of equations) {
            letters = letters.concat(equ.letters());
        }
        letters = [...new Set(letters)];
        letters.sort();
        for (let i = 0; i < equations.length; i++) {
            const equ = equations[i];
            equStr = [];
            for (const L of letters) {
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
            if (operators?.[i] !== undefined) {
                equStr[equStr.length - 1] = equStr[equStr.length - 1] + ' \\phantom{\\quad}';
                for (const o of operators[i]) {
                    equStr.push(`\\ \\cdot\\ ${o.startsWith('-') ? "\\left(" + o + "\\right)" : o}`);
                }
            }
            equArray.push(equStr.join('&'));
        }
        let operatorsColumns = 0;
        if (operators !== undefined && operators.length > 0) {
            operatorsColumns = operators[0].length;
        }
        return `\\left\\{\\begin{array}{${"r".repeat(letters.length)}cl ${"|l".repeat(operatorsColumns)}}${equArray.join('\\\\ ')}\\end{array}\\right.`;
    };
    degree(letter) {
        return Fraction.max(...this.#equations.map(equ => equ.degree(letter)));
    }
    get equations() {
        return this.#equations;
    }
    set equations(value) {
        this.#equations = value;
    }
    evaluate(values, asNumeric) {
        throw new Error("Method not implemented.");
    }
    hasVariable(letter) {
        return this._variables.includes(letter);
    }
    isEqual(value) {
        throw new Error("Method not implemented.");
    }
    get isSolvable() {
        const V = this.variables;
        if (V.length !== this.#equations.length) {
            return false;
        }
        return true;
    }
    get matrix() {
        return this._makeMatrix();
    }
    mergeEquations = (eq1, eq2, factor1, factor2) => {
        const eq1multiplied = eq1.clone().multiply(new Fraction(factor1)), eq2multiplied = eq2.clone().multiply(new Fraction(factor2));
        eq1multiplied.left.add(eq2multiplied.left);
        eq1multiplied.right.add(eq2multiplied.right);
        return eq1multiplied;
    };
    multiply(value, index) {
        throw new Error("Method not implemented.");
    }
    reduce() {
        throw new Error("Method not implemented.");
    }
    reorder = () => {
        for (const E of this.#equations) {
            E.reorder();
        }
        return this;
    };
    solve = (withResolution) => {
        this._solutions = {};
        this._resolutionSteps = {};
        this.reorder();
        if (withResolution === undefined) {
            withResolution = false;
        }
        for (const letter of this.variables) {
            this._solutions[letter] = this._solveOneLetter(letter, withResolution);
        }
        return this;
    };
    solveMatrix = () => {
        const [matrix, vector] = this.matrix;
        const augmentedMatrix = matrix.map((row, index) => [...row, vector[index]]);
        for (let i = 0; i < matrix.length; i++) {
            const pivot = augmentedMatrix[i][i].clone();
            augmentedMatrix[i] = augmentedMatrix[i].map(x => x.divide(pivot));
            for (let j = 0; j < matrix.length; j++) {
                if (j === i) {
                    continue;
                }
                const factor = augmentedMatrix[j][i].clone().opposite();
                for (let k = 0; k < augmentedMatrix[j].length; k++) {
                    augmentedMatrix[j][k].add(augmentedMatrix[i][k].clone().multiply(factor));
                }
                if (augmentedMatrix[j].slice(0, augmentedMatrix[j].length - 1).every(x => x.isZero())) {
                    if (augmentedMatrix[j][augmentedMatrix[j].length - 1].isZero()) {
                        return [new Fraction().infinite()];
                    }
                    else {
                        return [];
                    }
                }
            }
        }
        return augmentedMatrix.map(x => x[x.length - 1]);
    };
    stepTex = (letter) => {
        const steps = this._resolutionSteps[letter];
        if (steps === undefined) {
            return '';
        }
        const tex = [];
        for (let i = 0; i < steps.length; i++) {
            tex.push(this.buildTex(steps[i].equations, steps[i].operations));
        }
        return `\\begin{aligned}&${tex.join('\\\\&')}\\end{aligned}`;
    };
    subtract(value, index) {
        if (value instanceof LinearSystem) {
            const length = value.equations.length;
            if (length !== this.#equations.length) {
                throw new Error("The number of equations must be the same");
            }
            for (let i = 0; i < length; i++) {
                this.#equations[i].subtract(value.equations[i]);
            }
        }
        else {
            if (index === undefined || index < 0 || index >= this.#equations.length) {
                throw new Error("Index out of range");
            }
            const equ = new Equation(value);
            this.#equations[index].subtract(equ);
        }
        return this;
    }
    get tex() {
        const LS = this.clone().reorder();
        return this.buildTex(LS.equations);
    }
    get display() {
        return this.tex + 'as display';
    }
    get variables() {
        return this._variables;
    }
    set variables(value) {
        const vars = (typeof value === "string") ? value.split('') : [...value];
        vars.sort();
        this._variables = vars;
    }
    _findLetters = () => {
        let variables = new Set();
        for (const equ of this.#equations) {
            variables = new Set([...variables, ...equ.variables]);
        }
        this._variables = [...variables];
        this._variables.sort();
        return this;
    };
    _linearReduction(eq1, eq2, letter) {
        const c1 = eq1.left.monomByDegree(1, letter).coefficient.clone(), c2 = eq2.left.monomByDegree(1, letter).coefficient.clone().opposite();
        const gcdN = Numeric.gcd(c1.numerator, c2.numerator), gcdD = Numeric.gcd(c1.denominator, c2.denominator);
        c1.divide(gcdN).multiply(gcdD);
        c2.divide(gcdN).multiply(gcdD);
        if (c2.isNegativeOne()) {
            c1.opposite();
            c2.opposite();
        }
        else if (c1.isNegativeOne()) {
            c1.opposite();
            c2.opposite();
        }
        return {
            merged: this.mergeEquations(eq1, eq2, c2, c1),
            factors: [c2, c1]
        };
    }
    _makeMatrix = () => {
        const matrix = [];
        const vector = [];
        for (const E of this.#equations) {
            const row = [];
            const equ = E.clone().reorder();
            for (const L of this.variables) {
                const m = equ.left.monomByLetter(L);
                row.push(m.coefficient);
            }
            vector.push(equ.right.monoms[0].coefficient);
            matrix.push(row);
        }
        return [matrix, vector];
    };
    _solveOneLetter(letter, withResolution) {
        let LE = this.clone().equations, reducedEquations = [], lastIndex;
        this._resolutionSteps[letter] = [];
        for (const L of this.variables) {
            reducedEquations = [];
            if (L === letter) {
                continue;
            }
            if (withResolution) {
                this._resolutionSteps[letter].push({
                    equations: LE.map(x => x.clone()),
                    operations: [...new Array(LE.length)].map(x => [...new Array(LE.length - 1)].map(x => ""))
                });
                lastIndex = this._resolutionSteps[letter].length - 1;
            }
            for (let i = 0; i < LE.length - 1; i++) {
                const result = this._linearReduction(LE[i], LE[i + 1], L);
                reducedEquations.push(result.merged);
                if (withResolution) {
                    this._resolutionSteps[letter][lastIndex].operations[i][i] = result.factors[0].tex;
                    this._resolutionSteps[letter][lastIndex].operations[i + 1][i] = result.factors[1].tex;
                }
            }
            LE = [...reducedEquations];
        }
        const E = LE[0];
        E.solve();
        const solution = E.solutions[0];
        if (withResolution) {
            this._resolutionSteps[letter].push({
                equations: [LE[0]],
                operations: [[LE[0].left.monoms[0].coefficient.tex]]
            });
            let P;
            if (solution.exact instanceof Fraction || typeof solution.exact === "string") {
                P = new Polynom(solution.exact);
            }
            else {
                P = new Polynom(solution.value);
            }
            this._resolutionSteps[letter].push({
                equations: [new Equation(new Polynom(letter), P)],
                operations: []
            });
        }
        return E.solutions[0];
    }
}
//# sourceMappingURL=linearSystem.js.map