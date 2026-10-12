/**
 * @module Logicalset
 */
import {ShutingYard, ShutingyardMode} from "piexpression"
import {InvalidArgumentError, ParseError} from "../errors"
import type {IPiMathObject, OutputStyle} from "../pimath.interface"

interface RpnToken { token: string, tokenType: string }

/**
 * Represents a logical set expression (e.g. `A & B | !C`), stored internally
 * as a Reverse Polish Notation sequence. Supports LaTeX and AsciiMath rendering,
 * boolean evaluation, and Venn diagram zone computation.
 *
 * Operator precedence (set by the `piexpression` parser, not by this class): `!` binds
 * first, then `&` and `|` at the same level, applied from left to right, then `-`
 * (set difference, also left to right). So `A|B&C` is `(A|B)&C`, not `A|(B&C)`, and
 * `A-B&C` is `A-(B&C)`. Use parentheses to write any other grouping.
 */
export class LogicalSet implements IPiMathObject<LogicalSet> {
    #rpn: RpnToken[]
    #exterior = 'E'

    constructor(value?: string) {
        this.#rpn = []
        if (value !== undefined) {
            this.parse(value)
        }
        return this
    }

    static fromString(value: string): LogicalSet {
        const obj = new LogicalSet()
        try {
            obj.#rpn = new ShutingYard(ShutingyardMode.SET).parse(value).rpn
        } catch (e) {
            throw new ParseError(`Cannot parse "${value}" as a LogicalSet`, {cause: e})
        }
        return obj
    }

    parse(value: string): this {
        return this.copy(LogicalSet.fromString(value))
    }

    clone(): LogicalSet {
        const obj = new LogicalSet()
        obj.#rpn = this.#rpn.map(t => ({...t}))
        obj.#exterior = this.#exterior
        return obj
    }

    copy(value: LogicalSet): this {
        this.#rpn = value.#rpn.map(t => ({...t}))
        return this
    }

    /** Sets the label used for the exterior (universal complement) zone in Venn output. Default: `'E'`. */
    withUniverse(name: string): this {
        this.#exterior = name
        return this
    }

    #toOutput(style: OutputStyle): string {
        const cap  = style === 'tex' ? '\\cap'      : '∩'
        const cup  = style === 'tex' ? '\\cup'      : '∪'
        const setm = style === 'tex' ? '\\setminus' : '\\'
        const compl = (s: string) => style === 'tex'
            ? `\\overline{ ${s} }`
            : `overline(${s})`

        const varStack: RpnToken[] = []

        for (const token of this.#rpn) {
            if (token.tokenType === 'variable') {
                varStack.push({...token})
            } else {
                switch (token.token) {
                    case '&':
                        if (varStack.length >= 2) {
                            const second = varStack.pop()
                            const first = varStack.pop()
                            if (second && first) {
                                if (first.tokenType === 'mix') first.token = `( ${first.token} )`
                                if (second.tokenType === 'mix') second.token = `( ${second.token} )`
                                varStack.push({token: `${first.token} ${cap} ${second.token}`, tokenType: 'mix'})
                            }
                        }
                        break
                    case '|':
                        if (varStack.length >= 2) {
                            const second = varStack.pop()
                            const first = varStack.pop()
                            if (second && first) {
                                if (first.tokenType === 'mix') first.token = `( ${first.token} )`
                                if (second.tokenType === 'mix') second.token = `( ${second.token} )`
                                varStack.push({token: `${first.token} ${cup} ${second.token}`, tokenType: 'mix'})
                            }
                        }
                        break
                    case '-':
                        if (varStack.length >= 2) {
                            const second = varStack.pop()
                            const first = varStack.pop()
                            if (second && first) {
                                if (first.tokenType === 'mix') first.token = `( ${first.token} )`
                                if (second.tokenType === 'mix') second.token = `( ${second.token} )`
                                varStack.push({token: `${first.token} ${setm} ${second.token}`, tokenType: 'mix'})
                            }
                        }
                        break
                    case '!':
                        if (varStack.length >= 1) {
                            const first = varStack.pop()
                            if (first) {
                                varStack.push({token: compl(first.token), tokenType: 'variable'})
                            }
                        }
                        break
                }
            }
        }

