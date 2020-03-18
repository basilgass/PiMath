/**
 * Polynom module contains everythin necessary to handle polynoms.
 * @module Polynom
 */

import { Monom } from './monom';
import { Shutingyard } from './shutingyard';
import { Fraction } from './fraction';
import { Numeric } from './numeric';

/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 */
export class Polynom {
    private _monoms: Monom[];
    private _factors: Polynom[];
    private _texString: string;
    private _rawString: string;

    /**
     *
     * @param {string} polynomString (optional) Default polynom to parse on class creation
     */
    constructor (polynomString?: string) {
      this._monoms = [];
      this._factors = [];
      if (polynomString !== undefined) {
        this.parse(polynomString);
      }
    }

    /**
     * Determine if this class is a Polynom.
     */
    isPolynom = () => {
      return true;
    };

    /**
     * Parse a string to a polynom.
     * @param inputStr
     */
    parse = (inputStr: string): Polynom => {
      this._rawString = inputStr;
      return this.shutingYardToReducedPolynom(inputStr);
    };

    parseByCoefficient = (letter: String, ...values:Fraction[]): Polynom => {
        this.empty();

        let n = values.length-1;
        for(let F of values){
            let m = new Monom()
            m.coefficient = F.clone();
            m.literalStr = `${letter}^${n}`
            this.addMonom(m);
            n--;
        }
        return this;
    };

    empty = (): Polynom => {
      this._monoms = [];
      return this;
    };

    /**
     * Set the polynom to zero.
     * @returns {this}
     */
    zero = (): Polynom => {
      this._monoms = [];
      this._monoms.push(new Monom().zero());
      return this;
    };

    clone = (): Polynom => {
      const P = new Polynom();
      const M: Monom[] = [];

      for (const m of this._monoms) {
        M.push(m.clone());
      }

      P.monoms = M;
      return P;
    };

    rndSimple = (degree: number = 1, unit: boolean = false, withFraction: boolean = false, letters: string = 'x', allowZero: boolean = true, numberOfMonoms:number = -1): Polynom => {
      // If the current polynom (this) is already created, initialise it!
      this.empty();

      let M: Monom;
      for (let i = degree; i >= 0; i--) {
        M = new Monom().random(letters, i, withFraction, (i === degree) ? false : allowZero);

        // We want to have the greatest degree monom coefficient to be unit.
        if (unit && i === degree) {
          M.coefficient = new Fraction().parse('1');
        }
        this.addMonom(M);
      }

      // Remove randomly the monoms to match the numer of monoms.
      if (numberOfMonoms > 0 && numberOfMonoms < this.length) {
        this.reorder();
        // Keep the greatest degree monom.
        // But remove randomly the next monoms.
        while (this.length > numberOfMonoms) {
          this._monoms.splice(Numeric.randomInt(1, this.length - 1), 1);
        }
      }
      return this;
    };

    rndFactorable = (degree:number = 2, unit: boolean = false, letters: string = 'x'): Polynom => {
      this._factors = [];
      for (let i = 0; i < degree; i++) {
        this._factors.push(new Polynom().rndSimple(1, unit, false, letters));
      }

      this.empty().monoms = this._factors[0].monoms;
      for (let i = 1; i < this._factors.length; i++) {
        this.multiply(this._factors[i]);
      }
      return this;
    };

    /**
     * This will genereate a not reduced tex string of the polynom.
     * @param complexity : Number of iteration to increase the complexity.
     */
    makeItComplicate = (complexity:number = 1): Polynom => {
      this._texString = '';

      // The poylnom must be at least of the first degree.
      if (this.degree() < 1) { return this; }

      const mDegree = Numeric.randomInt(0, this.degree() - 1);
      const A = new Polynom().rndSimple(mDegree, false, complexity > 1, 'x', false, complexity > 1 ? -1 : 1);
      const B = new Polynom().rndSimple(1, false, complexity > 1);
      const C = this.clone().substract(A.clone().multiply(B));

      // Try to factorize a little bit the C polynom.
      C.factorizePartial(true);
      this._texString = `${A.genDisplay('tex', false, true)} \\cdot ${B.genDisplay('tex', false, true)} ${C.texString} `;

      return this;
    };

