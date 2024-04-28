import { MineConstants } from '@/components/providers/engine/Mine/const.ts';
import { ItemsType } from '@/constants/items.ts';
import { ItemStack } from '@/modules/Inventory/models/inventory-types.ts';
import { useBoundStore } from '@/store/store.ts';
import ItemTypes from '@/types/item-types.ts';
import { StateCreator } from 'zustand';

export interface MineSliceCreator {
    mineByVillager: (elapsedTime: number, depth: number) => void;
    mineByClick: (depth: number) => void;
    mineClickProgress: number;
    // TODO: handle mine progress on multiple depths
    mineProgress: number;
    // TODO: handle mining villagers by depths
    miningVillagers: number;
}

export const createMineSlice: StateCreator<
    MineSliceCreator,
    [],
    [],
    MineSliceCreator
> = (set, get) => ({
    mineByVillager: (elapsed: number, depth: number) => {
        console.log(elapsed, depth);
        const newProgress = 0;
        const nbMined = 0;
        let availableVillagers = 0;
        const initialProgress = get().mineProgress;
        let totalProgress = initialProgress;

        // Progress in ratio
        const oneVillagerMineBaseProgress =
            (elapsed / MineConstants.BASE_MINE_DURATION_IN_MS) * 100;

        set(() => {
            const villagers = useBoundStore.getState().villagers;
            const newInventory = useBoundStore.getState().inventory;

            availableVillagers = villagers;

            for (const [key, value] of Object.entries(newInventory) as Array<
                [keyof ItemsType, ItemStack]
            >) {
                if (availableVillagers === 0) {
                    break;
                }

                if (
                    newInventory[key] !== undefined &&
                    value.item.type === ItemTypes.PICKAXE &&
                    value.size > 0 &&
                    value.item.durability !== undefined &&
                    value.durability !== undefined
                ) {
                    const usableVillagers = Math.min(
                        availableVillagers,
                        value.size,
                    );

                    // THIS SUPPOSES ALL VILLAGER SHARE AND USE THE SAME TOOL
                    // If the mine time is 1000ms, the elapsed time is 17ms, and there is 1 villager
                    // If, by click, using exactly 1 durability, we can progress by 10 (%)
                    // Then when the oneVillagerMineBaseProgress is 1.7 [(17/1000) * 100], we can progress by 1.7 (%)
                    // Meaning we did 1.7/10 = 0.17 durability worth of progress for 1 villager

                    const oneVillagerDurabilityUsageRelativeToBaseClickProgress =
                        oneVillagerMineBaseProgress /
                        MineConstants.BASE_MINE_CLICK_PROGRESS;

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
                        oneVillagerMineBaseProgress *
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
            totalProgress += availableVillagers * oneVillagerMineBaseProgress;

            nbMined = Math.floor(totalProgress / 100);
            newProgress = totalProgress % 100;

            // Can we really use this ? Works only when there is a single item.
            const mineSpeedThisTick = (totalProgress - initialProgress) / 100 / (elapsed / 1000);

            // Here we should return the list of items mined based on nbMined and a distribution based on the depth
        });
    },
    mineByClick: (depth: number) => {
        console.log(depth);
    },
    mineClickProgress: 0,
    mineProgress: 0,
    miningVillagers: 0,
});
