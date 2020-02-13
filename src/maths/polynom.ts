import {Monom} from "./monom";
import {Shutingyard} from "./shutingyard";
import {Fraction} from "./fraction";
import {Numeric} from "./numeric";

export class Polynom {
    private _monoms: Monom[];

    constructor() {
        this._monoms = [];
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
        return this.shutingYardToReducedPolynom(inputStr);
    };

    empty = (): Polynom => {
        this._monoms = [];
        return this;
    };

    zero = (): Polynom => {
        this._monoms = [];
        this._monoms.push(new Monom().zero());
        return this;
    };

    clone = (): Polynom => {
        let P = new Polynom(),
            M: Monom[] = [];

        for (let m of this._monoms) {
            M.push(m.clone());
        }

        P.monoms = M;
        return P;
    };

    rndSimple = (degree: number = 1, letters: string = 'x', unit: boolean = false, withFraction: boolean = false, allowZero: boolean = true): Polynom => {
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
        return this;
    };
    rndFactorable = (): Polynom => {
        this.empty();
        return this;
    };

    /**
     * Add one or more monoms to the polynoms.
     * @param M
     */
    addMonom = (...M: Monom[]): Polynom => {
        for (let m of M) {
            this._monoms.push(m);
        }
        return this.reduce();
    };

    /**
     * Main parse using a shutting yard class
     * @param inputStr
     */
    shutingYardToReducedPolynom(inputStr: string): Polynom {
        // Get the RPN array of the current expression
        let SY: Shutingyard = new Shutingyard().parse(inputStr),
            rpn: string[] = SY.rpn;

        let m: Polynom[] = [], m1: Polynom, m2: Polynom;

        for (let token of rpn) {
            if (SY.isOperation(token)) {
                m2 = (m.pop()) || new Polynom().zero();
                if (m.length > 0) {
                    // Get the first item from the stack
                    m1 = (m.pop()) || new Polynom().zero();
                } else {
                    // Nothing is in the stack - create an empty polynom
                    m1 = new Polynom();
                }

                //console.log(m1.polynom, m2.polynom, token);
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
        for (let m of this._monoms) {
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
        // First multiply by the common denominoatr.
        this.multiplyByInteger(this.lcmDenominator()).divideByInteger(this.gcdNumerator()).reduce();
        return this.reduce();
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
        let M: Monom[] = [];
        for (let m1 of this._monoms) {
            for (let m2 of P.monoms) {
                M.push(Monom.xmultiply(m1, m2));
            }
        }

        this._monoms = M;
        return this.reduce();
    };

    multiplyByInteger = (nb: number): Polynom => {
        let nbF = new Fraction().parseByInteger(nb);
        for (let m of this._monoms) {
            m.coefficient.multiply(nbF);
        }

        return this.reduce();
    };

    multiplyByMonom = (M: Monom): Polynom => {
        for (let m of this._monoms) {
            m.multiply(M)
        }
        return this.reduce();
    };

    divideByInteger = (nb: number): Polynom => {
        let nbF = new Fraction().parseByInteger(nb);
        for (let m of this._monoms) {
            m.coefficient.divide(nbF);
        }
        return this;
    };

    /**
     * Divide the current polynom by two polynoms.
     * @param P
     */
    divide = (P: Polynom): { quotient: Polynom, reminder: Polynom } => {
        let quotient: Polynom,
            reminder: Polynom,
            maxMP: Monom = P.monomByDegree(),
            newM: Monom;

        // Initialise the polynoms.
        quotient = new Polynom().zero();
        reminder = this.clone();

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

        return {quotient, reminder};
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

        let P = this.clone();
        for (let i = 1; i < nb; i++) {
            this.multiply(P);
        }
        return this.reduce();
    };

    degree = (letter?: string): number => {
        let d: number = 0;
        for (let m of this._monoms) {
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
        let M = this.clone().reduce();
        for (let m of M._monoms) {
            if (m.degree(letter) === degree) {
                return m.clone();
            }
        }

        // NOthing was found - return the null monom.
        return new Monom().zero();
    };

    // Evaluate a polynom.
    evaluate = (values: { [key: string]: Fraction }): Fraction => {
        let r = new Fraction().zero();

        this._monoms.forEach(monom => {
            console.log(monom.display, values, monom.evaluate(values).display);
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

        let evalValue: { [key: string]: Fraction } = {};
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
        let Z: Fraction[] = [];

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
                    let P = this.clone().reduce().reorder();
                    return [P.monoms[1].coefficient.opposed().divide(P.monoms[0].coefficient)];
                }
            case 2:
                // Determine the zeros of an equation of second degree.
                return [true, false];
        }
        return Z;
    };

    getDenominators = (): number[] => {
        let denominators: number[] = [];
        for (let m of this._monoms) {
            denominators.push(m.coefficient.denominator);
        }
        return denominators;
    };
    getNumerators = (): number[] => {
        let numerators: number[] = [];
        for (let m of this._monoms) {
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
        let cP1 = this.clone().reduce().reorder(),
            cP2 = P.clone().reduce().reorder();

        // Both haven't the same number of monoms.
        if (cP1.length !== cP2.length) {
            return false;
        }

        // They must have the same degree.
        if (cP1.degree() !== cP2.degree()) {
            return false;
        }

        for (let i in cP1.monoms) {
            if (!cP1.monoms[i].isEqual(cP2.monoms[i])) {
                return false;
            }
        }

        return true;
    };

    isOpposedAt = (P: Polynom): boolean => {
        return this.isSameAs(P.clone().opposed());
    };

    private genDisplay = (output?: string): string => {
        let P: string = '';
        for (let k of this._monoms) {
            if (k.coefficient.value === 0) {
                continue;
            }
            if (k.coefficient.sign() === 1 && P !== '') {
                P += '+';
            }
            P += (output === 'tex') ? k.tex : k.display;
        }
        return P;
    };

    // Getter and setter
    get length() {
        // TODO: Must reduce the monoms list to rmeove the zero coefficient.
        return this._monoms.length;
    }

    get monoms() {
        return this._monoms;
    }

    set monoms(M: Monom[]) {
        this._monoms = M;
    }

    get display() {
        return this.genDisplay();
    }

    get tex() {
        return this.genDisplay('tex');
    }

    get isTrivial() {
        return this._monoms.length === 0 && this._monoms[0].coefficient.value === 0;
    }
}