import {Fraction} from "../coefficients/fraction"
import type {Point} from "../geometry/point"
import type {Vector} from "../geometry/vector"
import type {InputValue} from "../pimath.interface"

/** Options of `rndFraction`. */
export interface RandomCoefficientConfig {
    /** Bound (absolute value) of the numerator and of the denominator (default `10`). */
    max?: number,
    /**
     * `true` forces an integer of either sign (denominator 1): the name follows `Fraction.isRelative()`
     * (a "natural" number would be non-negative). Default `false`.
     */
    relative?: boolean,
    /** Reduce the fraction (default `true`). */
    reduced?: boolean,
    /**
     * Interval of the value: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds (default: none, the
     * value is only bounded by `max`). Combined with `allow`: a sign is possible only if the interval holds values
     * of that sign. `max` then defaults to the largest bound of the interval, at least 2 (doubled when the interval
     * stays at least 1 away from 0), so that a small interval still gets fractions. Where a generator drives the interval itself (the coordinates of a point, the
     * radius…), its own interval replaces this one.
     */
    range?: RandomRange,
    allow?: {
        /** Allow the value 0 (default `false`). */
        zero?: boolean,
        /** Allow negative values (default `true`). */
        negative?: boolean,
        /** Allow positive values (default `true`). With `negative: false` and `zero` left to `false` nothing is left: it throws. */
        positive?: boolean,
    }
}

/**
 * A number given exactly (`2`, `'-3/2'`, `new Fraction(1, 2)`), or `{ fraction }` to draw it at random:
 * `false` for an integer, `true` for a fraction, or a `RandomCoefficientConfig` for full control.
 */
export type FractionOrRandom = InputValue<Fraction> | RandomFraction

/** How a number is drawn at random: see {@link FractionOrRandom}. */
export interface RandomFraction {
    fraction?: boolean | RandomCoefficientConfig
}

/** Options of `rndMonom`. */
export interface RandomMonomConfig {
    /** Total degree, a non-negative integer (default `2`). */
    degree?: number,
    /**
     * Coefficient: `false` (default) gives an integer, `true` allows fractions,
     * an object gives full control over the coefficient.
     */
    fraction?: boolean | RandomCoefficientConfig,
    /** Variables of the monom, one lowercase letter each, duplicates ignored (default `'x'`). With several variables, the degree is spread randomly. */
    variables?: string,
    allow?: {
        /** Allow a zero coefficient (default `false`). */
        zero?: boolean,
    }
}

/** Options of `rndPolynom`. */
export interface RandomPolynomConfig {
    /**
     * Only for `factorable: true`. `undefined` (default): a non-unit integer constant factor is sometimes added;
     * `false`: never; `true`: always, with an absolute value of at least 2. Contradicts `allow.commonFactor: false`
     * (which asks for no common factor at all) and throws with it.
     */
    commonConstant?: boolean,
    /** Degree, a non-negative integer (default `2`). */
    degree?: number,
    /** Build the polynom as a product of `degree` linear factors (default `false`). */
    factorable?: boolean,
    /** Coefficients: `false` (default) gives integers, `true` fractions, an object gives full control. */
    fraction?: boolean | RandomCoefficientConfig,
    /** Variables of the polynom, one lowercase letter each (default `'x'`). */
    variables?: string,
    /** Maximum number of terms (default `0`: no limit). Ignored when the polynom already has fewer terms. */
    numberOfMonoms?: number,
    /** Force a leading coefficient equal to 1 (default `false`). */
    unit?: boolean,
    allow?: {
        /** Non-leading terms may have a zero coefficient, i.e. be absent (default `true`). */
        nullMonom?: boolean,
        /** Allow a negative leading coefficient (default `false`: the polynom is negated if needed). */
        negativeLeading?: boolean,
        /**
         * Allow a common factor between the integer coefficients (default `true`); `false` divides it out, and with
         * `factorable` also adds no constant factor. The division is skipped with fractions.
         */
        commonFactor?: boolean,
    }
}

