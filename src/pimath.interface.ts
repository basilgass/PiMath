import type {Fraction} from "./coefficients"
import type {Equation, Monom} from "./algebra"
import type {Line, Line3, Point, Vector} from "./geometry"
import type {Solution} from "./analyze/solution"

// Universal construction input. `Root` is intentionally excluded: it is not
// faithfully convertible to Fraction/number (irrationals), so it cannot be a
// universal input. Accept a Root contextually — via the generic parameter
// (`InputValue<Root>`) or a local union (see `Root.parse`: `InputValue<Root | Fraction>`),
// the same way `InputAlgebra` adds `Monom`.
export type InputValue<T> = T | string | number | Fraction
export type InputAlgebra<T> = InputValue<T> | Monom
export type LiteralType<T> = Record<string, T>

// Canonical relational sign of an (in)equation, after normalization: exactly one
// of =, <=, >=, <, >. No "not equal": an equation sign is purely relational.
export type EquationSign = "=" | "<=" | ">=" | "<" | ">"

// Permissive comparison input (Fraction.compare). The canonical EquationSign
// signs, plus alias spellings (=> / geq for >=, =< / leq for <=) and the
// (in)equality forms (<> / neq for ≠, same for =).
export type CompareSign =
    EquationSign |
    "=>" | "geq" |
    "=<" | "leq" |
    "<>" | "neq" | "same"

/** Selects between LaTeX and AsciiMath rendering in `#toOutput` helpers. */
export type OutputStyle = 'tex' | 'display'

/**
 * Base contract of every PiMath value object: a displayable, duplicable
 * mathematical entity.
 *
 * Note: construction (`parse` / `from***`) is intentionally NOT part of this
 * contract — input shapes are class-specific and handled per class, not
 * polymorphically. See `.claude/specs/pimath-architecture.md`.
 */
export interface IPiMathObject<T> {
    /** ASCIIMath rendering of the current state (terminal output, not chainable). */
    readonly display: string
    /** LaTeX rendering of the current state (terminal output, not chainable). */
    readonly tex: string

    /**
     * Full duplicate of this instance, **including display state** (selected form
     * and options set via `as***` / `with***`). Distinct from {@link copy}.
     */
    clone(): T;

    /**
     * Copy the **mathematical state** of another instance into `this` (display
     * state is NOT transferred — the receiver keeps its own formatting). Entry
     * point used when constructing/parsing from a same-type input. Distinct from
     * {@link clone}. Classes without a real implementation throw
     * `NotImplementedError`.
     */
    copy(value: T): T;
}

export interface IExpressionBase<T> {
    add(value: InputValue<T>): T;

    isEqual(value: InputValue<T>): boolean;

    isOne(): boolean;

    isZero(): boolean;

    one(): T;

    opposite(): T;

    reduce(): T;

    subtract(value: InputValue<T>): T;

    zero(): T;
}

export interface IExpressionMultiply<T> extends IExpressionBase<T> {
    multiply(value: InputValue<T>): T;

    pow(value: number): T;
}

export interface IExpression<T> extends IExpressionMultiply<T> {
    divide(value: InputValue<T>): T;

    inverse(): T;

    root(value: number): T;

    sqrt(): T;
}

export interface IEquation<T> {

    reduce(): T;

    solve(): Solution[]
}

export interface IAlgebra {
    readonly variables: string[];

    degree(variable?: string): Fraction;

    hasVariable(variable: string): boolean;
}

// Value evaluation contract, distinct from IAlgebra (variable queries) and from
// predicate evaluation (Equation/LogicalSet, which yield a boolean). Overloaded
// on asNumeric: a literal `true` yields a number, otherwise a Fraction; a runtime
// boolean falls back to the union.
export interface IEvaluable {
    evaluate(values: LiteralType<Fraction | number> | InputValue<Fraction>, asNumeric: true): number;

    evaluate(values: LiteralType<Fraction | number> | InputValue<Fraction>, asNumeric?: false): Fraction;

    evaluate(values: LiteralType<Fraction | number> | InputValue<Fraction>, asNumeric?: boolean): Fraction | number;
}

export interface IAnalyse<T> {
    derivative(): T | T[];

    integrate(a: InputValue<Fraction>, b: InputValue<Fraction>, variable?: string): Fraction;

    primitive(): T;
}

/**
 * Sign codes for sign tables (`TableOfSigns`).
 *
 * Codes reserved for the **variation table** (tableau de croissance — not yet
 * implemented) were removed to keep the type honest:
 * - `'u'` croissant (increasing)
 * - `'n'` décroissant (decreasing)
 * Add them back here when the variation table is implemented.
 */
export type TableOfSignsValues = '-' | '+' | 'h' | 'z' | 't' | 'd' | ''

/**
 * Result of a line intersection query (2D or 3D).
 * Discriminated on `hasIntersection`: when true, `point` is a `Point` and both flags are false.
 */
export type LineIntersection =
    | { hasIntersection: true;  point: Point;  isParallel: false;   isSame: false }
    | { hasIntersection: false; point: null;   isParallel: boolean; isSame: boolean }

/**
 * Result of a plane–line intersection query.
 * Discriminated on `hasIntersection`: when true, `point` is a `Point` and both flags are false.
 */
export type PlaneLineIntersection =
    | { hasIntersection: true;  point: Point;  isParallel: false;   isOnPlane: false }
    | { hasIntersection: false; point: null;   isParallel: boolean; isOnPlane: boolean }

/**
 * Result of a plane–plane intersection query.
 * Discriminated on `hasIntersection`: when true, `line` is a `Line3` and both flags are false.
 */
export type PlanePlaneIntersection =
    | { hasIntersection: true;  line: Line3;   isParallel: false;   isEqual: false }
    | { hasIntersection: false; line: null;    isParallel: boolean; isEqual: boolean }

/**
 * Geometric relation between two lines in the plane (2D).
 * @see Line3Property — the 3D equivalent, intentionally identical by design.
 */
export enum LineProperty {
    None = 'none',
    Parallel = 'parallel',
    Perpendicular = 'perpendicular',
    Tangent = 'tangent'
}

/**
 * Geometric relation between two lines in space (3D).
 * Intentionally mirrors {@link LineProperty}: 3D shares by design the same set
 * of relations as 2D. Both enums must stay synchronized.
 */
export enum Line3Property {
    None = 'none',
    Parallel = 'parallel',
    Perpendicular = 'perpendicular',
    Tangent = 'tangent'
}

export interface Plane3Config {
    coefficients?: number[]
    directions?: Vector[],
    equation?: Equation,
    normal?: Vector,
    point?: Point,
    points?: Point[],
}


// A triad of triangle lines keyed by vertices (A/B/C — cevians) or by
// sides (a/b/c — mediators), plus their common intersection point.
type TriangleLineTriad<K extends string> = Record<K, Line> & {
    intersection: Point | null
}

export interface RemarquableLines {
    bisectors: TriangleLineTriad<'A' | 'B' | 'C'> | null,
    externalBisectors: TriangleLineTriad<'A' | 'B' | 'C'> | null,
    heights: TriangleLineTriad<'A' | 'B' | 'C'> | null,
    medians: TriangleLineTriad<'A' | 'B' | 'C'> | null,
    mediators: TriangleLineTriad<'a' | 'b' | 'c'> | null
}