    factorizePartial = (forceSign?:boolean): Polynom => {
      this._texString = '';
      // Try to find two monoms with a common coefficient.
      if (this.length <= 1) { return this; }

      let mMain: Monom,
        mCheck: Monom,
        mFactor:Monom,
        pFactor:Polynom,
        // pRemain: Polynom,
        g:number, sign:string;

      for (let i = 0; i < this.length; i++) {
        mMain = this._monoms[i].clone();
        // We factorize only if the main coefficient isn't a fraction
        // if(mMain.coefficient.denominator!==1){continue;}
        for (let j = i + 1; j < this.length; j++) {
          mCheck = this._monoms[j].clone();
          // if(mCheck.coefficient.denominator!==1){continue;}

          g = Numeric.gcd(mMain.coefficient.numerator, mCheck.coefficient.numerator);
          if (g !== 1) {
            // mFactor = mMain.clone().divide(mCheck); // This gets the litteral part.
            // mFactor.coefficient = new Fraction().parseByInteger(g, 1); // Set the coefficient to the gcd.
            mFactor = Monom.lcm(mMain, mCheck);
            sign = mMain.coefficient.sign() === 1 ? '+' : '-';
            this._texString = `${forceSign === true ? sign : (sign === '+' ? '' : sign)}${mFactor.tex}`;

            pFactor = new Polynom().addMonom(mMain.divide(mFactor)).addMonom(mCheck.divide(mFactor));
            this._texString += pFactor.genDisplay('tex', false, true);

            this._texString += this.clone().substract(pFactor.clone().multiplyByMonom(mFactor)).genDisplay('tex', true, false);
            return this;
          }
        }
      }

      this._texString = this.genDisplay('tex', forceSign);

      return this;
    };

    /**
     * Add one or more monoms to the polynoms.
     * @param M
     */
    addMonom = (...M: Monom[]): Polynom => {
      for (const m of M) {
        this._monoms.push(m.clone());
      }
      return this.reduce();
    };

    substractMonom = (...M:Monom[]):Polynom => {
      for (const m of M) {
        this._monoms.push(m.clone().opposed());
      }
      return this.reduce();
    };

    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    shutingYardToReducedPolynom (inputStr: string): Polynom {
      // Get the RPN array of the current expression
      const SY: Shutingyard = new Shutingyard().parse(inputStr);
      const rpn: string[] = SY.rpn;

      const m: Polynom[] = []; let m1: Polynom; let m2: Polynom;

      for (const token of rpn) {
        if (SY.isOperation(token)) {
          m2 = (m.pop()) || new Polynom().zero();
          if (m.length > 0) {
            // Get the first item from the stack
            m1 = (m.pop()) || new Polynom().zero();
          } else {
            // Nothing is in the stack - create an empty polynom
            m1 = new Polynom();
          }

          // console.log(m1.polynom, m2.polynom, token);
          switch (token) {
            case '+':
              m1.add(m2);
              break;
            case '-':
              m1.substract(m2);
              break;
            case '*':
              m1.multiply(m2);
              break;
              // TODO: Shuting yard to polynom divide.
              // case '/': console.log(m1.display, m2.display);m1.divide(m2); break;
              // By default, all not operation value are converted to polynom. Therefore, the pow value must be converted to an integer.
              // TODO: Shuting yard to polynom pow : case '^': m1.pow(+m2.monoms[0].coefficient.numerator); break;
            default:
              console.log('Token not recognized in shuting yard to reduce polynom: ', token);
          }
          m.push(m1);
        } else {
          m.push(new Polynom().addMonom(new Monom().parse(token)));
        }
      }

      this._monoms = m[0].monoms;
      return this;
    }

    // Mathematical operation
    reduce = (): Polynom => {
      for (let i = 0; i < this._monoms.length; i++) {
        for (let j = i + 1; j < this._monoms.length; j++) {
          if (this._monoms[i].isSameAs(this.monoms[j])) {
            this._monoms[i].add(this.monoms[j]);
            this._monoms.splice(j, 1);
          }
        }
      }

      // Remove all null monoms
      this._monoms = this._monoms.filter((m) => {
        return m.coefficient.value !== 0
      });

      // Reduce all monoms coefficient.
      for (const m of this._monoms) {
        m.coefficient.reduce();
      }

      if (this.length === 0) {
        return new Polynom().zero();
      }
      return this;
    };

    /**
     * reduce the coefficient value as if the polynom was equal to zero.
     */
    minify = (): Polynom => {
      // First multiply by the common denominator.
      this.multiplyByInteger(this.lcmDenominator()).divideByInteger(this.gcdNumerator()).reduce();
      return this.reduce();
    };

    factorize = (): Polynom => {
      this._factors = [];
      // TODO: Calculte the factorize system
      return this;
    };

    reorder = (letter: string = 'x'): Polynom => {
      // TODO: Must handle multiple letter reorder system
      this._monoms.sort(function (a, b) {
        return b.degree(letter) - a.degree(letter)
      });
      return this.reduce();
    };

    opposed = (): Polynom => {
      this._monoms = this._monoms.map(m => m.opposed());
      return this;
    };

    add = (P: Polynom): Polynom => {
      this._monoms = this._monoms.concat(P.monoms);
      return this.reduce();
    };

