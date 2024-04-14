import {StateCreator} from "zustand";
import treeSliceMethods from "@/components/providers/engine/Tree/store/tree-slice-methods.ts";
import {
    BASE_CHOP_ACTIVATION_DURATION_IN_MS,
    BASE_CHOP_PROGRESS_DURATION_IN_MS
} from "@/components/providers/engine/Tree/const.ts";

export interface TreeSliceCreator {
    chopActivate: () => void;
    chopActivationEnd: Date | undefined;
    chopActivationTimeout: NodeJS.Timeout | undefined;
    chopAuto: boolean;
    chopActive: boolean;
    chopDeactivate: () => void;
    chopDurationInMs: number;
    chopProgress: number;
    chop: (estimatedChopPerTick: number) => { nbChopped: number };
}

export const createTreeSlice: StateCreator<TreeSliceCreator, [], [], TreeSliceCreator> = (set) => ({
    chopActivate: () => {
        set((state) => {
            const activationEnd = Date.now() + BASE_CHOP_ACTIVATION_DURATION_IN_MS;

            if (state.chopActivationEnd) {
                clearTimeout(state.chopActivationTimeout);
            }
            const timeout = setTimeout(() => {
                console.log("deactivate")
                state.chopDeactivate()
            }, BASE_CHOP_ACTIVATION_DURATION_IN_MS)

            return {
                chopActivationEnd: new Date(activationEnd),
                chopActivationTimeout: timeout
            }
        })
    },
    chopActivationEnd: undefined,
    chopActivationTimeout: undefined,
    chopAuto: false,
    chopActive: false,
    chopDeactivate: () => {
        set(() => {
            return {
                chopActivationEnd: undefined,
                chopActivationTimeout: undefined,
            }
        })
    },
    chopDurationInMs: BASE_CHOP_PROGRESS_DURATION_IN_MS,
    chopProgress: 0,
    chop: (estimatedChopPerTick) => {
        let nbChopped = 0;
        let newProgress = 0;

        set((state) => {
            const chopProgressResult  = treeSliceMethods().chopProgress({
                progress: state.chopProgress,
                chopPerTick: (state.chopAuto || state.chopActivationEnd) ? estimatedChopPerTick : 0,
                nbTick: 1
            })

            // console.log('chop per tick', state.chopPerTick)

            nbChopped = chopProgressResult.nbChopped;
            newProgress = chopProgressResult.newProgress;

            return {
                chopProgress: newProgress,
            }
        })

        return {
            nbChopped
        }
    },
})