/** Options of `rndEquation`. */
export interface RandomEquationConfig {
    /** Degree, a non-negative integer (default `1`). */
    degree?: number,
    /** Variables of the equation, one lowercase letter each (default `'x'`). */
    variables?: string,
    /** Coefficients: `false` (default) gives integers, `true` fractions, an object gives full control. */
    fraction?: boolean | RandomCoefficientConfig,
    /** Force a leading coefficient equal to 1 (default `false`). */
    unit?: boolean,
    /** Build the equation from a product of factors, so that its solutions are controlled (default `false`). */
    factorable?: boolean,
    /** Add a random polynom to both sides: `P = 0` becomes `P + Q = Q` (default `false`). */
    shuffle?: boolean,
    solution?: {
        /** Exact number of distinct real solutions, from 0 to `degree`. Implies a factored construction. */
        count?: number,
        /**
         * Allow 0 as a solution (default `true`). It lives in `solution` rather than in `allow`: it constrains the
         * solutions of the equation, not its coefficients.
         */
        allowZero?: boolean,
        /** Force integer solutions of either sign, like `relative` for a fraction (default `false`). */
        relative?: boolean,
        /**
         * Interval of the solutions, and of the constant added by `nothing` (default `5`, i.e. `[-5, 5]`): a number
         * `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds. Fractional solutions follow the `fraction`
         * configuration, within this interval.
         */
        range?: RandomRange,
        /** Equation without solution: `true`, `false` (default), or a probability between 0 and 1. */
        nothing?: boolean | number,
        /** Equation true for every value: `true`, `false` (default), or a probability between 0 and 1. */
        everything?: boolean | number,
    }
    allow?: {
        /** Allow a negative leading coefficient (default `false`). */
        negativeLeading?: boolean,
        /** Allow a common factor between the integer coefficients (default `true`). */
        commonFactor?: boolean,
    }
}


/** Options of `rndLine`. */
export interface RandomGeometryLineConfig {
    /**
     * Point on the line: a `Point` fixes it exactly (`new Point(1, 2)`); an object is the configuration
     * of the random point drawn by `rndPoint` (default: its own defaults).
     */
    A?: Point | RandomGeometryPointConfig,
    /**
     * Slope of the line (default: a random slope, as with `{ fraction: true }`).
     * - an exact value (`2`, `'-3/2'`, `new Fraction(1, 2)`): the line has exactly that slope. Prefer a string
     *   for a non-terminating fraction (`'1/3'`, not `0.333`). Incompatible with an explicit `allow`.
     * - `{ fraction }`: a random slope, `false` for an integer, `true` for a fraction, or a
     *   `RandomCoefficientConfig` (e.g. `max`). The sign comes from `allow.positive` / `allow.negative`.
     */
    slope?: FractionOrRandom,
    /**
     * Kind of line that may be drawn, for a random slope. Each entry is `false` (never), a number between
     * 0 and 1 (probability of that kind), or `true` (default):
     * - `vertical` / `horizontal` (zero slope): `true` means a fixed probability of 5 %;
     * - `positive` / `negative` (slope sign): `true` shares equally what the others leave.
     *
     * Probabilities that do not add up are normalized, and an explicit number takes precedence over `true`.
     * Examples: `{ negative: false, horizontal: false, vertical: false }` always gives a positive slope;
     * `{ vertical: 1 }` always gives a vertical line.
     */
    allow?: {
        vertical?: boolean | number,
        horizontal?: boolean | number,
        positive?: boolean | number,
        negative?: boolean | number,
    }
}

