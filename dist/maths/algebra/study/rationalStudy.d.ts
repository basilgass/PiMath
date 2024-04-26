import { Rational } from '../rational';
import { ASYMPTOTE_POSITION, IAsymptote, ITableOfSigns, IZero, Study, StudyableFunction, StudyConfig } from '../study';

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
