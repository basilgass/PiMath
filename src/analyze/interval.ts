import type {IPiMathObject, OutputStyle} from "../pimath.interface"
import type {Fraction} from "../coefficients"
import {ParseError} from "../errors"
import {Solution} from "./solution"

// ---------------------------------------------------------------------------
// Module-level comparison helpers
// ---------------------------------------------------------------------------

function cmpSolution(a: Solution, b: Solution): number {
    if (a.value === b.value) return 0
    return a.value > b.value ? 1 : -1
}

/** Compare left bounds: null = -∞ (smallest). */
export function cmpLeft(a: Solution | null, b: Solution | null): number {
    if (a === null && b === null) return 0
    if (a === null) return -1
    if (b === null) return 1
    return cmpSolution(a, b)
}

/** Compare right bounds: null = +∞ (largest). */
export function cmpRight(a: Solution | null, b: Solution | null): number {
    if (a === null && b === null) return 0
    if (a === null) return 1
    if (b === null) return -1
    return cmpSolution(a, b)
}

// ---------------------------------------------------------------------------
// Interval
// ---------------------------------------------------------------------------

/**
 * An immutable interval over ℝ with exact (Solution-based) bounds.
 *
 * `null` encodes ±∞ (always open by convention).
 * Use the static factories — `fromBounds`, `empty`, `real`, `point` — to
 * construct instances; the constructor is private.
 */
export class Interval implements IPiMathObject<Interval> {
    #left: Solution | null
    #right: Solution | null
    #leftOpen: boolean
    #rightOpen: boolean
    #empty: boolean

    private constructor() {
        this.#left = null
        this.#right = null
        this.#leftOpen = true
        this.#rightOpen = true
        this.#empty = false
    }

    // -------------------------------------------------------------------------
    // Static factories
    // -------------------------------------------------------------------------

    static fromBounds(
        left: Solution | null,
        right: Solution | null,
        leftOpen: boolean,
        rightOpen: boolean
    ): Interval {
        const iv = new Interval()
        iv.#left = left?.clone() ?? null
        iv.#right = right?.clone() ?? null
        iv.#leftOpen = left === null ? true : leftOpen
        iv.#rightOpen = right === null ? true : rightOpen
        return iv
    }

    /** The empty set ∅. */
    static empty(): Interval {
        const iv = new Interval()
        iv.#empty = true
        return iv
    }

    /** The whole real line ]-∞; +∞[. */
    static real(): Interval {
        return Interval.fromBounds(null, null, true, true)
    }

    /** A closed singleton {x}. */
    static point(x: Solution): Interval {
        return Interval.fromBounds(x, x, false, false)
    }

    /**
     * Parse a French-notation interval string.
     *
     * Supported forms:
     * - `O/`                         → empty set
     * - `RR`                         → ]-∞; +∞[
     * - `RR_+`, `RR_-`               → [0; +∞[ or ]-∞; 0]
     * - `RR_+**`, `RR_-**`           → ]0; +∞[ or ]-∞; 0[
     * - `{a}`                        → singleton {a}
     * - `]a;b[`, `[a;b]`, `[a;b[`, `]a;b]`  → general (a, b parsed via Solution.fromString or ±oo)
     *
     * `RR^**` (= ℝ*) is NOT a single interval — use `Domain.fromString` instead.
     *
     * @throws {ParseError} on unrecognised format.
     */
    static fromString(value: string): Interval {
        const s = value.trim()

        if (s === 'O/') return Interval.empty()
        if (s === 'RR') return Interval.real()

        // Half-lines and starred variants
        const zero = Solution.fromString('0')
        if (s === 'RR_+')   return Interval.fromBounds(zero, null, false, true)
        if (s === 'RR_+**') return Interval.fromBounds(zero, null, true,  true)
        if (s === 'RR_-')   return Interval.fromBounds(null, zero, true,  false)
        if (s === 'RR_-**') return Interval.fromBounds(null, zero, true,  true)

        // Singleton {a}
        if (s.startsWith('{') && s.endsWith('}') && !s.includes(';')) {
            return Interval.point(Solution.fromString(s.slice(1, -1)))
        }

        // General interval: first char is ] or [, last char is [ or ]
        const lb = s[0]
        const rb = s[s.length - 1]
        if ((lb === '[' || lb === ']') && (rb === '[' || rb === ']')) {
            const sepIdx = s.indexOf(';')
            if (sepIdx === -1) throw new ParseError(`Missing ';' in interval: "${value}"`)
            const leftStr  = s.slice(1, sepIdx).trim()
            const rightStr = s.slice(sepIdx + 1, -1).trim()

            const left  = leftStr  === '-oo' ? null : Solution.fromString(leftStr)
            const right = rightStr === '+oo' ? null : Solution.fromString(rightStr)

            return Interval.fromBounds(left, right, lb === ']', rb === '[')
        }

        throw new ParseError(`Cannot parse "${value}" as an Interval`)
    }

