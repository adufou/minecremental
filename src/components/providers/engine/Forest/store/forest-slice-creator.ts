import {StateCreator} from "zustand";
import {ChopConstants} from "@/components/providers/engine/Forest/const.ts";

export interface ForestSliceCreator {
    chopClick: () => number
    chopClickProgress: number
    chopProgress: number
}

export const createTreeSlice: StateCreator<ForestSliceCreator, [], [], ForestSliceCreator> = (set) => ({
    chopClick: () => {
        let newProgress = 0;
        let nbChopped = 0;

        set((state) => {
            const totalProgress = state.chopProgress + state.chopClickProgress;

            nbChopped = Math.floor(totalProgress / 100);
            newProgress = totalProgress % 100;

            return { chopProgress: newProgress }
        })

        console.log({
            newProgress,
            nbChopped,
        })

        return nbChopped
    },
    chopClickProgress: ChopConstants.BASE_CHOP_CLICK_PROGRESS,
    chopProgress: 0,
})