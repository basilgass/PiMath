/**
 * Polynom module contains everything necessary to handle polynoms.
 * @module Logicalset
 */

import {Shutingyard} from '../shutingyard';

/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 */
export class Logicalset {
    private _rawString: string;
    private _rpn: { token: string, tokenType: string }[]

    /**
     *
     * @param {string} value (optional) Default polynom to parse on class creation
     */
    constructor(value: string) {
        this._rawString = value
        this.parse(value)
        return this;
    }

    get isLogicalset() {
        return true;
    };

    private parse = (value: string): Logicalset => {
        // TODO: Must format the value string to convert some items...

        // Parse the updated value to the shutingyard algorithm
        this._rpn = new Shutingyard('set').parse(value).rpn;

        return this;
    }

    evaluate(tokenSets: { [key: string]: any[] }, reference?: any[]): any[] {
        let varStack: (Set<unknown>)[] = []

        let referenceSet: Set<unknown>
        if (reference === undefined) {
            referenceSet = new Set()
            for (let key in tokenSets) {
                referenceSet = new Set([...referenceSet, ...tokenSets[key]])
            }
        } else {
            referenceSet = new Set(reference)
        }

        for (let token of this._rpn) {
            if (token.tokenType === 'variable') {
                // The variable has no token - assume it's empty.
                if (tokenSets[token.token] === undefined) {
                    varStack.push(new Set())
                } else {
                    varStack.push(new Set(tokenSets[token.token]));
                }

            } else {
                switch (token.token) {
                    case '&':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(),
                                first = varStack.pop()

                            varStack.push(new Set([...first].filter(x => second.has(x))))
                        }
                        break
                    case '|':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(),
                                first = varStack.pop()
                            varStack.push(new Set([...first, ...second]))
                        }
                        break
                    case '-':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(),
                                first = varStack.pop()
                            varStack.push(new Set([...first].filter(x => !second.has(x))))
                        }
                        break
                    case '!':
                        if (varStack.length >= 1) {
                            let first = varStack.pop()

                            varStack.push(new Set([...referenceSet].filter(x => !first.has(x))))
                        }
                        break
                }
            }
        }

        return [...varStack[0]].sort();
    }

    vennAB(): any[] {
        return this.evaluate({
                A: ['A', 'AB'],
                B: ['B', 'AB']
            },
            ['A', 'B', 'AB', 'E']
        )
    }

    vennABC(): any[] {
        return this.evaluate({
                A: ['A', 'AB', 'AC', 'ABC'],
                B: ['B', 'AB', 'BC', 'ABC'],
                C: ['C', 'AC', 'BC', 'ABC']
            },
            ['A', 'B', 'C', 'AB', 'AC', 'BC', 'E']
        )
    }

    get rpn(): { token: string, tokenType: string }[] {
        return this._rpn
    }

    get tex(): string {
        let varStack: { token:string, tokenType: string } [] = []

        for (let token of this._rpn) {
            if (token.tokenType === 'variable') {
                varStack.push(token);
            } else {
                switch (token.token) {
                    case '&':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(),
                                first = varStack.pop()

                            if(first.tokenType==='mix'){first.token = `( ${first.token} )`}
                            if(second.tokenType==='mix'){second.token = `( ${second.token} )`}
                            varStack.push({token: `${first.token} \\cap ${second.token}`, tokenType: 'mix'})
                        }
                        break
                    case '|':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(),
                                first = varStack.pop()

                            if(first.tokenType==='mix'){first.token = `( ${first.token} )`}
                            if(second.tokenType==='mix'){second.token = `( ${second.token} )`}
                            varStack.push({token: `${first.token} \\cup ${second.token}`, tokenType: 'mix'})
                        }
                        break
                    case '-':
                        if (varStack.length >= 2) {
                            let second = varStack.pop(),
                                first = varStack.pop()

                            if(first.tokenType==='mix'){first.token = `( ${first.token} )`}
                            if(second.tokenType==='mix'){second.token = `( ${second.token} )`}
                            varStack.push({token: `${first.token} \\setminus ${second.token}`, tokenType: 'mix'})
                        }
                        break
                    case '!':
                        if (varStack.length >= 1) {
                            let first = varStack.pop()
                            varStack.push({token: `\\overline{ ${first.token} }`, tokenType: 'variable'})
                        }
                        break
                }
            }
        }

        return varStack[0].token
    }
}
