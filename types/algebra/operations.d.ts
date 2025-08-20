import { IExpressionMultiply, IPiMathObject } from '../pimath.interface';
export declare function operation_pow<T extends IPiMathObject<T> & IExpressionMultiply<T>>(item: T, value: number): T;
