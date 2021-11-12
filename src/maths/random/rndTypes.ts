
export type randomMonomConfig = {
    letters?: string,
    degree?: number,
    fraction?: boolean,
    zero?: boolean
}

export type randomPolynomConfig = randomMonomConfig & {
    unit?: boolean,
    factorable?: boolean,
    allowNullMonom?: boolean,
    numberOfMonoms?: number
}