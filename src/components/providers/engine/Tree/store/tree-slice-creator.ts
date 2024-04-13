import {StateCreator} from "zustand";
import treeSliceMethods from "@/components/providers/engine/Tree/store/tree-slice-methods.ts";
import {BASE_CHOP_DURATION_IN_MS} from "@/components/providers/engine/Tree/const.ts";

export interface TreeSliceCreator {
    chopDurationInMs: number
    chopProgress: number;
    chop: (chopPerTick: number) => { nbChopped: number };
}

export const createTreeSlice: StateCreator<TreeSliceCreator, [], [], TreeSliceCreator> = (set) => ({
    chopDurationInMs: BASE_CHOP_DURATION_IN_MS,
    chopProgress: 0,
    chop: (chopPerTick) => {
        let nbChopped = 0;
        let newProgress = 0;

        set((state) => {
            const chopProgressResult  = treeSliceMethods().chopProgress({
                progress: state.chopProgress,
                chopPerTick,
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