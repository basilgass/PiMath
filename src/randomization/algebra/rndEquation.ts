import type { RandomEquationConfig, RandomRange } from "../rndTypes"
import { Fraction } from "../../coefficients/fraction"
import { Polynom } from "../../algebra/polynom"
import { Equation } from "../../algebra/equation"
import { rndPolynom } from "./rndPolynom"
import { mergeConfig } from "../rndConfig"
import { assertRule, rndCoordinate } from "../rndCoordinates"
import { toInterval } from "../rndInterval"
import { validateKinds } from "../rndKinds"
import { assertDegree, assertVariables } from "../rndValidation"
import { randomInt, randomIntSym } from "../rndHelpers"
import { InvalidArgumentError } from "../../errors"

const defaults = {
    degree: 1,
    variables: 'x',
    fraction: false as RandomEquationConfig['fraction'],
    unit: false,
    factorable: false,
    shuffle: false,
    solution: {
        count: undefined as number | undefined,
        allowZero: true,
        relative: false,
        range: 5 as RandomRange,
        nothing: false as boolean | number,
        everything: false as boolean | number,
    },
    allow: {
        negativeLeading: false,
        commonFactor: true,
    },
}

type Config = typeof defaults

/** The probability that `nothing` / `everything` stands for; the number has already been validated. */
function toProb(v: boolean | number): number {
    if (v === true) return 1
    if (v === false) return 0
    return v
}

type SolutionMode = 'nothing' | 'everything' | 'normal'

function resolveMode(nothing: boolean | number, everything: boolean | number): SolutionMode {
    const n = toProb(nothing)
    const e = toProb(everything)
    const r = Math.random()
    if (n + e <= 1) {
        if (r < n) return 'nothing'
        if (r < n + e) return 'everything'
        return 'normal'
    }
    return r < n / (n + e) ? 'nothing' : 'everything'
}

/**
 * Generates a random polynomial equation.
 *
 * **Modes (evaluated in order):**
 * - `solution.everything: true` — degenerate P = P (infinite solutions, 0 = 0).
 * - `solution.nothing: true` — degenerate P+k = P, k ≠ 0 (no solution, ∅).
 * - `factorable: true` or `solution.count` set — P built as a product of controlled factors.
 * - Default — random P(x) = 0.
 *
 * **`solution.count`** — exact number of distinct real solutions (0..degree).
 * When (degree−count) is odd, one root is doubled (still one distinct solution).
 * count=0 with odd degree is impossible by IVT and throws.
 *
 * **Irreducible quadratic factors** — when needed to fill remaining degree after
 * linear factors, uses ax²+c (a,c > 0), which always has negative discriminant.
 *
 * **`solution.relative: true`** — forces integer roots of either sign (unit leading coefficient per factor).
 *
 * **`solution.range`** — the interval of the solutions (default `[-5, 5]`), also used for the constant that `nothing`
 * adds; fractional solutions follow `fraction` within it.
 *
 * **`solution.allowZero`** — allows 0 as a root (default `true`). It is in `solution`, not in `allow`, because it
 * constrains the solutions of the equation rather than its coefficients.
 *
 * **`shuffle: true`** — adds a random polynomial Q (same degree/variables/fraction)
 * to both sides: P = 0 becomes P+Q = Q.
 *
 * @throws {InvalidArgumentError} if degree is not a non-negative integer.
 * @throws {InvalidArgumentError} if variables is not a non-empty string of lowercase letters, or holds several
 *   variables while `factorable` or `solution.count` is set (the solutions are those of a single variable).
 * @throws {InvalidArgumentError} if `solution.nothing` or `solution.everything` is neither a boolean nor a
 *   probability between 0 and 1.
 * @throws {InvalidArgumentError} if `solution.range` is invalid, or holds only 0 while `solution.nothing` can be drawn.
 * @throws {InvalidArgumentError} if solution.count is out of range or impossible for the given degree.
 * @throws {InvalidArgumentError} if the configuration contains the former `solution.integer` option
 *   (renamed `solution.relative`).
 */
export function rndEquation(userConfig?: RandomEquationConfig): Equation {
    if (userConfig?.solution !== undefined && 'integer' in userConfig.solution) {
        throw new InvalidArgumentError('solution.integer was renamed solution.relative')
    }

    const config = mergeConfig(defaults, userConfig)

    // Every check precedes the random choice of the mode: an invalid configuration throws on each call.
    assertDegree(config.degree)
    assertVariables(config.variables)
    validateKinds(['nothing', 'everything'], config.solution, 'solution')
    const interval = toInterval(config.solution.range)
    if (toProb(config.solution.nothing) > 0) {
        // The constant that `nothing` adds must be non-zero.
        assertRule(interval, 'nonzero')
    }
    if ((config.factorable || config.solution.count !== undefined) && new Set(config.variables).size > 1) {
        throw new InvalidArgumentError('factorable and solution.count need a single variable')
    }

    const equation = buildMainEquation(config)

    if (config.shuffle) {
        equation.add(rndPolynom({
            degree: config.degree,
            variables: config.variables,
            fraction: config.fraction,
            allow: { negativeLeading: false },
        }))
    }

    return equation
}

