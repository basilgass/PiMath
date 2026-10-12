import {InvalidArgumentError} from "../../errors"
import {Line3} from "../../geometry/line3"
import {Point} from "../../geometry/point"
import {Vector} from "../../geometry/vector"
import type {RandomGeometryLine3Config, RandomGeometryVector3Config} from "../rndTypes"
import {mergeConfig} from "../rndConfig"
import {validateVectorOptions} from "./rndComponents"
import {drawKind, type KindsAllow, validateKinds} from "../rndKinds"
import {isPoint3Feasible, rndPoint3, type ZeroRules3} from "./rndPoint3"
import {rndVector3WithRules} from "./rndVector3"

type LineKind = 'general' | 'parallelXY' | 'parallelXZ' | 'parallelYZ' | 'parallelX' | 'parallelY' | 'parallelZ'

const KINDS: LineKind[] = ['general', 'parallelXY', 'parallelXZ', 'parallelYZ', 'parallelX', 'parallelY', 'parallelZ']

/** Zero rules of the direction `(a, b, c)` for each kind of line: the kinds are exclusive and none is the null vector. */
const RULES: Record<LineKind, ZeroRules3> = {
    general: ['nonzero', 'nonzero', 'nonzero'],
    parallelXY: ['nonzero', 'nonzero', 'zero'],
    parallelXZ: ['nonzero', 'zero', 'nonzero'],
    parallelYZ: ['zero', 'nonzero', 'nonzero'],
    parallelX: ['nonzero', 'zero', 'zero'],
    parallelY: ['zero', 'nonzero', 'zero'],
    parallelZ: ['zero', 'zero', 'nonzero'],
}

/** Probability of a line parallel to a coordinate plane (resp. an axis) when that kind is merely allowed (`true`). */
const PLANE_PROBABILITY = 0.05
const AXIS_PROBABILITY = 0.02

/** `general` is the flexible kind: it gets what the special kinds leave. */
const SPECIAL: Partial<Record<LineKind, number>> = {
    parallelXY: PLANE_PROBABILITY,
    parallelXZ: PLANE_PROBABILITY,
    parallelYZ: PLANE_PROBABILITY,
    parallelX: AXIS_PROBABILITY,
    parallelY: AXIS_PROBABILITY,
    parallelZ: AXIS_PROBABILITY,
}

const defaults = {
    allow: { general: true, parallelXY: true, parallelXZ: true, parallelYZ: true, parallelX: true, parallelY: true, parallelZ: true } as KindsAllow<LineKind>,
}

/**
 * Generates a random 3D `Line3`, built from a point `A` and a direction vector.
 *
 * **`A`** — a 3D `Point` fixes the point exactly; an object is the configuration of `rndPoint3` (default: its
 * own defaults). The legacy `{x, y, z}` form is rejected: use `new Point(x, y, z)`.
 *
 * **`direction`** — a non-null 3D `Vector` fixes the direction exactly; an object is the configuration of
 * `rndVector3` (`range`, `octant`, `fraction`, `primitive`…; default: its own defaults). The legacy `{x, y, z}`
 * form is rejected: use `new Vector(x, y, z)`. The direction is never null.
 *
 * **`allow`** — the kind of line to draw, for a random direction `(a, b, c)`. The kinds are exclusive:
 * - `general`: no zero component;
 * - `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component, i.e. parallel
 *   to that coordinate plane but to no axis;
 * - `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.
 *
 * Each is `false` (never), a number in `[0, 1]` (probability of that kind) or `true` (default). `true` means 5 % for
 * each `parallelXY` / `parallelXZ` / `parallelYZ`, 2 % for each `parallelX` / `parallelY` / `parallelZ`, and for
 * `general` what the others leave. An explicit number takes precedence over `true`, and probabilities that do not
 * add up are normalized. `{ parallelXY: 1 }` always gives a line parallel to the xy plane.
 *
 * The kind of line imposes the zeros of the direction, so the `axis` and `plane` of a direction configuration are
 * overridden (its `octant`, `range` and `fraction` still apply). A kind allowed by `true` that the direction
 * configuration makes impossible (e.g. a `range` that excludes 0, for a kind that needs a zero) is skipped.
 *
 * @throws {InvalidArgumentError} if `A`, `direction` or an `allow` entry is invalid, or if `direction.allow.zero`
 *   is `true`.
 * @throws {InvalidArgumentError} if `allow` excludes every kind of line, or if a kind asked by an explicit number
 *   is impossible with the direction configuration.
 * @throws {InvalidArgumentError} if an exact `direction` is null, or combined with an explicit `allow`.
 */