        return varStack.length === 0 ? '' : varStack[0].token
    }

    get tex(): string {
        return this.#toOutput('tex')
    }

    get display(): string {
        return this.#toOutput('display')
    }

    /**
     * Evaluates the expression as a predicate: given boolean membership values
     * for each variable, returns whether the set expression holds. Missing keys
     * default to `false` (not a member). The `values` argument is not mutated.
     * The `-` operator (set difference) is supported: `A - B` is true iff the
     * element is in A and not in B. Malformed RPN (underflowed stack) returns
     * `false` rather than throwing.
     */
    evaluate(values: Record<string, boolean>): boolean {
        const resolved: Record<string, boolean> = {...values}
        this.variables.forEach(key => {
            if (!Object.hasOwn(resolved, key)) {
                resolved[key] = false
            }
        })

        const stack: boolean[] = []
        for (const token of this.#rpn) {
            if (token.tokenType === 'variable') {
                stack.push(resolved[token.token])
            } else if (token.tokenType === 'operation') {
                if (token.token === '!') {
                    if (stack.length >= 1) {
                        const a = stack.pop()
                        stack.push(!a)
                    } else {
                        return false
                    }
                } else {
                    const a = stack.pop()  // second operand (B)
                    const b = stack.pop()  // first operand (A)
                    if (a !== undefined && b !== undefined) {
                        switch (token.token) {
                            case "&":
                                stack.push(a && b)
                                break
                            case "|":
                                stack.push(a || b)
                                break
                            case "-":
                                // x ∈ A\B ⟺ x ∈ A and x ∉ B
                                stack.push(b && !a)
                                break
                        }
                    } else {
                        return false
                    }
                }
            }
        }

        return stack.length === 1 && stack[0]
    }

    get rpn(): RpnToken[] {
        return this.#rpn
    }

    get variables(): string[] {
        return [...new Set(
            this.#rpn
                .filter(t => t.tokenType === 'variable')
                .map(t => t.token)
        )]
    }

    /**
     * Returns the Venn diagram zones for n sets that satisfy the expression.
     * Each variable must be a single character; zone names are sorted
     * concatenations of those characters (e.g. `'AB'` = A∩B only). The exterior
     * zone is labelled by `withUniverse()` (default `'E'`). Variables in the
     * expression but absent from `variables` are treated as ∅.
     * @throws {InvalidArgumentError} if no variables are provided or any is not a single character.
     */
    venn(...variables: string[]): string[] {
        if (variables.length === 0) {
            throw new InvalidArgumentError('venn() requires at least one variable')
        }
        const sorted = [...new Set(variables)].sort()
        if (sorted.some(v => v.length !== 1)) {
            throw new InvalidArgumentError('venn() variables must be single characters')
        }
        const n = sorted.length
        const tokenSets: Record<string, string[]> = {}
        const allZones: string[] = []

        for (let mask = 1; mask < (1 << n); mask++) {
            const zone = sorted.filter((_, i) => mask & (1 << i)).join('')
            allZones.push(zone)
            sorted.forEach((v, i) => {
                if (mask & (1 << i)) (tokenSets[v] ??= []).push(zone)
            })
        }

        return this.#evaluateAsVenn(tokenSets, [...allZones, this.#exterior])
    }

    /**
     * Shortcut for `venn('A', 'B')`. Zone names: `'A'`, `'B'`, `'AB'`, plus
     * the exterior label (default `'E'`, configurable via `withUniverse()`).
     */
    vennAB(): string[] {
        return this.venn('A', 'B')
    }

    /**
     * Shortcut for `venn('A', 'B', 'C')`. Zone names: `'A'`, `'B'`, `'C'`,
     * `'AB'`, `'AC'`, `'BC'`, `'ABC'`, plus the exterior label (default `'E'`,
     * configurable via `withUniverse()`).
     */
    vennABC(): string[] {
        return this.venn('A', 'B', 'C')
    }

    #evaluateAsVenn(tokenSets: Record<string, string[] | undefined>, reference?: string[]): string[] {
        const varStack: Set<string>[] = []

        let referenceSet: Set<string>
        if (reference === undefined) {
            referenceSet = new Set()
            for (const key in tokenSets) {
                referenceSet = new Set([...referenceSet, ...(tokenSets[key] ?? [])])
            }
        } else {
            referenceSet = new Set(reference)
        }

        for (const token of this.#rpn) {
            if (token.tokenType === 'variable') {
                varStack.push(new Set(tokenSets[token.token] ?? []))
            } else {
                switch (token.token) {
                    case '&':
                        if (varStack.length >= 2) {
                            const second = varStack.pop()
                            const first = varStack.pop()
                            if (first && second) {
                                varStack.push(new Set([...first].filter(x => second.has(x))))
                            }
                        }
                        break
                    case '|':
                        if (varStack.length >= 2) {
                            const second = varStack.pop()
                            const first = varStack.pop()
                            if (first && second) {
                                varStack.push(new Set([...first, ...second]))
                            }
                        }
                        break
                    case '-':
                        if (varStack.length >= 2) {
                            const second = varStack.pop()
                            const first = varStack.pop()
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

        return varStack.length === 0 ? [] : [...varStack[0]].sort()
    }
}
