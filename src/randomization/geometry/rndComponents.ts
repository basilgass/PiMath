/**
 * Constraints specific to the components of a random vector, shared by `rndVector` and `rndVector3`:
 * validation of the vector-only options, and the `primitive` reduction. The components themselves are
 * drawn by the point generators (see `rndCoordinates.ts`). Internal module, not part of the public API.
 */
import {Fraction} from "../../coefficients"
import {InvalidArgumentError} from "../../errors"
import {type Point, Vector} from "../../geometry"
import {Numeric} from "../../numeric"
import type {RandomCoefficientConfig, RandomRange, RandomVectorOptions} from "../rndTypes"
import {mergeConfig} from "../rndConfig"
import {DEFAULT_RANGE, MAX_ATTEMPTS, toInterval} from "../rndInterval"

/** What this module reads of a vector configuration: the vector-only options, and two point options. */
type VectorOptions = RandomVectorOptions & {
    fraction?: boolean | RandomCoefficientConfig,
    range?: RandomRange,
}

const defaults = {
    primitive: false,
    allow: { zero: false },
}

/**
 * Checks the options that only exist for vectors.
 *
 * @throws {InvalidArgumentError} on `allow.origin` (a vector is *null*, not an origin: use `allow.zero`),
 *   a non-boolean `allow.zero` or `primitive`, or `primitive` combined with non-integer components.
 */
export function validateVectorOptions(config: VectorOptions): void {
    const allow = (config.allow ?? {}) as Record<string, unknown>

    if (allow.origin !== undefined) {
        throw new InvalidArgumentError('allow.origin does not apply to a vector: use allow.zero')
    }
    if (allow.zero !== undefined && typeof allow.zero !== 'boolean') {
        throw new InvalidArgumentError('allow.zero must be a boolean')
    }
    if (config.primitive !== undefined && typeof config.primitive !== 'boolean') {
        throw new InvalidArgumentError('primitive must be a boolean')
    }

    const fraction = config.fraction
    const integer = !fraction || (typeof fraction === 'object' && fraction.relative === true)
    if (config.primitive === true && !integer) {
        throw new InvalidArgumentError('primitive requires integer components: use fraction false or { relative: true }')
    }
}

/**
 * Draws a vector with `draw`. Without `primitive`, the vector is returned as drawn and `range` is not read.
 * With `primitive`, the components are divided by their greatest common divisor (positive, so zeros and
 * signs are kept) and the result must still lie in `range` (the interval of the components, as given to the
 * point generator): otherwise the vector is drawn again. The null vector has no divisor and is returned as it is.
 *
 * @throws {InvalidArgumentError} if no primitive vector within `range` is found in `MAX_ATTEMPTS` draws.
 */
export function drawVector(draw: () => Vector, range: RandomRange, primitive: boolean): Vector {
    if (!primitive) return draw()

    const interval = toInterval(range)

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const vector = reduceComponents(draw())
        if (vector.array.every(c => c.value >= interval.min && c.value <= interval.max)) {
            return vector
        }
    }

    throw new InvalidArgumentError('could not draw a primitive vector within the range (widen range)')
}

function reduceComponents(vector: Vector): Vector {
    const numerators = vector.array.map(c => Math.abs(c.numerator))
    if (numerators.every(n => n === 0)) return vector

    const gcd = Numeric.gcd(...numerators)
    if (gcd === 1) return vector

    return new Vector(...vector.array.map(c => new Fraction(c.numerator / gcd)))
}

/**
 * Entry point of the vector generators: draws a vector from a point generator.
 *
 * Validates the vector-only options (`allow.zero`, `primitive`), then calls `drawPoint` with the other options
 * of the configuration (`axis`, `range`, `fraction`…) and `allow.origin` set from `allow.zero`, and applies
 * `primitive` (see {@link drawVector}).
 *
 * @throws {InvalidArgumentError} see {@link validateVectorOptions} and {@link drawVector}; `drawPoint` throws
 *   for its own invalid options.
 */
export function drawVectorFromPoints<C extends VectorOptions>(
    userConfig: C | undefined,
    drawPoint: (pointConfig: Omit<C, 'allow' | 'primitive'> & { allow: { origin: boolean } }) => Point
): Vector {
    validateVectorOptions(userConfig ?? {})

    const { allow, primitive } = mergeConfig(defaults, { primitive: userConfig?.primitive, allow: userConfig?.allow })
    const { allow: _allow, primitive: _primitive, ...pointConfig } = (userConfig ?? {}) as C

    return drawVector(
        () => new Vector(drawPoint({ ...pointConfig, allow: { origin: allow.zero } })),
        userConfig?.range ?? DEFAULT_RANGE,
        primitive
    )
}
