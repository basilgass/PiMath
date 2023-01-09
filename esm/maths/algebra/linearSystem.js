"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearSystem = void 0;
const equation_1 = require("./equation");
const polynom_1 = require("./polynom");
const random_1 = require("../randomization/random");
const fraction_1 = require("../coefficients/fraction");
// TODO: Must check and rework
class LinearSystem {
    constructor(...equationStrings) {
        // ------------------------------------------
        // Creation / parsing functions
        // ------------------------------------------
        this.parse = (...equations) => {
            this._equations = equations.map(value => new equation_1.Equation(value));
            this._findLetters();
            return this;
        };
        this.setCoefficient = (...coefficients) => {
            // Reset the equations list
            this._equations = [];
            let i = 0;
            while (i < coefficients.length - this._letters.length) {
                let left = new polynom_1.Polynom().parse(this._letters.join(''), ...coefficients.slice(i, i + this._letters.length)), right = new polynom_1.Polynom(coefficients[i + this._letters.length].toString()), equ = new equation_1.Equation().create(left, right);
                this._equations.push(equ.clone());
                i = i + this._letters.length + 1;
            }
            return this;
        };
        this.clone = () => {
            return new LinearSystem().parse(...this._equations.map(equ => equ.clone()));
        };
        this.setLetters = (...letters) => {
            this._letters = letters;
            return this;
        };
        this._findLetters = () => {
            // Find all letters used.
            let variables = new Set();
            for (let equ of this._equations) {
                variables = new Set([...variables, ...equ.variables]);
            }
            // TODO: How to transform (Set of string) to string[]
            // @ts-ignore
            this._letters = [...variables];
            return this;
        };
        // -----------------------------------------------
        // Equations generators and randomizers
        // -----------------------------------------------
        this.generate = (...solutions) => {
            let solutionsF = [];
            // Convert the numbers to fractions if necessary
            for (let s of solutions) {
                if (typeof s === "number") {
                    solutionsF.push(new fraction_1.Fraction(s.toString()));
                }
                else {
                    solutionsF.push(s.clone());
                }
            }
            // Create the equations and make sure they are not linear combined.
            this._equations = [];
            for (let i = 0; i < solutions.length; i++) {
                this._equations.push(this._generateOneEquation(...solutionsF));
            }
            return this;
        };
        this._generateOneEquation = (...solutions) => {
            let coeff = [], leftValue = new fraction_1.Fraction().zero(), letters = ['x', 'y', 'z', 't', 'u', 'v', 'w', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'], equString = '', equ;
            for (let i = 0; i < solutions.length; i++) {
                coeff.push(random_1.Random.numberSym(5));
                leftValue.add(solutions[i].clone().multiply(coeff[i]));
                equString += `${(coeff[i] < 0) ? coeff[i] : '+' + coeff[i]}${letters[i]}`;
            }
            // LeftValue contains the left part oof the equation - and is then the isSame as the right part.
            // It might be a Fraction.
            // Must check if it's not a linear combination
            equ = new equation_1.Equation(`${equString}=${leftValue.display}`);
            if (equ.right.monoms[0].coefficient.denominator != 1) {
                equ.multiply(new fraction_1.Fraction(equ.right.monoms[0].coefficient.denominator, 1));
            }
            if (this._checkIfLinerCombination(equ)) {
                return equ;
            }
            else {
                return this._generateOneEquation(...solutions);
            }
        };
        this.mergeEquations = (eq1, eq2, factor1, factor2) => {
            // Set and clone the equations.
            let eq1multiplied = eq1.clone().multiply(new fraction_1.Fraction(factor1)), eq2multiplied = eq2.clone().multiply(new fraction_1.Fraction(factor2));
            // @ts-ignore
            console.log(eq1.tex, eq1multiplied.tex, factor1.tex);
            // @ts-ignore
            console.log(eq2.tex, eq2multiplied.tex, factor2.tex);
            // Add both equations together.
            eq1multiplied.left.add(eq2multiplied.left);
            eq1multiplied.right.add(eq2multiplied.right);
            console.log('resulting reduction', eq1multiplied.tex);
            return eq1multiplied;
        };
        // ------------------------------------------
        // Solvers algorithm
        // ------------------------------------------
        this.reorder = () => {
            for (let E of this._equations) {
                E.reorder();
            }
            return this;
        };
        this.solve = () => {
            // Solve it by linear
            this._solutions = {};
            this._resolutionSteps = [];
            // Reorder all equations.
            this.reorder();
            // Get all variables in the linear system
            let V = this.variables.sort();
            for (let letter of V) {
                console.log('SOLVING FOR', letter);
                this._solutions[letter] = this._solveOneLetter(letter, V);
            }
            // TODO: LinearSystem - solve: optimization and handle undetermined and undefined systems.
            return this;
        };
        this._checkIfLinerCombination = (equ) => {
            return true;
        };
        // ------------------------------------------
        // Helpers
        // ------------------------------------------
        this.log = () => {
            let str = '';
            for (let E of this._equations) {
                str += `${E.tex}\\n}`;
            }
            return str;
        };
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
        let V = [];
        for (let E of this._equations) {
            V = V.concat(E.variables);
        }
        return [...new Set(V)].sort();
    }
    get tex() {
        // Build the array of values.
        // Reorder
        // This clone the system :!!!
        //TODO: Avoid cloning this linear system
        let LS = this.clone().reorder(), letters = LS.variables, equStr, equArray = [], m;
        // TODO: Manage tex output of linear equations
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
            // Add the equal sign
            equStr.push('=');
            // Add the right hand part of the equation (should be only a number, because it has been reordered)
            equStr.push(equ.right.tex);
            // Add to the list.
            equArray.push(equStr.join('&'));
        }
        return `\\left\\{\\begin{array}{${"r".repeat(letters.length)}cl}${equArray.join('\\\\\ ')}\\end{array}\\right.`;
    }
    get solution() {
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
            tex.push(this._solutions[letter].value.tex);
        }
        return `\\left(${tex.join(';')}\\right)`;
    }
    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    _linearReduction(eq1, eq2, letter) {
        // TODO: handle other signs for equations ?
        // Get the monom for the particular letter.
        let c1 = eq1.left.monomByDegree(1, letter).coefficient.clone(), c2 = eq2.left.monomByDegree(1, letter).coefficient.clone().opposed();
        console.log('reduction: ', letter, eq1.tex, eq2.tex, c2.tex, c1.tex);
        return this.mergeEquations(eq1, eq2, c2, c1);
    }
    /**
     * Linear reduction of the equations to have only one letter
     * @param letter    letter to isolate
     * @param V         list of variables in the linear system.
     * @private
     */
    _solveOneLetter(letter, V) {
        // list of equations.
        let LE = this.clone().equations, reducedEquations = [];
        // Reduce the equations.
        // Do it as long as there is more than one step, but no more than the number of equations.
        for (let L of V) {
            // remove the setLetter from all equations using linear combinations
            if (L === letter) {
                continue;
            }
            console.log('Removing the variable:  ', L);
            // Linear reduction.
            // TODO: Search for better association
            for (let i = 0; i < LE.length - 1; i++) {
                reducedEquations.push(this._linearReduction(LE[i], LE[i + 1], L));
            }
            console.log(reducedEquations.map(x => x.tex));
            // Keep track of each steps.
            this._resolutionSteps.push(new LinearSystem().parse(...reducedEquations));
            // Set the list of equations to the new version.
            LE = this._resolutionSteps[this._resolutionSteps.length - 1].clone().equations;
            // Reset the stack
            reducedEquations = [];
        }
        // Solve the equations
        let E = this._resolutionSteps[this._resolutionSteps.length - 1].equations[0];
        E.solve();
        console.log('Solutions for ', letter, ': ', E.solutions[0].tex);
        return {
            value: new fraction_1.Fraction(E.solutions[0].value),
            isReal: E.isReal,
            isVarnothing: E.isVarnothing
        };
    }
}
exports.LinearSystem = LinearSystem;
//# sourceMappingURL=linearSystem.js.map