function buildMainEquation(config: Config): Equation {
    const mode = resolveMode(config.solution.nothing, config.solution.everything)
    if (mode === 'everything') return buildEverything(config)
    if (mode === 'nothing') return buildNothing(config)
    if (config.factorable || config.solution.count !== undefined) return buildFactored(config)

    return new Equation(
        rndPolynom({
            degree: config.degree,
            variables: config.variables,
            fraction: config.fraction,
            unit: config.unit,
            allow: {
                negativeLeading: config.allow.negativeLeading,
                commonFactor: config.allow.commonFactor,
            },
        }),
        0,
    )
}

function buildEverything(config: Config): Equation {
    const P = rndPolynom({
        degree: config.degree,
        variables: config.variables,
        fraction: config.fraction,
        unit: config.unit,
        allow: { nullMonom: false, negativeLeading: config.allow.negativeLeading },
    })
    return new Equation(P, P.clone())
}

function buildNothing(config: Config): Equation {
    const P = rndPolynom({
        degree: config.degree,
        variables: config.variables,
        fraction: config.fraction,
        unit: config.unit,
        allow: { nullMonom: false, negativeLeading: config.allow.negativeLeading },
    })
    // P + offset = P simplifies to offset = 0 → no solution (offset is always non-zero).
    const offset = Polynom.fromConstant(
        rndCoordinate(toInterval(config.solution.range), 'nonzero', config.fraction === false ? false : fractionOf(config))
    )
    return new Equation(P.clone().add(offset), P)
}

function buildFactored(config: Config): Equation {
    const d = config.degree
    const k = config.solution.count ?? d

    if (!Number.isInteger(k) || k < 0 || k > d) {
        throw new InvalidArgumentError('solution.count must be an integer between 0 and degree')
    }
    if (k === 0 && d % 2 !== 0) {
        throw new InvalidArgumentError('an odd-degree polynomial always has at least one real solution')
    }

    const remaining = d - k
    // When remaining is odd, one root is doubled so total linear factor count stays odd,
    // leaving an even degree for the irreducible quadratics.
    const doubleNeeded = remaining % 2 !== 0

    const roots: Fraction[] = []
    for (let i = 0; i < k; i++) {
        for (let attempt = 0; attempt < 200; attempt++) {
            const root = generateRoot(config)
            if (!roots.some(r => r.isEqual(root))) {
                roots.push(root)
                break
            }
            if (attempt === 199) {
                throw new InvalidArgumentError('could not generate enough distinct roots')
            }
        }
    }

    const linearFactors: Polynom[] = roots.map(r => rootToFactor(r, config.variables[0]))

    if (doubleNeeded) {
        linearFactors.push(linearFactors[0].clone())
    }

    const v = config.variables[0]
    const nQuadratics = (d - linearFactors.length) / 2
    const allFactors: Polynom[] = [
        ...linearFactors,
        ...Array.from({ length: nQuadratics }, () => buildIrreducibleQuadratic(v)),
    ]

    if (allFactors.length === 0) {
        // degree=0, count=0: constant ≠ 0, no solution
        return new Equation(new Polynom(randomInt(1, 9)), 0)
    }

    const P = Polynom.xMultiply(...allFactors)

    if (!config.allow.negativeLeading && P.monomByDegree().coefficient.isNegative()) {
        P.opposite()
    }

    if (!config.allow.commonFactor) {
        const g = P.gcdNumerator()
        if (g > 1) {
            P.monoms = P.monoms.map(m => {
                m.coefficient.divide(g)
                return m
            })
        }
    }

    return new Equation(P, 0)
}

/** The fraction configuration of the coefficients, used for the solutions that are not integers. */
function fractionOf(config: Config): true | Exclude<Config['fraction'], boolean | undefined> {
    return typeof config.fraction === 'object' ? config.fraction : true
}

function generateRoot(config: Config): Fraction {
    const interval = toInterval(config.solution.range)
    const rule = config.solution.allowZero ? 'free' : 'nonzero'

    return rndCoordinate(interval, rule, config.solution.relative ? false : fractionOf(config))
}

function rootToFactor(root: Fraction, variable: string): Polynom {
    // factor = (q·var - p) so that q·var - p = 0 → var = p/q = root
    const p = root.numerator   // signed, coprime with q after reduce()
    const q = root.denominator // always positive after reduce()
    const c = -p
    if (c === 0) return new Polynom(`${q}${variable}`)
    return new Polynom(`${q}${variable}${c > 0 ? '+' : ''}${c}`)
}

/** Largest coefficient `a` and `c` of the irreducible quadratics `ax² + bx + c`. */
const QUADRATIC_BOUND = 5

function buildIrreducibleQuadratic(variable: string): Polynom {
    const a = randomInt(1, QUADRATIC_BOUND)
    const c = randomInt(1, QUADRATIC_BOUND)
    // b must satisfy b² < 4ac; the largest valid integer |b| is ceil(2√(ac)) - 1
    const bMax = Math.ceil(2 * Math.sqrt(a * c)) - 1
    const b = randomIntSym(bMax)
    if (b === 0) return new Polynom(`${a}${variable}^2+${c}`)
    const bStr = b > 0 ? `+${b}` : String(b)
    return new Polynom(`${a}${variable}^2${bStr}${variable}+${c}`)
}
