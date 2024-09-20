/**
 * Polynom module contains everything necessary to handle polynoms.
 * @module Logicalset
 */


import {ShutingYard, ShutingyardMode} from "piexpression"

/**
 * Polynom class can handle polynoms, reorder, resolve, ...
 */
export class LogicalSet {
    #rpn: { token: string, tokenType: string }[]

    /**
     *
     * @param {string} value (optional) Default polynom to parse on class creation
     */
    constructor(value?: string) {
        this.#rpn = []

        if (value !== undefined) {
            this.parse(value)
        }

        return this
    }

    parse = (value: string): this => {
        // Parse the updated value to the shutingyard algorithm
        this.#rpn = new ShutingYard(ShutingyardMode.SET)
            .parse(value)
            .rpn

        return this
    }

    evaluate(values: Record<string, boolean>): boolean {
        // Add missing key(s) and set them as false by default.
        this.variables.forEach(key => {
            if (!Object.hasOwn(values, key)) {
                values[key] = false
            }
        })

        const stack: boolean[] = []
        for (const token of this.#rpn) {
            console.log(token)
            if (token.tokenType === 'variable') {
                stack.push(values[token.token])
            } else if (token.tokenType === 'operation') {
                if (token.token === '!') {
                    // need only one item from stack
                    if (stack.length >= 1) {
                        const a = stack.pop()
                        stack.push(!a)
                    } else {
                        return false
                    }
                } else {
                    // All other operations needs two items from stack
                    const a = stack.pop()
                    const b = stack.pop()
                    if (a !== undefined && b !== undefined) {
                        switch (token.token) {
                            case "&":
                                stack.push(a && b)
                                break
                            case "|":
                                stack.push(a || b)
                                break
                            case "-":
                                return false
                        }

                    } else {
                        return false
                    }
                }
            }
        }

        return stack.length === 1 && stack[0]
    }

    get rpn(): { token: string, tokenType: string }[] {
        return this.#rpn
    }

    get tex(): string {
        const varStack: { token: string, tokenType: string }[] = []

        for (const token of this.#rpn) {
            if (token.tokenType === 'variable') {
                varStack.push(token)
            } else {
                switch (token.token) {
                    case '&':
                        if (varStack.length >= 2) {
                            const second = varStack.pop(),
                                first = varStack.pop()

                            if (second && first) {
                                if (first.tokenType === 'mix') {
                                    first.token = `( ${first.token} )`
                                }
                                if (second.tokenType === 'mix') {
                                    second.token = `( ${second.token} )`
                                }
                                varStack.push({token: `${first.token} \\cap ${second.token}`, tokenType: 'mix'})
                            }
                        }
                        break
                    case '|':
                        if (varStack.length >= 2) {
                            const second = varStack.pop(),
                                first = varStack.pop()

                            if (second && first) {
                                if (first.tokenType === 'mix') {
                                    first.token = `( ${first.token} )`
                                }
                                if (second.tokenType === 'mix') {
                                    second.token = `( ${second.token} )`
                                }
                                varStack.push({token: `${first.token} \\cup ${second.token}`, tokenType: 'mix'})
                            }
                        }
                        break
                    case '-':
                        if (varStack.length >= 2) {
                            const second = varStack.pop(),
                                first = varStack.pop()

                            if (second && first) {
                                if (first.tokenType === 'mix') {
                                    first.token = `( ${first.token} )`
                                }
                                if (second.tokenType === 'mix') {
                                    second.token = `( ${second.token} )`
                                }
                                varStack.push({token: `${first.token} \\setminus ${second.token}`, tokenType: 'mix'})
                            }
                        }
                        break
                    case '!':
                        if (varStack.length >= 1) {
                            const first = varStack.pop()

                            if (first) {
                                varStack.push({token: `\\overline{ ${first.token} }`, tokenType: 'variable'})
                            }
                        }
                        break
                }
            }
        }

        return varStack[0].token
    }

    get variables(): string[] {
        return this.#rpn
            .filter(value => value.tokenType === 'variable')
            .map(value => value.token)
    }

    vennAB(): string[] {
        return this.#evaluateAsVenn({
                A: ['A', 'AB'],
                B: ['B', 'AB']
            },
            ['A', 'B', 'AB', 'E']
        )
    }

    vennABC(): string[] {
        return this.#evaluateAsVenn({
                A: ['A', 'AB', 'AC', 'ABC'],
                B: ['B', 'AB', 'BC', 'ABC'],
                C: ['C', 'AC', 'BC', 'ABC']
            },
            ['A', 'B', 'C', 'AB', 'AC', 'BC', 'ABC', 'E']
        )
    }

    #evaluateAsVenn(tokenSets: Record<string, string[] | undefined>, reference?: string[]): string[] {
        const varStack: (Set<string>)[] = []

        let referenceSet: Set<string>
        if (reference === undefined) {
            referenceSet = new Set()
            for (const key in tokenSets) {
                referenceSet = new Set([
                    ...referenceSet,
                    ...(tokenSets[key] ?? [])
                ])
            }
        } else {
            referenceSet = new Set(reference)
        }

        for (const token of this.#rpn) {
            if (token.tokenType === 'variable') {
                // The variable has no token - assume it's empty.
                if (tokenSets[token.token] === undefined) {
                    varStack.push(new Set())
                } else {
                    varStack.push(new Set(tokenSets[token.token]))
                }

            } else {
                switch (token.token) {
                    case '&':
                        if (varStack.length >= 2) {
                            const second = varStack.pop(),
                                first = varStack.pop()

                            if (first && second) {
                                varStack.push(new Set([...first].filter(x => second.has(x))))
                            }
                        }
                        break
                    case '|':
                        if (varStack.length >= 2) {
                            const second = varStack.pop(),
                                first = varStack.pop()
                            if (first && second) {
                                varStack.push(new Set([...first, ...second]))
                            }
                        }
                        break
                    case '-':
                        if (varStack.length >= 2) {
                            const second = varStack.pop(),
                                first = varStack.pop()

                            if (first && second) {
                                varStack.push(new Set([...first].filter(x => !second.has(x))))
                            }
                        }
                        break
                    case '!':
                        if (varStack.length >= 1) {
                            const first = varStack.pop()

                            if (first) {
                                varStack.push(new Set([...referenceSet].filter(x => !first.has(x))))
                            }
                        }
                        break
                }
            }
        }

        return [...varStack[0]].sort()
    }
}