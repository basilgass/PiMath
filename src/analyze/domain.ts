import type {IPiMathObject, OutputStyle} from "../pimath.interface"
import type {Fraction} from "../coefficients"
import {ParseError} from "../errors"
import {Solution} from "./solution"
import {Interval, cmpLeft, cmpRight} from "./interval"

// ---------------------------------------------------------------------------
// Normalization helper: sort + merge overlapping/adjacent intervals
// ---------------------------------------------------------------------------

function normalizeIntervals(raw: Interval[]): Interval[] {
    const nonEmpty = raw.filter(iv => !iv.isEmpty())
    if (nonEmpty.length === 0) return []

    nonEmpty.sort((a, b) => {
        const c = cmpLeft(a.left, b.left)
        if (c !== 0) return c
        // Equal left: closed before open (wider first)
        return a.leftOpen ? 1 : -1
    })

    const merged: Interval[] = [nonEmpty[0].clone()]

    for (let i = 1; i < nonEmpty.length; i++) {
        const last = merged[merged.length - 1]
        const curr = nonEmpty[i]

        const cmp = cmpRight(last.right, curr.left)
        const adjacent = cmp === 0 && (!last.rightOpen || !curr.leftOpen)
        const overlapping = cmp > 0

        if (overlapping || adjacent) {
            // Merge: extend right bound if needed
            const cR = cmpRight(last.right, curr.right)
            const newRight = cR >= 0 ? last.right : curr.right
            const newRightOpen = cR > 0 ? last.rightOpen
                : cR < 0 ? curr.rightOpen
                : last.rightOpen && curr.rightOpen

            merged[merged.length - 1] = Interval.fromBounds(
                last.left, newRight, last.leftOpen, newRightOpen
            )
        } else {
            merged.push(curr.clone())
        }
    }

    return merged
}

// ---------------------------------------------------------------------------
// Domain
// ---------------------------------------------------------------------------

/**
 * A (possibly empty) subset of ℝ represented as a finite union of intervals.
 * The internal interval list is always sorted and non-overlapping (normalized).
 *
 * Use the static factories — `fromIntervals`, `fromInterval`, `empty`, `real` —
 * to construct instances.
 */
export class Domain implements IPiMathObject<Domain> {
    #intervals: Interval[]

    private constructor(intervals: Interval[]) {
        this.#intervals = normalizeIntervals(intervals)
    }

    // -------------------------------------------------------------------------
    // Static factories
    // -------------------------------------------------------------------------

    static fromIntervals(intervals: Interval[]): Domain {
        return new Domain(intervals)
    }

    static fromInterval(interval: Interval): Domain {
        return new Domain([interval])
    }

    /** The empty domain ∅. */
    static empty(): Domain {
        return new Domain([])
    }

    /** The whole real line ℝ. */
    static real(): Domain {
        return new Domain([Interval.real()])
    }

    /**
     * Parse a French-notation domain string.
     *
     * Supported forms:
     * - `O/`                          → ∅
     * - `RR`                          → ℝ
     * - `RR^**`                       → ℝ* = ]-∞;0[ ∪ ]0;+∞[
     * - `RR\{a;b;…}`                  → ℝ minus a finite set of points
     * - `{a;b;…}`                     → union of closed singletons
     * - `I1uuI2uu…`                   → union of intervals (each parsed via Interval.fromString)
     * - Any single-interval string    → delegated to Interval.fromString
     *
     * @throws {ParseError} on unrecognised format.
     */
    static fromString(value: string): Domain {
        const s = value.trim()

        if (s === 'O/') return Domain.empty()
        if (s === 'RR') return Domain.real()

        if (s === 'RR^**') {
            const zero = Solution.fromString('0')
            return Domain.fromIntervals([
                Interval.fromBounds(null, zero, true, true),
                Interval.fromBounds(zero, null, true, true),
            ])
        }

        // RR\{a;b;…} — ℝ minus a finite set of points
        if (s.startsWith('RR\\{') && s.endsWith('}')) {
            const inner = s.slice(4, -1)
            const pts = inner.split(';').map(p => Interval.point(Solution.fromString(p.trim())))
            return Domain.fromIntervals(pts).complement()
        }

        // {a;b;…} — union of closed singletons (two or more points)
        if (s.startsWith('{') && s.endsWith('}') && s.includes(';')) {
            const inner = s.slice(1, -1)
            const pts = inner.split(';').map(p => Interval.point(Solution.fromString(p.trim())))
            return Domain.fromIntervals(pts)
        }

        // Union: split on 'uu', recurse on each part
        if (s.includes('uu')) {
            const ivs = s.split('uu').flatMap(part => Domain.fromString(part.trim()).intervals)
            return Domain.fromIntervals(ivs)
        }

        // Single interval: delegate
        return Domain.fromInterval(Interval.fromString(s))
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
        if (this.isEmpty()) return style === 'tex' ? '\\emptyset' : 'O/'

        // Single interval covering all of ℝ
        if (this.#intervals.length === 1 && this.#intervals[0].isReal()) {
            return style === 'tex' ? '\\mathbb{R}' : 'RR'
        }

        // ℝ minus a finite set of points: spans ]-∞;+∞[ with only open gaps
        const rMinusPoints = this.#detectRMinusPoints()
        if (rMinusPoints !== null) {
            const pts = rMinusPoints.map(p => style === 'tex' ? p.tex : p.display).join(';')
            return style === 'tex'
                ? `\\mathbb{R} \\setminus \\left\\{${pts}\\right\\}`
                : `RR\\{${pts}}`
        }

        // ℝ⁺ / ℝ⁻ special cases (single half-line through zero)
        const halfLine = this.#detectHalfLine()
        if (halfLine !== null) {
            const {side, strict} = halfLine
            if (style === 'tex') {
                return strict
                    ? `\\mathbb{R}_${side}^*`
                    : `\\mathbb{R}_${side}`
            }
            return strict ? `RR_${side}**` : `RR_${side}`
        }

        const sep = style === 'tex' ? ' \\cup ' : 'uu'
        return this.#intervals.map(iv => style === 'tex' ? iv.tex : iv.display).join(sep)
    }

