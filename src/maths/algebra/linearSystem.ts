import {Fraction} from "../coefficients";
import {Equation} from "./equation";
import {Polynom} from "./polynom";
import {Monom} from "./monom";
import {Random} from "../random";

// TODO: Must check and rework
export class LinearSystem {
    private _solutions: { [letter: string]: { value: Fraction, isReal: boolean, isVarnothing: boolean } };
    private _resolutionSteps: LinearSystem[];
    private _equations: Equation[];
    private _letters: string[];

    constructor(...equationStrings: string[]) {
        this._equations = [];
        this._letters = 'xy'.split('');

        if (equationStrings !== undefined && equationStrings.length > 0) {
            this.parse(...equationStrings);
        }

        return this;
    }

    // ------------------------------------------
    // Getter and setter
    // ------------------------------------------
    get equations(): Equation[] {
        return this._equations;
    }

    set equations(value) {
        this._equations = value;
    }

    get letters(): string {
        return this._letters.join('')
    }

    set letters(value: string) {
        this._letters = value.split('');
    }

    get isSolvable(): boolean {
        let V = this.variables;

        // TODO: in some case, it is possible to resolve systems if there isn't the isSame number of vars and equations
        if (V.length !== this._equations.length) {
            return false;
        }

        //TODO: Must check if two equations isn't a linear combination of the others ?

        return true;
    }

    get variables(): string[] {
        let V: string[] = [];
        for (let E of this._equations) {
            V = V.concat(E.variables);
        }
        return [...new Set(V)].sort();
    }