    substract = (P: Polynom): Polynom => {
      this._monoms = this._monoms.concat(P.clone().opposed().monoms);
      return this.reduce();
    };

    multiply = (P: Polynom): Polynom => {
      const M: Monom[] = [];
      for (const m1 of this._monoms) {
        for (const m2 of P.monoms) {
          M.push(Monom.xmultiply(m1, m2));
        }
      }

      this._monoms = M;
      return this.reduce();
    };

    multiplyByFraction = (F:Fraction): Polynom => {
      for (const m of this._monoms) {
        m.coefficient.multiply(F);
      }

      return this.reduce();
    };

    multiplyByInteger = (nb: number): Polynom => {
      return this.multiplyByFraction(new Fraction().parseByInteger(nb));
    };

    multiplyByMonom = (M: Monom): Polynom => {
      for (const m of this._monoms) {
        m.multiply(M)
      }
      return this.reduce();
    };

    mutliplyByFraction = (F:Fraction):Polynom => {
      for (const m of this._monoms) {
        m.coefficient.multiply(F);
      }

      return this;
    };

    divideByInteger = (nb: number): Polynom => {
      const nbF = new Fraction().parseByInteger(nb);
      for (const m of this._monoms) {
        m.coefficient.divide(nbF);
      }
      return this;
    };

    divideByFraction = (F: Fraction): Polynom => {
      for (const m of this._monoms) {
        m.coefficient.divide(F);
      }
      return this;
    };

    replaceBy = (letter:string, P:Polynom): Polynom => {
      let pow:number; const resultPolynom: Polynom = new Polynom().zero();
      for (const m of this.monoms) {
        if (m.literal[letter] === undefined || m.literal[letter] === 0) {
          resultPolynom.addMonom(m.clone());
        } else {
          // We have found a letter.
          // Get the power and reset it.
          pow = +m.literal[letter];
          delete m.literal[letter];

          resultPolynom.add(P.clone().pow(pow).multiplyByMonom(m));
        }
      }

      this._monoms = resultPolynom.reduce().reorder().monoms;
      return this;
    };

    /**
     * Divide the current polynom by two polynoms.
     * @param P
     */
    divide = (P: Polynom): { quotient: Polynom, reminder: Polynom } => {
      const quotient: Polynom = new Polynom().zero();
      const reminder: Polynom = this.clone();
      const maxMP: Monom = P.monomByDegree();
      let newM: Monom;

      // Make the euclidian division of the two polynoms.
      while (reminder.degree() >= P.degree()) {
        // Get the greatest monom divided by the max monom of the divider
        newM = reminder.monomByDegree().clone().divide(maxMP);

        if (newM.isZero) {
          break;
        }

        // Get the new quotient and reminder.
        quotient.addMonom(newM);
        reminder.substract(P.clone().multiplyByMonom(newM));
      }

      return { quotient, reminder };
    };

    pow = (nb: number): Polynom => {
      if (!Number.isSafeInteger(nb)) {
        return this.zero();
      }
      if (nb < 0) {
        return this.zero();
      }
      if (nb === 0) {
        return new Polynom();
      }

      const P = this.clone();
      for (let i = 1; i < nb; i++) {
        this.multiply(P);
      }
      return this.reduce();
    };

    degree = (letter?: string): number => {
      let d: number = 0;
      for (const m of this._monoms) {
        d = Math.max(m.degree(letter), d);
      }
      return d;
    };

    monomByDegree = (degree?: number, letter?: string): Monom => {
      if (degree === undefined) {
        // return the highest degree monom.
        return this.monomByDegree(this.degree(letter));
      }

      // Reduce the polynom.
      const M = this.clone().reduce();
      for (const m of M._monoms) {
        if (m.degree(letter) === degree) {
          return m.clone();
        }
      }

      // NOthing was found - return the null monom.
      return new Monom().zero();
    };


    monomByLetter = (letter: string): Monom => {
        const M = this.clone().reduce();
        for (const m of M._monoms) {
            if (m.hasLetter(letter)) {
                return m.clone();
            }
        }

        return new Monom().zero();
    };

    // Evaluate a polynom.
    evaluate = (values: { [key: string]: Fraction }): Fraction => {
      const r = new Fraction().zero();

      this._monoms.forEach(monom => {
        console.log('Evaluate polynom: ', monom.display, values, monom.evaluate(values).display);
        r.add(monom.evaluate(values));
      });
      return r;
    };