    // -------------------------------------------------------------------------
    // IPiMathObject
    // -------------------------------------------------------------------------

    get tex(): string {
        return this.#toOutput('tex')
    }

    get display(): string {
        return this.#toOutput('display')
    }

    #toOutput(style: OutputStyle): string {
        if (this.#empty) return style === 'tex' ? '\\emptyset' : 'O/'

        if (this.isPoint()) {
            const v = style === 'tex' ? this.#left!.tex : this.#left!.display
            return style === 'tex' ? `\\left\\{${v}\\right\\}` : `{${v}}`
        }

        const negInf = style === 'tex' ? '-\\infty' : '-oo'
        const posInf = style === 'tex' ? '+\\infty' : '+oo'

        const l = this.#left === null ? negInf
            : style === 'tex' ? this.#left.tex : this.#left.display
        const r = this.#right === null ? posInf
            : style === 'tex' ? this.#right.tex : this.#right.display

        const lb = this.#leftOpen ? ']' : '['
        const rb = this.#rightOpen ? '[' : ']'

        return `${lb}${l};${r}${rb}`
    }

    clone(): Interval {
        const iv = new Interval()
        iv.#left = this.#left?.clone() ?? null
        iv.#right = this.#right?.clone() ?? null
        iv.#leftOpen = this.#leftOpen
        iv.#rightOpen = this.#rightOpen
        iv.#empty = this.#empty
        return iv
    }

    copy(value: Interval): this {
        this.#left = value.#left?.clone() ?? null
        this.#right = value.#right?.clone() ?? null
        this.#leftOpen = value.#leftOpen
        this.#rightOpen = value.#rightOpen
        this.#empty = value.#empty
        return this
    }

    // -------------------------------------------------------------------------
    // Predicates
    // -------------------------------------------------------------------------

    isEmpty(): boolean {
        if (this.#empty) return true
        if (this.#left === null || this.#right === null) return false
        const c = cmpSolution(this.#left, this.#right)
        return c > 0 || (c === 0 && (this.#leftOpen || this.#rightOpen))
    }

    /** True iff the interval is a closed singleton [x; x]. */
    isPoint(): boolean {
        if (this.#empty || this.#left === null || this.#right === null) return false
        return !this.#leftOpen && !this.#rightOpen
            && cmpSolution(this.#left, this.#right) === 0
    }

    /** True iff the interval is the whole real line ]-∞; +∞[. */
    isReal(): boolean {
        return !this.#empty && this.#left === null && this.#right === null
    }

    contains(x: Fraction | number): boolean {
        if (this.isEmpty()) return false
        const v = typeof x === 'number' ? x : x.value

        if (this.#left !== null) {
            const l = this.#left.value
            if (this.#leftOpen ? v <= l : v < l) return false
        }

        if (this.#right !== null) {
            const r = this.#right.value
            if (this.#rightOpen ? v >= r : v > r) return false
        }

        return true
    }

    /**
     * Intersection of two intervals. Returns an empty interval (not null) when
     * the intervals do not overlap — check `isEmpty()` on the result.
     */
    intersect(other: Interval): Interval {
        if (this.isEmpty() || other.isEmpty()) return Interval.empty()

        const cL = cmpLeft(this.#left, other.#left)
        const left = cL >= 0 ? this.#left : other.#left
        const leftOpen = cL > 0 ? this.#leftOpen
            : cL < 0 ? other.#leftOpen
            : this.#leftOpen || other.#leftOpen

        const cR = cmpRight(this.#right, other.#right)
        const right = cR <= 0 ? this.#right : other.#right
        const rightOpen = cR < 0 ? this.#rightOpen
            : cR > 0 ? other.#rightOpen
            : this.#rightOpen || other.#rightOpen

        const result = Interval.fromBounds(left, right, leftOpen, rightOpen)
        return result.isEmpty() ? Interval.empty() : result
    }

    // -------------------------------------------------------------------------
    // Getters (read-only, for Domain's internal logic)
    // -------------------------------------------------------------------------

    get left(): Solution | null { return this.#left }
    get right(): Solution | null { return this.#right }
    get leftOpen(): boolean { return this.#leftOpen }
    get rightOpen(): boolean { return this.#rightOpen }
}
