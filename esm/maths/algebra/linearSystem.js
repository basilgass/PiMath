"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearSystem = void 0;
const equation_1 = require("./equation");
const fraction_1 = require("../coefficients/fraction");
const polynom_1 = require("./polynom");
// TODO: Must check and rework
class LinearSystem {
    constructor(...equationStrings) {
        this.buildTex = (equations, operators) => {
            let equStr, equArray = [], m, letters = [];
            // Get the letters from the linear system
            for (let equ of equations) {
                letters = letters.concat(equ.letters());
            }
            letters = [...new Set(letters)];
            letters.sort();
            for (let i = 0; i < equations.length; i++) {
                let equ = equations[i];
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
                // Add the equal sign
                equStr.push('=');
                // Add the right hand part of the equation (should be only a number, because it has been reordered)
                equStr.push(equ.right.tex);
                // Add the operations if existing
                if (operators !== undefined && operators[i] !== undefined) {
                    // add extra space at the end of the equation
                    equStr[equStr.length - 1] = equStr[equStr.length - 1] + ' \\phantom{\\quad}';
                    for (let o of operators[i]) {
                        equStr.push(`\\ \\cdot\\ ${o.startsWith('-') ? "\\left(" + o + "\\right)" : o}`);
                    }
                }
                // Add to the list.
                equArray.push(equStr.join('&'));
            }
            let operatorsColumns = 0;
            if (operators !== undefined && operators.length > 0) {
                operatorsColumns = operators[0].length;
            }
            return `\\left\\{\\begin{array}{${"r".repeat(letters.length)}cl ${"|l".repeat(operatorsColumns)}}${equArray.join('\\\\\ ')}\\end{array}\\right.`;
        };
        this.stepTex = (letter) => {
            const steps = this._resolutionSteps[letter];
            if (steps === undefined) {
                return '';
            }
            // steps = { equations[], operations: [[],[]]
            let tex = [];
            for (let i = 0; i < steps.length; i++) {
                tex.push(this.buildTex(steps[i].equations, steps[i].operations));
            }
            return `\\begin{aligned}&${tex.join('\\\\&')}\\end{aligned}`;
        };
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        this.parse = (...equations) => {
            // make the original equations
            this._equations = equations.map(value => new equation_1.Equation(value));
            // get the letters.
            this._findLetters();
            return this;
        };
        this.clone = () => {
            return new LinearSystem().parse(...this._equations.map(equ => equ.clone()));
        };
        // ------------------------------------------
        this.reorder = () => {
            for (let E of this._equations) {
                E.reorder();
            }
            return this;
        };
        // -----------------------------------------------
        // Equations solving algorithms
        this.solve = (withResolution) => {
            // Solve it by linear
            this._solutions = {};
            this._resolutionSteps = {};
            // Reorder all equations.
            this.reorder();
            if (withResolution === undefined) {
                withResolution = false;
            }
            for (let letter of this.variables) {
                this._solutions[letter] = this._solveOneLetter(letter, withResolution);
            }
            // TODO: LinearSystem - solve: optimization and handle undetermined and undefined systems.
            return this;
        };
        this.mergeEquations = (eq1, eq2, factor1, factor2) => {
            // Set and clone the equations.
            let eq1multiplied = eq1.clone().multiply(new fraction_1.Fraction(factor1)), eq2multiplied = eq2.clone().multiply(new fraction_1.Fraction(factor2));
            // Add both equations together.
            eq1multiplied.left.add(eq2multiplied.left);
            eq1multiplied.right.add(eq2multiplied.right);
            return eq1multiplied;
        };
        this._findLetters = () => {
            // Find all letters used.
            let variables = new Set();
            for (let equ of this._equations) {
                variables = new Set([...variables, ...equ.variables]);
            }
            this._letters = [...variables];
            this._letters.sort();
            return this;
        };
        // TODO: allow construction to accept an array of values (like a matrix) to build the equations
        this._equations = [];
        this._letters = 'xyz'.split('');
        if (equationStrings !== undefined && equationStrings.length > 0) {
            this.parse(...equationStrings);
        }
        return this;
    }
    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
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
        // TODO: in some case, it is possible to resolve systems if there isn't the isSame number of vars and equations
        if (V.length !== this._equations.length) {
            return false;
        }
        //TODO: Must check if two equations isn't a linear combination of the others ?
        return true;
    }
    get variables() {
        return this._letters;
    }
    get tex() {
        // Build the array of values.
        // Reorder
        // This clone the system :!!!
        //TODO: Avoid cloning this linear system
        let LS = this.clone().reorder(), letters = LS.variables;
        return this.buildTex(LS.equations);
    }
    get solution() {
        let tex = [];
        if (this._solutions === undefined) {
            this.solve();
        }
        for (let letter in this._solutions) {
            if (this._solutions[letter].display === "RR") {
                return `\\left\\{ \\left(${this._letters.join(';')}\\right) \\big\\vert ${this.equations[0].tex} \\right\\}`;
            }
            if (this._solutions[letter].display === "O/") {
                return `\\varnothing`;
            }
            tex.push(this._solutions[letter].tex);
        }
        return `\\left(${tex.join(';')}\\right)`;
    }
    _linearReduction(eq1, eq2, letter) {
        // Get the monom for the particular letter.
        let c1 = eq1.left.monomByDegree(1, letter).coefficient.clone(), c2 = eq2.left.monomByDegree(1, letter).coefficient.clone().opposed();
        // if one value is -1, use 1 and make the other one opposed
        if (c2.isNegativeOne()) {
            c1.opposed();
            c2.opposed();
        }
        else if (c1.isNegativeOne()) {
            c1.opposed();
            c2.opposed();
        }
        return {
            merged: this.mergeEquations(eq1, eq2, c2, c1),
            factors: [c2, c1]
        };
    }
    /**
     * Linear reduction of the equations to have only one letter
     * @param letter    letter to isolate
     * @private
     */
    _solveOneLetter(letter, withResolution) {
        // list of equations.
        let LE = this.clone().equations, reducedEquations = [], lastIndex;
        this._resolutionSteps[letter] = [];
        // Reduce the equations.
        // Do it as long as there is more than one step, but no more than the number of equations.
        for (let L of this.variables) {
            // Reset the stack
            reducedEquations = [];
            // remove the setLetter from all equations using linear combinations
            if (L === letter)
                continue;
            if (withResolution) {
                this._resolutionSteps[letter].push({
                    equations: LE.map(x => x.clone()),
                    operations: [...new Array(LE.length)].map(x => [...new Array(LE.length - 1)].map(x => ""))
                });
                lastIndex = this._resolutionSteps[letter].length - 1;
            }
            // Linear reduction.
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
        // Solve the equations
        // let E = this._resolutionSteps[this._resolutionSteps.length - 1].equations[0];
        let E = LE[0];
        E.solve();
        const solution = E.solutions[0];
        if (withResolution) {
            this._resolutionSteps[letter].push({
                equations: [LE[0]],
                operations: [[LE[0].left.monoms[0].coefficient.tex]]
            });
            let P;
            if (solution.exact instanceof fraction_1.Fraction || typeof solution.exact === "string") {
                P = new polynom_1.Polynom(solution.exact);
            }
            else {
                P = new polynom_1.Polynom(solution.value);
            }
            this._resolutionSteps[letter].push({
                equations: [new equation_1.Equation(new polynom_1.Polynom(letter), P)],
                operations: []
            });
        }
        return E.solutions[0];
    }
}
exports.LinearSystem = LinearSystem;
//# sourceMappingURL=linearSystem.js.map