    /** Returns the excluded points if the domain is ℝ\{p1, p2, …}, otherwise null. */
    #detectRMinusPoints(): Solution[] | null {
        const ivs = this.#intervals
        if (ivs[0].left !== null) return null
        if (ivs.at(-1)!.right !== null) return null

        const pts: Solution[] = []
        for (let i = 0; i < ivs.length - 1; i++) {
            const curr = ivs[i]
            const next = ivs[i + 1]
            if (!curr.rightOpen || !next.leftOpen) return null
            if (curr.right === null || next.left === null) return null
            if (curr.right.value !== next.left.value) return null
            pts.push(curr.right)
        }
        return pts
    }

    /**
     * Returns `{side: '+' | '-', strict: boolean}` if the domain is a single
     * half-line bounded by zero, otherwise null.
     */
    #detectHalfLine(): {side: '+' | '-', strict: boolean} | null {
        if (this.#intervals.length !== 1) return null
        const iv = this.#intervals[0]
        if (iv.left === null && iv.right !== null && iv.right.value === 0) {
            return {side: '-', strict: iv.rightOpen}
        }
        if (iv.right === null && iv.left !== null && iv.left.value === 0) {
            return {side: '+', strict: iv.leftOpen}
        }
        return null
    }

    clone(): Domain {
        return new Domain(this.#intervals.map(iv => iv.clone()))
    }

    copy(value: Domain): this {
        this.#intervals = value.#intervals.map(iv => iv.clone())
        return this
    }

    // -------------------------------------------------------------------------
    // Predicates
    // -------------------------------------------------------------------------

    isEmpty(): boolean {
        return this.#intervals.length === 0
    }

    contains(x: Fraction | number): boolean {
        return this.#intervals.some(iv => iv.contains(x))
    }

    // -------------------------------------------------------------------------
    // Set operations
    // -------------------------------------------------------------------------

    intersect(other: Domain): Domain {
        const result: Interval[] = []
        for (const a of this.#intervals) {
            for (const b of other.#intervals) {
                const iv = a.intersect(b)
                if (!iv.isEmpty()) result.push(iv)
            }
        }
        return new Domain(result)
    }

    union(other: Domain): Domain {
        return new Domain([...this.#intervals, ...other.#intervals])
    }

    /**
     * Complement of this domain in ℝ.
     * Each interval boundary flips its open/closed sense.
     */
    complement(): Domain {
        if (this.isEmpty()) return Domain.real()

        const ivs = this.#intervals
        const gaps: Interval[] = []

        // Gap before the first interval
        const first = ivs[0]
        if (first.left !== null) {
            gaps.push(Interval.fromBounds(null, first.left, true, !first.leftOpen))
        }

        // Gaps between consecutive intervals
        for (let i = 0; i < ivs.length - 1; i++) {
            const curr = ivs[i]
            const next = ivs[i + 1]
            gaps.push(Interval.fromBounds(
                curr.right, next.left,
                !curr.rightOpen, !next.leftOpen
            ))
        }

        // Gap after the last interval
        const last = ivs.at(-1)!
        if (last.right !== null) {
            gaps.push(Interval.fromBounds(last.right, null, !last.rightOpen, true))
        }

        return new Domain(gaps)
    }

    // -------------------------------------------------------------------------
    // Getters
    // -------------------------------------------------------------------------

    /** Read-only access to the normalized interval list. */
    get intervals(): Interval[] {
        return this.#intervals.map(iv => iv.clone())
    }

    get length(): number {
        return this.#intervals.length
    }
}
