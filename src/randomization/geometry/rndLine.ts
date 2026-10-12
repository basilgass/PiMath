import {Fraction} from "../../coefficients"
import {InvalidArgumentError} from "../../errors"
import {Line} from "../../geometry/line"
import {Point} from "../../geometry/point"
import {Vector} from "../../geometry/vector"
import type {RandomCoefficientConfig, RandomFraction, RandomGeometryLineConfig} from "../rndTypes"
import {rndFraction} from "../coefficient/rndFraction"
import {isRandomFraction, mergeConfig} from "../rndConfig"
import {drawKind, type KindsAllow, validateKinds} from "../rndKinds"
import {rndPoint} from "./rndPoint"

type SlopeKind = 'vertical' | 'horizontal' | 'positive' | 'negative'
type Allow = KindsAllow<SlopeKind>

const KINDS: SlopeKind[] = ['vertical', 'horizontal', 'positive', 'negative']

/** Probability of a vertical or horizontal line when the kind is merely allowed (`true`). */
const SPECIAL_PROBABILITY = 0.05

const defaults = {
    allow: { vertical: true, horizontal: true, positive: true, negative: true } as Allow,
}

/**
 * Generates a random `Line`, built from a point `A` and a slope.
 *
 * **`A`** — a `Point` fixes the point exactly; an object is the configuration of `rndPoint`
 * (default: its own defaults). The legacy `{x, y}` form is rejected: use `new Point(x, y)`.
 *
 * **`slope`**:
 * - an exact value (`2`, `'-3/2'`, `Fraction`) gives a line with exactly that slope (`0` is horizontal);
 * - `{ fraction }` draws a random slope: `false` for an integer, `true` for a fraction (default), or a
 *   `RandomCoefficientConfig` such as `{ max: 5 }`. The sign of the coefficient configuration is
 *   overridden by the kind of line drawn (see `allow`).
 *
 * **`allow`** — the kind of line to draw, for a random slope. Each of `vertical`, `horizontal`
 * (zero slope), `positive` and `negative` (sign of the slope) is `false` (never), a number in `[0, 1]`
 * (probability of that kind) or `true` (default). `true` means 5 % for `vertical` and `horizontal`,
 * and an equal share of what remains for `positive` and `negative`. An explicit number takes
 * precedence over `true`, and probabilities that do not add up are normalized.
 * `{ vertical: 1 }` always gives a vertical line; `{ vertical: false, horizontal: false, negative: false }`
 * always gives a positive slope.
 *
 * @throws {InvalidArgumentError} if `A`, `slope` or an `allow` entry is invalid.
 * @throws {InvalidArgumentError} if `allow` excludes every kind of line.
 * @throws {InvalidArgumentError} if an exact `slope` is combined with an explicit `allow`.
 */
export function rndLine(userConfig?: RandomGeometryLineConfig): Line {
    const config = mergeConfig(defaults, { allow: userConfig?.allow })
    validateKinds(KINDS, config.allow)

    const A = resolvePoint(userConfig?.A)
    const slope = userConfig?.slope

    if (slope === undefined || isRandomFraction(slope)) {
        return Line.fromPointAndDirection(A, randomDirection(slope, config.allow))
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- the generators are called from untyped JavaScript, which the types cannot rule out
    if (Object.values(userConfig?.allow ?? {}).some(value => value !== undefined)) {
        throw new InvalidArgumentError('allow cannot be combined with an exact slope')
    }
    return Line.fromPointAndDirection(A, directionOf(exactSlope(slope)))
}

function exactSlope(value: string | number | Fraction): Fraction {
    const slope = new Fraction(value)
    if (slope.isNaN() || !slope.isFinite()) {
        throw new InvalidArgumentError(`slope must be a finite number or fraction, got ${value instanceof Fraction ? value.display : String(value)}`)
    }
    return slope
}

/** Direction vector `(q, p)` of a line of slope `p/q`. */
function directionOf(slope: Fraction): Vector {
    const reduced = slope.clone().reduce()
    return new Vector(reduced.denominator, reduced.numerator)
}

function resolvePoint(A: RandomGeometryLineConfig['A']): Point {
    if (A === undefined) return rndPoint()

    if (A instanceof Point) {
        if (A.dimension !== 2) {
            throw new InvalidArgumentError('A must be a 2D point')
        }
        return A.clone()
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- the generators are called from untyped JavaScript, which the types cannot rule out
    if (typeof A === 'object' && A !== null && !('x' in A) && !('y' in A)) {
        return rndPoint(A)
    }

    throw new InvalidArgumentError('A must be a Point or a point configuration (use new Point(x, y) for an exact point)')
}

function randomDirection(slope: RandomFraction | undefined, allow: Allow): Vector {
    // Validated before drawing: an invalid configuration must throw whatever kind of line is drawn.
    const option = slope?.fraction ?? true
    if (typeof option !== 'boolean' && typeof option !== 'object') {
        throw new InvalidArgumentError('slope.fraction must be a boolean or a coefficient configuration')
    }

    const kind = drawKind(KINDS, allow, { vertical: SPECIAL_PROBABILITY, horizontal: SPECIAL_PROBABILITY })
    if (kind === 'vertical') return new Vector(0, 1)
    if (kind === 'horizontal') return new Vector(1, 0)

    const base: RandomCoefficientConfig = option === true ? {} : option === false ? { relative: true } : option
    const m = rndFraction({
        ...base,
        allow: { zero: false, positive: kind === 'positive', negative: kind === 'negative' },
    })
    return directionOf(m)
}
