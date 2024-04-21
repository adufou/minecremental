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
        let newProgress = 0;
        let nbChopped = 0;
        let availableVillagers = 0;
        let totalProgress = useBoundStore.getState().chopProgress;

        const elapsedRatioOnDuration =
            elapsed / ChopConstants.BASE_CHOP_DURATION_IN_MS;

        // console.log(elapsedRatioOnDuration);

        set(() => {
            // const remainingElapsedRatio = elapsedRatioOnDuration;
            const villagers = useBoundStore.getState().villagers;
            const newInventory = useBoundStore.getState().inventory;

            availableVillagers = villagers;

            // This loop uses tools
            // 'i' will be incremented manually to take the splices into account
            for (let i = 0; i < newInventory.length; ) {
                if (availableVillagers === 0) {
                    break;
                }

                const stack = newInventory[i];

                if (
                    stack &&
                    stack.item.type === ItemTypes.AXE &&
                    stack.durability !== undefined
                ) {
                    const multiplier = stack.item.multiplier ?? 1;

                    const usableVillagers = availableVillagers;

                    // console.log(usableVillagers, availableVillagers);

                    totalProgress +=
                        usableVillagers *
                        multiplier *
                        elapsedRatioOnDuration *
                        100;

                    availableVillagers -= usableVillagers;

                    const newDurability = Math.max(
                        stack.durability -
                            usableVillagers * elapsedRatioOnDuration,
                        0,
                    );

                    // console.log(
                    //     elapsedRatioOnDuration,
                    //     newDurability,
                    //     usableVillagers * elapsedRatioOnDuration,
                    // );
                    // console.log(
                    //     newDurability,
                    //     stack.durability,
                    //     usableVillagers,
                    // );

                    if (newDurability === 0) {
                        newInventory.splice(i, 1);
                    } else {
                        newInventory[i] = {
                            ...stack,
                            durability: newDurability,
                        };
                        i++;
                    }
                } else {
                    i++;
                }
            }

            // Once we run out of tools, we use the remaining villagers

            totalProgress +=
                availableVillagers * (elapsedRatioOnDuration * 100);

            nbChopped = Math.floor(totalProgress / 100);
            newProgress = totalProgress % 100;

            return { chopProgress: newProgress, inventory: newInventory };
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
