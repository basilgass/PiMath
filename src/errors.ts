/**
 * Typed error hierarchy for PiMath.
 *
 * All PiMath errors extend {@link PiMathError}, so a consumer can catch every
 * library error at once with `catch (e) { if (e instanceof PiMathError) ... }`,
 * or discriminate a specific kind with `instanceof ParseError`, etc.
 *
 * The original error (e.g. piexpression's ParseError) is chained through the
 * standard ES2022 `cause` option.
 */
export class PiMathError extends Error {
    constructor(message: string, options?: { cause?: unknown }) {
        super(message, options)
        // Use the concrete subclass name (ParseError, MathError, ...).
        this.name = new.target.name
    }
}

/** The input string cannot be parsed into the target object. */
export class ParseError extends PiMathError {
}

/** Incompatible dimensions (matrix, vector, point, ...). */
export class DimensionError extends PiMathError {
}

/** Mathematically invalid operation on otherwise valid inputs. */
export class MathError extends PiMathError {
}

/** An argument is invalid (outside of string parsing). */
export class InvalidArgumentError extends PiMathError {
}

/** The called method is not implemented yet. */
export class NotImplementedError extends PiMathError {
}

/** An index is out of range. */
export class IndexError extends PiMathError {
}

/** An operation was attempted on an object in an invalid/uninitialized state. */
export class StateError extends PiMathError {
}
