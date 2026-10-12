import type { IPiMathObject } from "../pimath.interface";
import type { Fraction } from "../coefficients";
import { Interval } from "./interval";
export declare class Domain implements IPiMathObject<Domain> {
    #private;
    constructor(value?: string | Domain | Interval);
    static fromIntervals(intervals: Interval[]): Domain;
    static fromInterval(interval: Interval): Domain;
    static empty(): Domain;
    static real(): Domain;
    static fromString(value: string): Domain;
    parse(value: string | Domain | Interval): this;
    get tex(): string;
    get display(): string;
    clone(): Domain;
    copy(value: Domain): this;
    isEmpty(): boolean;
    contains(x: Fraction | number): boolean;
    intersect(other: Domain): Domain;
    union(other: Domain): Domain;
    complement(): Domain;
    get intervals(): Interval[];
    get length(): number;
}
//# sourceMappingURL=domain.d.ts.map