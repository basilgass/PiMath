import {InputValue, IOperations, IPiMathObject} from "../pimath.interface.ts";


export abstract class PiMathCore
    implements IPiMathObject<PiMathCore>, IOperations<PiMathCore> {
    abstract readonly tex: string;
    abstract readonly display: string;

    abstract clone(): PiMathCore;

    abstract parse(value: InputValue<PiMathCore>): PiMathCore;

    abstract add(value: InputValue<PiMathCore>): PiMathCore;

    subtract(value: InputValue<PiMathCore>): PiMathCore {
        return this.add(
            this.parse(value).opposite()
        );
    };

    abstract multiply(value: InputValue<PiMathCore>): PiMathCore;

    abstract divide(value: InputValue<PiMathCore>): PiMathCore;

    abstract opposite(): PiMathCore;

    abstract pow(value: number): PiMathCore;

    abstract root(value: number): PiMathCore;
}