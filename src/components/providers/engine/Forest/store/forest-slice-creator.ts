import { StateCreator } from 'zustand';
import { ChopConstants } from '@/components/providers/engine/Forest/const.ts';
import { useBoundStore } from '@/store/store.ts';
import ItemTypes from '@/types/item-types.ts';
import { ItemStack } from '@/modules/Inventory/models/inventory-types.ts';

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

        // Progress in ratio
        const oneVillagerChopBaseProgress =
            (elapsed / ChopConstants.BASE_CHOP_DURATION_IN_MS) * 100;

        set(() => {
            const villagers = useBoundStore.getState().villagers;
            const newInventory = useBoundStore.getState().inventory;

            availableVillagers = villagers;

            // This loop uses tools
            newInventory.forEach((stack: ItemStack) => {
                if (availableVillagers === 0) {
                    return stack;
                }

                if (
                    stack.item.type === ItemTypes.AXE &&
                    stack.size > 0 &&
                    stack.item.durability &&
                    stack.durability
                ) {
                    const usableVillagers = Math.min(
                        availableVillagers,
                        stack.size,
                    );

                    // THIS SUPPOSES ALL VILLAGER SHARE AND USE THE SAME TOOL
                    // If the chop time is 1000ms, the elapsed time is 17ms, and there is 1 villager
                    // If, by click, using exactly 1 durability, we can progress by 10 (%)
                    // Then when the oneVillagerChopBaseProgress is 1.7 [(17/1000) * 100], we can progress by 1.7 (%)
                    // Meaning we did 1.7/10 = 0.17 durability worth of progress for 1 villager

                    const oneVillagerDurabilityUsageRelativeToBaseClickProgress =
                        oneVillagerChopBaseProgress /
                        ChopConstants.BASE_CHOP_CLICK_PROGRESS;

                    // Durability usage
                    const totalDurability =
                        (stack.size - 1) * stack.item.durability +
                        stack.durability;

                    const durabilityUsage =
                        usableVillagers *
                        oneVillagerDurabilityUsageRelativeToBaseClickProgress;

                    const newTotalDurability =
                        totalDurability - durabilityUsage;

                    // Nb chopped computing
                    const progress =
                        usableVillagers *
                        oneVillagerChopBaseProgress *
                        (stack.item.multiplier ?? 1);

                    nbChopped += Math.floor(progress / 100);
                    totalProgress += progress % 100;

                    availableVillagers -= usableVillagers;

                    // Update the stack
                    if (newTotalDurability <= 0) {
                        return {
                            size: 0,
                            durability: stack.item.durability,
                        };
                    } else {
                        return {
                            size: Math.floor(
                                newTotalDurability / stack.item.durability,
                            ),
                            durability:
                                newTotalDurability % stack.item.durability,
                        };
                    }
                }
            });

            // Once we run out of tools, we use the remaining villagers
            totalProgress += availableVillagers * oneVillagerChopBaseProgress;

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
        let hasChopped = false;

        const newInventory = useBoundStore.getState().inventory;

        newInventory.forEach((stack: ItemStack) => {
            // To chop only with the first axe found
            if (hasChopped) {
                return stack;
            }

            if (
                stack.item.type === ItemTypes.AXE &&
                stack.size > 0 &&
                stack.item.durability &&
                stack.item.durability > 0 &&
                stack.durability
            ) {
                hasChopped = true;
                multiplier = stack.item.multiplier ?? 1;

                const durability = stack.durability - 1;

                if (durability <= 0) {
                    return {
                        size: Math.min(stack.size - 1, 0),
                        durability: stack.item.durability,
                    };
                } else {
                    return {
                        size: stack.size,
                        durability,
                    };
                }
            }
        });

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