/** Options of `rndLine3`. */
export interface RandomGeometryLine3Config {
    /**
     * Point on the line: a 3D `Point` fixes it exactly (`new Point(1, 2, 3)`); an object is the configuration
     * of the random point drawn by `rndPoint3` (default: its own defaults).
     */
    A?: Point | RandomGeometryPoint3Config,
    /**
     * Direction of the line: a non-null 3D `Vector` fixes it exactly (`new Vector(1, 0, 2)`; incompatible with an
     * explicit `allow`); an object is the configuration of the random vector drawn by `rndVector3`. The
     * direction is never null. Its `axis` and `plane` are overridden by the kind of line drawn (see `allow`),
     * and its `allow.zero` must not be `true`.
     */
    direction?: Vector | RandomGeometryVector3Config,
    /**
     * Kind of line that may be drawn, for a random direction `(a, b, c)`. The kinds are exclusive; each entry is
     * `false` (never), a number between 0 and 1 (probability of that kind), or `true` (default):
     * - `general`: no zero component (the line is parallel to no coordinate plane). `true` shares what the
     *   other kinds leave;
     * - `parallelXY` (`c = 0`), `parallelXZ` (`b = 0`), `parallelYZ` (`a = 0`): exactly one zero component,
     *   i.e. parallel to that coordinate plane but to no axis. `true` means 5 %;
     * - `parallelX` (`b = c = 0`), `parallelY`, `parallelZ`: two zero components, i.e. parallel to that axis.
     *   `true` means 2 %.
     *
     * Probabilities that do not add up are normalized, and an explicit number takes precedence over `true`.
     * A kind allowed by `true` that the `direction` configuration makes impossible (e.g. a `range` excluding 0
     * for a kind that needs a zero) is skipped; the same kind asked by an explicit number throws.
     */
    allow?: {
        general?: boolean | number,
        parallelXY?: boolean | number,
        parallelXZ?: boolean | number,
        parallelYZ?: boolean | number,
        parallelX?: boolean | number,
        parallelY?: boolean | number,
        parallelZ?: boolean | number,
    }
}

/** Quadrant of the plane, numbered counter-clockwise from the upper right (axes included). */
export type Quadrant = 1 | 2 | 3 | 4

/** Interval of the coordinates: a number `d` means `[-|d|, |d|]`, `{min, max}` gives explicit bounds. */
export type RandomRange = number | { min: number, max: number }

/** Options of `rndPoint`. */
export interface RandomGeometryPointConfig {
    /**
     * Where the point lies relative to the axes (default `null`).
     * - `'x'`: on the x-axis (`y = 0`); `'y'`: on the y-axis (`x = 0`).
     * - `true`: on one of the two axes, chosen at random.
     * - `false`: on no axis (no coordinate is zero).
     * - `null`: unconstrained (a coordinate may be zero).
     */
    axis?: 'x' | 'y' | boolean | null,
    /** `false` (default): integer coordinates; `true`: fractions; object: full control over the fractions. */
    fraction?: boolean | RandomCoefficientConfig,
    /**
     * Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`
     * (so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds.
     */
    range?: RandomRange,
    /**
     * Restricts the point to one quadrant, or to a union of quadrants (default `null`).
     * Axes belong to the quadrants: quadrant 1 means `x >= 0` and `y >= 0`.
     * With several quadrants, one of them is chosen uniformly, then the point is drawn in it.
     */
    quadrant?: Quadrant | Quadrant[] | null,
    allow?: {
        /** `false` excludes the point `(0, 0)` (default `true`). */
        origin?: boolean,
    }
}

/**
 * Octant of space, axes and planes included. 1 to 4 are the quadrants 1 to 4 with `z >= 0`;
 * 5 to 8 are the same quadrants with `z <= 0` (so octant 5 is below octant 1).
 */
export type Octant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

