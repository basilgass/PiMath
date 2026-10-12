export type KindsAllow<K extends string> = Record<K, boolean | number>;
export declare function validateKinds<K extends string>(kinds: readonly K[], allow: KindsAllow<K>, path?: string): void;
export declare function kindWeights<K extends string>(kinds: readonly K[], allow: KindsAllow<K>, special: Partial<Record<K, number>>): Record<K, number>;
export declare function pickKind<K extends string>(kinds: readonly K[], weights: Record<K, number>): K;
export declare function drawKind<K extends string>(kinds: readonly K[], allow: KindsAllow<K>, special: Partial<Record<K, number>>): K;
//# sourceMappingURL=rndKinds.d.ts.map