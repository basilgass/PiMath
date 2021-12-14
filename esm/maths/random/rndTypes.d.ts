export declare type randomCoefficientConfig = {
    negative?: boolean;
    reduced?: boolean;
    zero?: boolean;
};
export declare type randomMonomConfig = {
    letters?: string;
    degree?: number;
    fraction?: boolean;
    zero?: boolean;
};
export declare type randomPolynomConfig = randomMonomConfig & {
    unit?: boolean;
    factorable?: boolean;
    allowNullMonom?: boolean;
    numberOfMonoms?: number;
};
