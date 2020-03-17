import {Equation} from "./equation";
import {Fraction} from "./fraction";
import {Numeric} from "./numeric";
import {Monom} from "./monom";


export class LinearSystem {
    private _equations: Equation[];
    private _solutions: { [letter:string]: {value:Fraction, isReal:boolean, isVarnothing:boolean} };
    private _resolutionSteps: LinearSystem[];

    constructor() {
    }

    create = (...equations: Equation[]): LinearSystem => {
        this._equations = equations;
        return this;
    };

    parse = (...equStrs: string[]): LinearSystem => {
        this._equations = equStrs.map(value => new Equation(value));
        return this;
    };

    generate = (...solutions: Fraction[]|number[]): LinearSystem => {
        let solutionsF:Fraction[] = [];

        // Convert the numbers to fractions if necessary
        for(let s of solutions){
            if(typeof s==="number"){
                solutionsF.push(new Fraction(s.toString()));
            }else{
                solutionsF.push(s.clone());
            }
        }

        // Create the equations and make sure they are not linear combined.
        this._equations = [];
        for(let i=0; i<solutions.length; i++) {
            this._equations.push(this._generateOneEquation(...solutionsF));
        }
        return this;
    };

    private _generateOneEquation = (...solutions:Fraction[]):Equation => {
        let coeff:number[] = [], leftValue: Fraction = new Fraction().zero(),
        letters:string[] = ['x', 'y', 'z', 't', 'u', 'v', 'w', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'],
        equString:string = '', equ:Equation;
        for(let i=0; i<solutions.length; i++){
            coeff.push(Numeric.randomIntSym(5));
            leftValue.add(solutions[i].clone().multiplyByInt(coeff[i]));
            equString += `${(coeff[i]<0)?coeff[i]:'+'+coeff[i]}${letters[i]}`
        }

        // LeftValue contains the left part oof the equation - and is then the same as the right part.
        // It might be a Fraction.

        // Must check if it's not a linear combination
        equ = new Equation(`${equString}=${leftValue.display}`);
        if(equ.right.monoms[0].coefficient.denominator!=1){
            equ.multiply(new Fraction().parseByInteger(equ.right.monoms[0].coefficient.denominator,1));
        }
        if(this._checkIfLinerCombination(equ)){
            return equ;
        }else{
            return this._generateOneEquation(...solutions);
        }
    };
    private _checkIfLinerCombination = (equ:Equation):boolean => {

        return true;
    };

    log = (): string => {
        let str:string = '';

        for(let E of this._equations){
            console.log(E.tex);
            str += `${E.tex}\\n}`;
        }

        return str;
    };

    clone = (): LinearSystem => {
        let equs: Equation[] = [];
        for (let e of this._equations) {
            equs.push(e.clone());
        }
        return new LinearSystem().create(...equs);
    };

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

        for(let letter of V){
            this._solutions[letter] = this._solveOneLetter(letter, V)
        }

        // TODO: LinearSystem - solve: optimization and handle undetermined and undefined systems.
        return this;
    };

    private _solveOneLetter(letter: string, V:string[]):{value:Fraction, isReal:boolean, isVarnothing:boolean} {
        // list of equations.
        console.log('SOLVE: ', letter);


        let LE:Equation[] = this.clone().equations,
            reducedEquations:Equation[] = [];

        // Reduce the equations.
        // Do it as long as there is more than one step, but no more than the number of equations.
        for(let L of V){
            // remove the letter from all equations using linear combinations
            if(L===letter){continue;}
            for(let i=0; i<LE.length-1; i++){
                reducedEquations.push(LinearSystem._linearReduction(LE[i], LE[i+1], L));
            }

            // Keep track of each steps.
            this._resolutionSteps.push(new LinearSystem().create(...reducedEquations));

            // Set the list of equations to the new version.
            LE = this._resolutionSteps[this._resolutionSteps.length-1].clone().equations;
            reducedEquations = [];
        }

        // Solve the equations
        let E = this._resolutionSteps[this._resolutionSteps.length-1].equations[0];
        console.log(E.tex);
        E.solve();

        console.log(E.solutions);
        return {
            value: new Fraction(E.solutions[0]),
            isReal: E.isReal,
            isVarnothing: E.isVarvothing
        }
    }

    private static _linearReduction(eq1: Equation, eq2: Equation, letter: string): Equation {
        // TODO: handle other signs for equations ?
        // Get the monom for the particular letter.
        let c1 = eq1.left.monomByDegree(1, letter).coefficient.clone(),
            c2 = eq2.left.monomByDegree(1, letter).coefficient.clone();

        // Output equation
        return eq1.clone().multiply(c2).substract(eq2.clone().multiply(c1)).reorder();
    }

    // Getter and setter
    get isSolvable(): boolean {
        let V = this.variables;

        // TODO: in some case, it is possible to resolve systems if there isn't the same number of vars and equations
        if (V.length !== this._equations.length) {
            return false;
        }

        //TOOD: Must check if two equations isn't a linear combination of the others ?

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
        let LS = this.clone().reorder(),
            letters = LS.variables,
            equStr: string[],
            equArray: string[] = [],
            m: Monom;

        // TODO: Manage tex output of linear equations
        for(let equ of LS.equations){
            equStr = [];
            for(let L of letters){
                m = equ.left.monomByLetter(L);

                if(equStr.length===0){
                    equStr.push(m.isZero?'':m.tex);
                }else{
                    equStr.push(m.isZero?'':((m.coefficient.sign()===1)?'+':'')+m.tex);
                }
            }

            // Add the equal sign
            equStr.push('=');

            // Add the right hand part of the equation (should be only a number, because it has been reorderd)
            equStr.push(equ.right.tex);

            // Add to the list.
            equArray.push(equStr.join('&'));
        }


        return `\\left\\{<br>\\begin{array}{${"r".repeat(letters.length)}cl}<br>${equArray.join('\\\\\ <br>')}<br>\\end{array}<br>\\right.`;
        //return `\\left\\{\\begin{array}{rrrcl}${this._equations.map(equ => `${equ.tex}`).join('\\\\\ \n')}\\end{array}\\right.`;
    }

    get texSolution(): string {
        let tex:string[] = [];

        if(this._solutions===undefined){this.solve();}

        for(let letter in this._solutions){
            if(this._solutions[letter].isReal){
                console.log(`Undetermined (letter ${letter})`);
                return;
            }
            if(this._solutions[letter].isVarnothing){
                console.log(`Undefined (letter ${letter})`);
                return;
            }

            tex.push(this._solutions[letter].value.dfrac);
        }



        return `(${tex.join(';')})`;
    }


    set equations(value){
        this._equations = value;
    }
    get equations(): Equation[] {
        return this._equations;
    }
}