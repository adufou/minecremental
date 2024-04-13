import {StateCreator} from "zustand";
import {AIMED_TICK_DURATION_IN_MS} from "@/components/providers/tick-provider.tsx";
import treeSliceMethods from "@/components/providers/engine/Tree/store/tree-slice-methods.ts";

const BASE_CHOP_DURATION_IN_MS = 30 * 1000;
const BASE_CHOP_PER_TICK =  AIMED_TICK_DURATION_IN_MS / BASE_CHOP_DURATION_IN_MS;

export interface TreeSliceCreator {
    chopPerTick: number;
    chopProgress: number;
    chop: () => {
        nbChopped: number
    };
}

export const createTreeSlice: StateCreator<TreeSliceCreator, [], [], TreeSliceCreator> = (set) => ({
    chopPerTick: BASE_CHOP_PER_TICK, // 8sec base, for test TODO CHANGE
    chopProgress: 0,
    chop: () => {
        let nbChopped = 0;
        let newProgress = 0;

        set((state) => {
            const chopProgressResult  = treeSliceMethods().chopProgress({
                progress: state.chopProgress,
                chopPerTick: state.chopPerTick,
                nbTick: 1
            })

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