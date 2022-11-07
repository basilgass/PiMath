/**
 * The study class is a "function study" class that will get:
 * fx               : get the function
 * domain           : string
 * zeroes           : Object (tex, IZero)
 * signs            : table of signs + tex output  using tkz-tab
 * av               : vertical asymptotic
 * ah               : horizontal asymptotic
 * ao               : obliques
 * deltaX           : position relative
 * dx               : derivative
 * grows            : growing table + tex output  using tkz-tab
 * ddx              : dérivée seconde
 * variations       : variation table + tex output  using tkz-tab
 */
import { IAsymptote, ITableOfSigns, IZero, Study, StudyableFunction, StudyConfig } from "../study";
export declare class RationalStudy extends Study {
    constructor(fx: StudyableFunction, config?: StudyConfig);
    makeZeroes(): IZero[];
    makeSigns(): ITableOfSigns;
    makeAsymptotes(): IAsymptote[];
    makeDerivative(): ITableOfSigns;
    makeVariation(): ITableOfSigns;
    private _getZeroes;
    private _getSigns;
}