export function rndLine3(userConfig?: RandomGeometryLine3Config): Line3 {
    const allow = mergeConfig(defaults, { allow: userConfig?.allow }).allow
    validateKinds(KINDS, allow)

    const direction = userConfig?.direction

    // Validation precedes every random draw: an invalid configuration must throw on each call.
    if (direction instanceof Vector) {
        const exact = exactDirection(direction)
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- the generators are called from untyped JavaScript, which the types cannot rule out
        if (Object.values(userConfig?.allow ?? {}).some(value => value !== undefined)) {
            throw new InvalidArgumentError('allow cannot be combined with an exact direction')
        }
        return Line3.fromPointAndDirection(resolvePoint(userConfig?.A), exact)
    }

    const config = directionConfig(direction)
    const d = randomDirection(config, allow)
    return Line3.fromPointAndDirection(resolvePoint(userConfig?.A), d)
}

function resolvePoint(A: RandomGeometryLine3Config['A']): Point {
    if (A === undefined) return rndPoint3()

    if (A instanceof Point) {
        if (A.dimension !== 3) {
            throw new InvalidArgumentError('A must be a 3D point')
        }
        return A.clone()
    }

    if (isConfig(A)) {
        return rndPoint3(A)
    }

    throw new InvalidArgumentError('A must be a Point or a point configuration (use new Point(x, y, z) for an exact point)')
}

function exactDirection(direction: Vector): Vector {
    if (direction.dimension !== 3) {
        throw new InvalidArgumentError('direction must be a 3D vector')
    }
    if (direction.isZero()) {
        throw new InvalidArgumentError('direction must not be the null vector')
    }
    return direction.clone()
}

function directionConfig(direction: RandomGeometryVector3Config | undefined): RandomGeometryVector3Config {
    const config = direction ?? {}
    if (!isConfig(config)) {
        throw new InvalidArgumentError('direction must be a Vector or a vector configuration (use new Vector(x, y, z) for an exact direction)')
    }

    validateVectorOptions(config)
    if (config.allow?.zero === true) {
        throw new InvalidArgumentError('the direction of a line cannot be the null vector: allow.zero must not be true')
    }
    return config
}

/** A plain configuration object, as opposed to the legacy `{x, y, z}` form. */
function isConfig(value: unknown): value is object {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
        && !('x' in value) && !('y' in value) && !('z' in value)
}

function randomDirection(config: RandomGeometryVector3Config, allow: KindsAllow<LineKind>): Vector {
    const { allow: _allow, primitive: _primitive, ...pointConfig } = config
    const possible = { ...allow }

    // A kind the configuration makes impossible is skipped, unless an explicit number asked for it.
    for (const kind of KINDS) {
        if (isPoint3Feasible(pointConfig, [RULES[kind]])) continue

        const value = possible[kind]
        if (typeof value === 'number' && value > 0) {
            throw new InvalidArgumentError(`allow.${kind} cannot be satisfied with this direction configuration`)
        }
        possible[kind] = false
    }

    const kind = drawKind(KINDS, possible, SPECIAL)
    return rndVector3WithRules({ ...config, allow: { zero: false } }, [RULES[kind]])
}
