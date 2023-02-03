import { Fraction } from "../coefficients/fraction";
export type randomCoefficientConfig = {
    negative?: boolean;
    max?: number;
    reduced?: boolean;
    zero?: boolean;
    natural?: boolean;
};
export type randomMonomConfig = {
    letters?: string;
    degree?: number;
    fraction?: boolean | randomCoefficientConfig;
    zero?: boolean;
};
export type randomPolynomConfig = randomMonomConfig & {
    unit?: boolean;
    factorable?: boolean;
    allowNullMonom?: boolean;
    numberOfMonoms?: number;
    positive?: boolean;
};
export type randomGeometryLineConfig = {
    A: {
        x: number | Fraction;
        y: number | Fraction;
    };
    slope?: Fraction | string | number;
};