    /**
     * Determine if the current polynom isidivdable by P
     * TODO: should work with any polynom, not only first degree poylnoms and the letter should disapear
     * @param P
     * @param letter - default letter
     */
    canDivide = (P: Polynom, letter: string = 'x'): boolean => {
      const d = P.degree();

      const evalValue: { [key: string]: Fraction } = {};
      // A zero degree polynom can always divide, except if it's the zero polynom.
      if (d === 0) {
        return !P.isTrivial;
      }

      // The polynom is of degreee one.
      if (d === 1) {
        const z = P.getZeroes();
        // The zero is an undefined zero.
        if (z[0] === true || z[0] === false) {
          return false;
        }

        evalValue[letter] = z[0];
        return this.evaluate(evalValue).value === 0;
      }

      // The polynom is of degree 2 or more...
      if (d > 1) {
        console.log('Currently, only first degree polynom are supported');
        return false;
      }

      return false;
    };

    // TODO: get zeroes for more than first degree
    getZeroes = (): (Fraction | boolean)[] => {
      const Z: Fraction[] = [];

      switch (this.degree()) {
        case 0:
          if (this._monoms[0].coefficient.value === 0) {
            return [true];
          } else {
            return [false];
          }
        case 1:
          // There is only one monoms,
          if (this._monoms.length === 1) {
            return [new Fraction().zero()];
          } else {
            const P = this.clone().reduce().reorder();
            return [P.monoms[1].coefficient.opposed().divide(P.monoms[0].coefficient)];
          }
        case 2:
          // Determine the zeros of an equation of second degree.
          return [true, false];
      }
      return Z;
    };

    getDenominators = (): number[] => {
      const denominators: number[] = [];
      for (const m of this._monoms) {
        denominators.push(m.coefficient.denominator);
      }
      return denominators;
    };

    getNumerators = (): number[] => {
      const numerators: number[] = [];
      for (const m of this._monoms) {
        numerators.push(m.coefficient.numerator);
      }
      return numerators;
    };

    lcmDenominator = (): number => {
      return Numeric.lcm(...this.getDenominators());
    };

    gcdDenominator = (): number => {
      return Numeric.gcd(...this.getDenominators());
    };

    lcmNumerator = (): number => {
      return Numeric.lcm(...this.getNumerators());
    };

    gcdNumerator = (): number => {
      return Numeric.gcd(...this.getNumerators());
    };

    /**
     * Compare this polynom with another one.
     * @param P
     */
    isSameAs = (P: Polynom): boolean => {
      // Create clone version to reduce them without altering the original polynoms.
      const cP1 = this.clone().reduce().reorder();
      const cP2 = P.clone().reduce().reorder();

      // Both haven't the same number of monoms.
      if (cP1.length !== cP2.length) {
        return false;
      }

      // They must have the same degree.
      if (cP1.degree() !== cP2.degree()) {
        return false;
      }

      for (const i in cP1.monoms) {
        if (!cP1.monoms[i].isEqual(cP2.monoms[i])) {
          return false;
        }
      }

      return true;
    };

    isOpposedAt = (P: Polynom): boolean => {
      return this.isSameAs(P.clone().opposed());
    };

    private _genDisplayAddPlus = (P:string, k:Monom, forceSign?:boolean):string => {
        return (k.coefficient.sign() === 1 && (P !== '' || forceSign === true))?'+':'';
    };

    private genDisplay = (output?: string, forceSign?: boolean, wrapParentheses?: boolean): string => {
      let P: string = '';
      for (const k of this._monoms) {
        if (k.coefficient.value === 0) {
          continue;
        }

        P += `${this._genDisplayAddPlus(P, k, forceSign)}${(output === 'tex') ? k.tex : k.display}`;
      }

      if (wrapParentheses === true && this.length > 1) {
        if (output === 'tex') {
          P = `\\left( ${P} \\right)`;
        } else {
          P = `(${P})`;
        }
      }

      if (P === '') { P = '0'; }
      return P;
    };

    // Getter and setter
    get length () {
      // TODO: Must reduce the monoms list to rmeove the zero coefficient.
      return this._monoms.length;
    }

    get monoms () {
      return this._monoms;
    }

    set monoms (M: Monom[]) {
      this._monoms = M;
    }

    get display ():string {
      return this.genDisplay();
    }

    get raw ():string {
        return this._rawString
    }
    get tex ():string {
      return this.genDisplay('tex');
    }

    get texString ():string {
      return this._texString;
    }

    get isTrivial ():boolean {
      return this._monoms.length === 0 && this._monoms[0].coefficient.value === 0;
    }

    get isMultiVariable ():boolean {
      const B = false;
      for (const m of this._monoms) {
        if (m.isMultiVariable) { return true; }
      }
      return B;
    }

    get factors ():Polynom[] {
      return this._factors;
    }

    set factors (value:Polynom[]) {
      this._factors = value;
    }

    get variables ():string[] {
      let V:string[] = [];

      for (const m of this._monoms) {
        V = V.concat(m.variables);
      }

      // Remove duplicates.
      V = [...new Set(V)];

      return V;
    }

    get numberOfVars ():number {
      return this.variables.length;
    }
}
