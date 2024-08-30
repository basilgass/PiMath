import { Study, type ASYMPTOTE_POSITION, type IAsymptote, type ITableOfSigns, type IZero, type StudyableFunction, type StudyConfig } from "../study";
import type { Rational } from "../rational";
export declare class RationalStudy extends Study {
    constructor(fx: StudyableFunction, config?: StudyConfig | string);
    makeZeroes(): IZero[];
    makeSigns(): ITableOfSigns;
    makeAsymptotes(): IAsymptote[];
    _getHorizontalAsymptoteRelativePositon(deltaX: Rational, delta?: number): ASYMPTOTE_POSITION[];
    makeDerivative(): ITableOfSigns;
    makeVariation(): ITableOfSigns;
    private _getZeroes;
    private _getSigns;
}
//# sourceMappingURL=rationalStudy.d.ts.map