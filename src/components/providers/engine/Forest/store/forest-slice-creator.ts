import { StateCreator } from 'zustand';
import { ChopConstants } from '@/components/providers/engine/Forest/const.ts';
import { useBoundStore } from '@/store/store.ts';

export interface ForestSliceCreator {
    chopByVillager: (elapsed: number) => number;
    chopClick: () => number;
    chopClickProgress: number;
    chopProgress: number;
    choppingVillagers: number;
}

export const createTreeSlice: StateCreator<
    ForestSliceCreator,
    [],
    [],
    ForestSliceCreator
> = (set) => ({
    chopByVillager: (elapsed: number) => {
        const villagers = useBoundStore.getState().villagers;

        let newProgress = 0;
        let nbChopped = 0;

        set((state) => {
            const totalProgress =
                state.chopProgress +
                villagers *
                    ((elapsed / ChopConstants.BASE_CHOP_DURATION_IN_MS) * 100);

            nbChopped = Math.floor(totalProgress / 100);
            newProgress = totalProgress % 100;

            return { chopProgress: newProgress };
        });

        return nbChopped;
    },
    chopClick: () => {
        let newProgress = 0;
        let nbChopped = 0;

        set((state) => {
            const totalProgress = state.chopProgress + state.chopClickProgress;

            nbChopped = Math.floor(totalProgress / 100);
            newProgress = totalProgress % 100;

            return { chopProgress: newProgress };
        });

        console.log({
            newProgress,
            nbChopped,
        });

        return nbChopped;
    },
    chopClickProgress: ChopConstants.BASE_CHOP_CLICK_PROGRESS,
    chopProgress: 0,
    choppingVillagers: 1,
});
