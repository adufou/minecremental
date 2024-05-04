import { ChopConstants } from '@/components/providers/engine/Forest/const.ts';
import { Item, ItemsType } from '@/constants/items.ts';
import { ItemStack } from '@/modules/Inventory/models/inventory-types.ts';
import { useBoundStore } from '@/store/store.ts';
import ItemTypes from '@/types/item-types.ts';
import { StateCreator } from 'zustand';

export interface ForestSliceCreator {
    chopByVillager: (elapsed: number, item: Item) => void;
    chopByClick: () => number;
    chopClickProgress: number;
    chopProgress: number;
    choppingVillagers: number;
}

export const createTreeSlice: StateCreator<
    ForestSliceCreator,
    [],
    [],
    ForestSliceCreator
> = (set, get) => ({
    chopByVillager: (elapsed: number, item: Item) => {
        let newProgress = 0;
        let nbChopped = 0;
        let availableVillagers = 0;
        const initialProgress = get().chopProgress;
        let totalProgress = initialProgress;

        // Progress in ratio
        const oneVillagerChopBaseProgress =
            (elapsed / ChopConstants.BASE_CHOP_DURATION_IN_MS) * 100;

        set(() => {
            const villagers = useBoundStore.getState().villagers;
            const newInventory = useBoundStore.getState().inventory;

            availableVillagers = villagers;

            // This loop uses tools first
            for (const [key, value] of Object.entries(newInventory) as Array<
                [keyof ItemsType, ItemStack]
            >) {
                if (availableVillagers === 0) {
                    break;
                }

                if (
                    newInventory[key] !== undefined &&
                    value.item.type === ItemTypes.AXE &&
                    value.size > 0 &&
                    value.item.durability !== undefined &&
                    value.durability !== undefined
                ) {
                    const usableVillagers = Math.min(
                        availableVillagers,
                        value.size,
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
                        (value.size - 1) * value.item.durability +
                        value.durability;

                    const durabilityUsage =
                        usableVillagers *
                        oneVillagerDurabilityUsageRelativeToBaseClickProgress;

                    const newTotalDurability =
                        totalDurability - durabilityUsage;

                    // Nb chopped computing
                    const progress =
                        usableVillagers *
                        oneVillagerChopBaseProgress *
                        (value.item.multiplier ?? 1);

                    totalProgress += progress;
                    availableVillagers -= usableVillagers;

                    // Update the stack
                    if (newTotalDurability <= 0) {
                        newInventory[key] = {
                            ...value,
                            durability: value.item.durability,
                            size: 0,
                        };
                    } else {
                        newInventory[key] = {
                            ...value,
                            durability:
                                newTotalDurability % value.item.durability,
                            size: Math.ceil(
                                newTotalDurability / value.item.durability,
                            ),
                        };
                    }
                }
            }

            // Once we run out of tools, we use the remaining villagers
            totalProgress += availableVillagers * oneVillagerChopBaseProgress;

            nbChopped = Math.floor(totalProgress / 100);
            newProgress = totalProgress % 100;

            const chopSpeedThisTick =
                (totalProgress - initialProgress) / 100 / (elapsed / 1000);

            newInventory[item.name] = {
                item,
                size: (newInventory[item.name]?.size ?? 0) + nbChopped,
                durability: item.durability,
                perSecond: chopSpeedThisTick,
            };

            return {
                chopProgress: newProgress,
                inventory: newInventory,
            };
        });
    },
    chopByClick: () => {
        let newProgress = 0;
        let nbChopped = 0;
        let multiplier = 1;
        let hasChopped = false;

        const newInventory = useBoundStore.getState().inventory;

        for (const [key, value] of Object.entries(newInventory) as Array<
            [keyof ItemsType, ItemStack]
        >) {
            // To chop only with the first axe found
            if (hasChopped) {
                break;
            }

            if (
                value.item.type === ItemTypes.AXE &&
                value.size > 0 &&
                value.item.durability &&
                value.item.durability > 0 &&
                value.durability
            ) {
                hasChopped = true;
                multiplier = value.item.multiplier ?? 1;

                const durability = value.durability - 1;

                // Update the stack
                if (durability <= 0) {
                    newInventory[key] = {
                        ...value,
                        durability: value.item.durability,
                        size: Math.min(value.size - 1, 0),
                    };
                } else {
                    newInventory[key] = {
                        ...value,
                        durability,
                        size: value.size,
                    };
                }
            }
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