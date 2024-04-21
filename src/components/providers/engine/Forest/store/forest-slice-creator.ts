import { StateCreator } from 'zustand';
import { ChopConstants } from '@/components/providers/engine/Forest/const.ts';
import { useBoundStore } from '@/store/store.ts';
import ItemTypes from '@/types/item-types.ts';

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
        let multiplier = 1;

        const inventory = useBoundStore.getState().inventory;

        const stackIndex = inventory.findIndex(
            (stack) => stack.item.type === ItemTypes.AXE,
        );

        const stack = inventory[stackIndex];

        if (stack && stack.item.multiplier && stack.durability !== undefined) {
            multiplier = stack.item.multiplier;
            const durability = stack.durability - 1;

            useBoundStore.setState((state) => {
                const newInventory = [...state.inventory];

                if (durability === 0) {
                    newInventory.splice(stackIndex, 1);
                } else {
                    newInventory[stackIndex] = {
                        ...stack,
                        durability,
                    };
                }

                return {
                    inventory: newInventory,
                };
            });
        }

        set((state) => {
            const totalProgress =
                state.chopProgress + state.chopClickProgress * multiplier;

            nbChopped = Math.floor(totalProgress / 100);
            newProgress = totalProgress % 100;

            return { chopProgress: newProgress };
        });

        return nbChopped;
    },
    chopClickProgress: ChopConstants.BASE_CHOP_CLICK_PROGRESS,
    chopProgress: 0,
    choppingVillagers: 1,
});