    get tex(): string {
        // Build the array of values.
        // Reorder
        // This clone the system :!!!
        //TODO: Avoid cloning this linear system
        let LS = this.clone().reorder(),
            letters = LS.variables,
            equStr: string[],
            equArray: string[] = [],
            m: Monom;

        // TODO: Manage tex output of linear equations
        for (let equ of LS.equations) {
            equStr = [];
            for (let L of letters) {
                m = equ.left.monomByLetter(L);

                if (equStr.length === 0) {
                    equStr.push(m.isZero() ? '' : m.tex);
                } else {
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
        //return `\\left\\{\\begin{array}{rrrcl}${this._equations.map(equ => `${equ.tex}`).join('\\\\\ \n')}\\end{array}\\right.`;
    }

    get solution(): string {
        let tex: string[] = [];

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

    // ------------------------------------------
    // Creation / parsing functions
    // ------------------------------------------
    parse = (...equations: unknown[]): LinearSystem => {
        this._equations = equations.map(value => new Equation(value));
        this._findLetters();
        return this;
    };

    setCoefficient = (...coefficients: string[]): LinearSystem => {
        // Reset the equations list
        this._equations = [];

        let i = 0;
        while (i < coefficients.length - this._letters.length) {
            let left = new Polynom().parse(this._letters.join(''), ...coefficients.slice(i, i + this._letters.length)),
                right = new Polynom(coefficients[i + this._letters.length].toString()),
                equ = new Equation().create(left, right);
            this._equations.push(equ.clone());

            i = i + this._letters.length + 1;
        }
        return this;
    };

    clone = (): LinearSystem => {
        return new LinearSystem().parse(...this._equations.map(equ => equ.clone()));
    };

    setLetters = (...letters: string[]): LinearSystem => {
        this._letters = letters;
        return this
    }
    private _findLetters = (): LinearSystem => {
        // Find all letters used.
        let variables = new Set();

        for (let equ of this._equations) {
            variables = new Set([...variables, ...equ.variables]);
        }

        // TODO: How to transform (Set of string) to string[]
        // @ts-ignore
        this._letters = [...variables];
        return this;
    }

    // -----------------------------------------------
    // Equations generators and randomizers
    // -----------------------------------------------
    generate = (...solutions: Fraction[] | number[]): LinearSystem => {
        let solutionsF: Fraction[] = [];

        // Convert the numbers to fractions if necessary
        for (let s of solutions) {
            if (typeof s === "number") {
                solutionsF.push(new Fraction(s.toString()));
            } else {
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
    private _generateOneEquation = (...solutions: Fraction[]): Equation => {
        let coeff: number[] = [], leftValue: Fraction = new Fraction().zero(),
            letters: string[] = ['x', 'y', 'z', 't', 'u', 'v', 'w', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'],
            equString: string = '', equ: Equation;
        for (let i = 0; i < solutions.length; i++) {
            coeff.push(Random.numberSym(5));
            leftValue.add(solutions[i].clone().multiply(coeff[i]));
            equString += `${(coeff[i] < 0) ? coeff[i] : '+' + coeff[i]}${letters[i]}`
        }

        // LeftValue contains the left part oof the equation - and is then the isSame as the right part.
        // It might be a Fraction.

        // Must check if it's not a linear combination
        equ = new Equation(`${equString}=${leftValue.display}`);
        if (equ.right.monoms[0].coefficient.denominator != 1) {
            equ.multiply(new Fraction(equ.right.monoms[0].coefficient.denominator, 1));
        }
        if (this._checkIfLinerCombination(equ)) {
            return equ;
        } else {
            return this._generateOneEquation(...solutions);
        }
    };


    // ------------------------------------------
    // Mathematical operations
    // ------------------------------------------
    private _linearReduction(eq1: Equation, eq2: Equation, letter: string): Equation {
        // TODO: handle other signs for equations ?
        // Get the monom for the particular letter.
        let c1 = eq1.left.monomByDegree(1, letter).coefficient.clone(),
            c2 = eq2.left.monomByDegree(1, letter).coefficient.clone().opposed();

        return this.mergeEquations(eq1, eq2, c2, c1);
    }

    mergeEquations = (eq1: Equation, eq2: Equation, factor1: unknown, factor2: unknown): Equation => {
        // Set and clone the equations.

        let eq1multiplied = eq1.clone().multiply(new Fraction(factor1)),
            eq2multiplied = eq2.clone().multiply(new Fraction(factor2));

        // Add both equations together.
        eq1multiplied.left.add(eq2multiplied.left);
        eq1multiplied.right.add(eq2multiplied.right);

        return eq1multiplied;
    }


    // ------------------------------------------
    // Solvers algorithm
    // ------------------------------------------
    reorder = (): LinearSystem => {
        for (let E of this._equations) {
            E.reorder();
        }
        return this;
    };

    solve = (): LinearSystem => {
        // Solve it by linear
        this._solutions = {};
        this._resolutionSteps = [];

        // Reorder all equations.
        this.reorder();

        // Get all variables in the linear system
        let V = this.variables.sort();

        for (let letter of V) {
            this._solutions[letter] = this._solveOneLetter(letter, V)
        }

        // TODO: LinearSystem - solve: optimization and handle undetermined and undefined systems.
        return this;
    };

    private _checkIfLinerCombination = (equ: Equation): boolean => {

        return true;
    };

    private _solveOneLetter(letter: string, V: string[]): { value: Fraction, isReal: boolean, isVarnothing: boolean } {
        // list of equations.
        let LE: Equation[] = this.clone().equations,
            reducedEquations: Equation[] = [];

        // Reduce the equations.
        // Do it as long as there is more than one step, but no more than the number of equations.
        for (let L of V) {
            // remove the setLetter from all equations using linear combinations
            if (L === letter) {
                continue;
            }

            // Linear reduction.
            // TODO: Search for better association
            for (let i = 0; i < LE.length - 1; i++) {
                reducedEquations.push(this._linearReduction(LE[i], LE[i + 1], L));
            }

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

        return {
            value: new Fraction(E.solutions[0].value),
            isReal: E.isReal,
            isVarnothing: E.isVarnothing
        }
    }

    // ------------------------------------------
    // Helpers
    // ------------------------------------------
    log = (): string => {
        let str: string = '';

        for (let E of this._equations) {
            console.log(E.tex);
            str += `${E.tex}\\n}`;
        }

        return str;
    };
}
