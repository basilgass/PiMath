/**
 * Number of random draws used by the tests of the generators, according to the Vitest mode
 * (`vitest run --mode quick`, `--mode full`; any other mode is "normal").
 *
 * - `draws(n)` is for *property* tests ("every draw satisfies X"): they cannot fail by bad luck, so the count
 *   is scaled freely (x0.2 quick, x1 normal, x10 full).
 * - `drawsToSee(p)` and `drawsToSeeAll(k)` are for *existence* tests ("this outcome appears at least once"):
 *   they compute the count for which a false failure has a given risk (1e-6 quick, 1e-12 normal, 1e-18 full),
 *   so the probability of the outcome is written once, in the call.
 */
export type TestMode = 'quick' | 'normal' | 'full'

export interface SeeOptions {
    /** Number of outcomes that must all appear (default 1); the risk is shared between them (union bound). */
    outcomes?: number,
    /** Accepted risk that an outcome is missed (default: depends on the mode). */
    risk?: number,
}

const SCALE: Record<TestMode, number> = {quick: 0.2, normal: 1, full: 10}
const RISK: Record<TestMode, number> = {quick: 1e-6, normal: 1e-12, full: 1e-18}

/** Fewest draws a property test is reduced to. */
const MIN_DRAWS = 5

export function currentMode(): TestMode {
    // Vitest sets the mode ("test" by default, or the --mode option); the tests are not typed with vite/client.
    const mode = (import.meta as { env?: { MODE?: string } }).env?.MODE
    return mode === 'quick' || mode === 'full' ? mode : 'normal'
}

export function createDraws(mode: TestMode) {
    function drawsToSee(probability: number, {outcomes = 1, risk = RISK[mode]}: SeeOptions = {}): number {
        if (!(probability > 0 && probability < 1)) {
            throw new RangeError(`probability must be in ]0, 1[, got ${probability}`)
        }
        if (!Number.isInteger(outcomes) || outcomes < 1) {
            throw new RangeError(`outcomes must be a positive integer, got ${outcomes}`)
        }
        return Math.ceil(Math.log(risk / outcomes) / Math.log(1 - probability))
    }

    return {
        /** Draws for a property test, `count` being the number used in normal mode. */
        draws: (count: number): number => {
            return Math.max(Math.min(count, MIN_DRAWS), Math.ceil(count * SCALE[mode]))
        },

        /**
         * Draws needed to see an outcome of (lower bound of) probability `probability` at least once.
         * With `outcomes`, each of that many outcomes of probability at least `probability` appears.
         */
        drawsToSee,

        /** Draws needed to see each of `outcomes` equally likely outcomes at least once. */
        drawsToSeeAll: (outcomes: number, risk?: number): number => {
            if (!Number.isInteger(outcomes) || outcomes < 1) {
                throw new RangeError(`outcomes must be a positive integer, got ${outcomes}`)
            }
            return outcomes === 1 ? 1 : drawsToSee(1 / outcomes, {outcomes, risk})
        },
    }
}

const current = createDraws(currentMode())

export const draws = current.draws
export const drawsToSee = current.drawsToSee
export const drawsToSeeAll = current.drawsToSeeAll
