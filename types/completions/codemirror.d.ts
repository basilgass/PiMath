import type { CompletionSource } from '@codemirror/autocomplete';
import { type Extension } from '@codemirror/state';
import type { PiMathCompletions } from './types';
export interface PiMathCompletionOptions {
    extend?: Partial<Omit<PiMathCompletions, 'version'>>;
}
export declare function pimathCompletion(options?: PiMathCompletionOptions): CompletionSource;
export declare function pimathSignatureHelp(options?: PiMathCompletionOptions): Extension;
//# sourceMappingURL=codemirror.d.ts.map