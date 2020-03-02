import {Equation} from "./equation";
import {Monom} from "./monom";
import {Polynom} from "./polynom";
import {Fraction} from "./fraction";


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

    log = (): string => {
        let str:string;

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
            reducedEquations:Equation[] = [],
            steps:number = this._equations.length;

        // Reduce the equations.
        // Do it as long as there is more than one step, but no more than the number of equations.
        for(let L of V){
            // remove the letter from all equations using linear combinations
            if(L===letter){continue;}
            for(let i=0; i<LE.length-1; i++){
                reducedEquations.push(this._linearReduction(LE[i], LE[i+1], L));
            }

            // Keep track of each steps.
            this._resolutionSteps.push(new LinearSystem().create(...reducedEquations));

            // Set the list of equations to the new version.
            LE = this._resolutionSteps[this._resolutionSteps.length-1].clone().equations;
            reducedEquations = [];
            steps--;
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

    private _linearReduction(eq1: Equation, eq2: Equation, letter: string): Equation {
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
    };

    get variables(): string[] {
        let V: string[] = [];
        for (let E of this._equations) {
            V = V.concat(E.variables);
        }
        return [...new Set(V)];
    }

    get tex(): string {
        let texStr: string;

        return texStr;
    };

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