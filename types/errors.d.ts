export declare class PiMathError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}
export declare class ParseError extends PiMathError {
}
export declare class DimensionError extends PiMathError {
}
export declare class MathError extends PiMathError {
}
export declare class InvalidArgumentError extends PiMathError {
}
export declare class NotImplementedError extends PiMathError {
}
export declare class IndexError extends PiMathError {
}
export declare class StateError extends PiMathError {
}
//# sourceMappingURL=errors.d.ts.map