/** Options of `rndPoint3`. */
export interface RandomGeometryPoint3Config {
    /**
     * Where the point lies relative to the axes (default `null`).
     * - `'x'`, `'y'`, `'z'`: on that axis (the two other coordinates are zero).
     * - `true`: on one of the three axes, chosen at random.
     * - `false`: on no axis and in no coordinate plane (no coordinate is zero).
     * - `null`: unconstrained (a coordinate may be zero).
     *
     * Exclusive with `plane`.
     */
    axis?: 'x' | 'y' | 'z' | boolean | null,
    /**
     * Coordinate plane containing the point (default `null`).
     * - `'xy'` (`z = 0`), `'xz'` (`y = 0`), `'yz'` (`x = 0`): the other two coordinates are free.
     * - `true`: in one of the three planes, chosen at random.
     * - `false` / `null`: no constraint.
     *
     * Exclusive with `axis`.
     */
    plane?: 'xy' | 'xz' | 'yz' | boolean | null,
    /** `false` (default): integer coordinates; `true`: fractions; object: full control over the fractions. */
    fraction?: boolean | RandomCoefficientConfig,
    /**
     * Interval of the coordinates (default `10`). A number `d` means `[-|d|, |d|]`
     * (so `10` and `-10` are equivalent); `{min, max}` gives explicit bounds.
     */
    range?: RandomRange,
    /**
     * Restricts the point to one octant, or to a union of octants (default `null`).
     * Axes and planes belong to the octants. With several octants, one of them is chosen uniformly,
     * then the point is drawn in it.
     */
    octant?: Octant | Octant[] | null,
    allow?: {
        /** `false` excludes the point `(0, 0, 0)` (default `true`). */
        origin?: boolean,
    }
}

/** The options that only exist for vectors, shared by `rndVector` and `rndVector3`. */
export interface RandomVectorOptions {
    /** Integer components with no common divisor, e.g. `(1, 2)` and never `(2, 4)` (default `false`). Requires integers. */
    primitive?: boolean,
    allow?: {
        /** `true` allows the null vector (default `false`). */
        zero?: boolean,
    }
}

/**
 * Options of `rndVector`: those of `rndPoint` (`axis`, `quadrant`, `range`, `fraction`), with `allow.zero`
 * in place of `allow.origin`, and `primitive`.
 */
export interface RandomGeometryVectorConfig extends Omit<RandomGeometryPointConfig, 'allow'>, RandomVectorOptions {}

/**
 * Options of `rndVector3`: those of `rndPoint3` (`axis`, `plane`, `octant`, `range`, `fraction`), with
 * `allow.zero` in place of `allow.origin`, and `primitive`.
 */
export interface RandomGeometryVector3Config extends Omit<RandomGeometryPoint3Config, 'allow'>, RandomVectorOptions {}

/** Options of `rndCircle`. */
export interface RandomGeometryCircleConfig {
    /** Options of the center, drawn by `rndPoint` (default: its own defaults). */
    center?: RandomGeometryPointConfig,
    /**
     * Radius of the circle: an exact value (`5`, `'5/2'`), or `{ fraction }` for a random one
     * (`fraction: false` gives an integer from 1 to 5 unless `max` is given, `true` a fraction). Exclusive with
     * `squaredRadius`. The default is a random `squaredRadius`.
     */
    radius?: FractionOrRandom,
    /**
     * Squared radius of the circle (the radius is then its square root, possibly irrational: `5` gives
     * x² + y² = 5). Same forms as `radius`; the random integer ranges from 1 to 25 unless `max` is given.
     * An object `fraction` gives fractions unless it sets `relative: true`.
     */
    squaredRadius?: FractionOrRandom,
    /**
     * Wanted number of points of the circle with exact coordinates: `n` is shorthand for `{ min: n }`.
     * - `min`: the circle has **at least** that many points whose offsets from the center are integers (the
     *   coordinates stay exact fractions when the center is fractional). A count is always a multiple of 4.
     * - `fraction`: reserved for points with fractional offsets; `true` is not implemented yet.
     *
     * Default `{ min: 8, fraction: false }`, applied only when neither `radius` nor `squaredRadius` is given;
     * once one of them is given, `pointsOnCircle` applies only if set explicitly (an exact radius that does not
     * reach `min` then throws, and so does a fractional random radius, which has no integer points).
     */
    pointsOnCircle?: number | { min?: number, fraction?: boolean },
}
