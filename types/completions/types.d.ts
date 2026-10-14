export interface CompletionEntry {
    label: string;
    type: 'class' | 'function' | 'method' | 'namespace' | 'property';
    detail?: string;
    info?: string;
}
export interface OptionEntry {
    path: string;
    type: string;
    default: string | null;
    description: string;
}
export interface PiMathCompletions {
    version: string;
    globals: CompletionEntry[];
    members: Record<string, CompletionEntry[]>;
    signatures: Record<string, string[]>;
    options: Record<string, OptionEntry[]>;
}
//# sourceMappingURL=types.d.ts.map