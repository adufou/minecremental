import { ChopConstants } from '@/modules/Forest/consts';
import type { ItemStack } from '@/modules/Inventory/models/inventory';
import { useInventoryStore } from '@/modules/Inventory/store/inventory.store';
import { useVillageStore } from '@/modules/Village/store/village.store';
import type { Item, ItemsType } from '@/shared/constants/items';
import ItemTypes from '@/shared/models/itemTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useForestStore = defineStore('forest', () => {
    // Getters
    const chopClickProgress = ref<number>(
        ChopConstants.BASE_CHOP_CLICK_PROGRESS,
    );
    const chopProgress = ref<number>(0);

    // Actions
    const chopByClick = (item: Item) => {
        /* Stores uses first ! See https://pinia.vuejs.org/cookbook/composing-stores.html */
        const inventoryStore = useInventoryStore();

        /* Action */
        let nbChopped = 0;
        let multiplier = 1;
        let hasChopped = false;

        for (const [key, value] of Object.entries(
            inventoryStore.inventory,
        ) as Array<[keyof ItemsType, ItemStack]>) {
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
                    inventoryStore.inventory[key] = {
                        ...value,
                        durability: value.item.durability,
                        size: Math.min(value.size - 1, 0),
                    };
                } else {
                    inventoryStore.inventory[key] = {
                        ...value,
                        durability,
                        size: value.size,
                    };
                }
            }
        }

        const totalProgress =
            chopProgress.value + chopClickProgress.value * multiplier;

        nbChopped = Math.floor(totalProgress / 100);
        chopProgress.value = totalProgress % 100;

        inventoryStore.inventory[item.name] = {
            item,
            size: (inventoryStore.inventory[item.name]?.size ?? 0) + nbChopped,
        };
    };

    const chopByVillager = (elapsed: number, item: Item) => {
        /* Stores uses first ! See https://pinia.vuejs.org/cookbook/composing-stores.html */
        const inventoryStore = useInventoryStore();
        const villageStore = useVillageStore();

        /* Action */
        let nbChopped = 0;
        let availableVillagers = 0;
        const initialProgress = chopProgress.value;
        let totalProgress = initialProgress;

        // Progress in ratio
        const oneVillagerChopBaseProgress =
            (elapsed / ChopConstants.BASE_CHOP_DURATION_IN_MS) * 100;

        // const villagers = useBoundStore.getState().villagers;
        // const newInventory = useBoundStore.getState().inventory;

        availableVillagers = villageStore.villagers;

        // This loop uses tools first
        for (const [key, value] of Object.entries(
            inventoryStore.inventory,
        ) as Array<[keyof ItemsType, ItemStack]>) {
            if (availableVillagers === 0) {
                break;
            }

            if (
                inventoryStore.inventory[key] !== undefined &&
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
                    (value.size - 1) * value.item.durability + value.durability;

                const durabilityUsage =
                    usableVillagers *
                    oneVillagerDurabilityUsageRelativeToBaseClickProgress;

                const newTotalDurability = totalDurability - durabilityUsage;

                // Nb chopped computing
                const progress =
                    usableVillagers *
                    oneVillagerChopBaseProgress *
                    (value.item.multiplier ?? 1);

                totalProgress += progress;
                availableVillagers -= usableVillagers;

                // Update the stack
                if (newTotalDurability <= 0) {
                    inventoryStore.inventory[key] = {
                        ...value,
                        durability: value.item.durability,
                        size: 0,
                    };
                } else {
                    inventoryStore.inventory[key] = {
                        ...value,
                        durability: newTotalDurability % value.item.durability,
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
        chopProgress.value = totalProgress % 100;

        const chopSpeedThisTick =
            (totalProgress - initialProgress) / 100 / (elapsed / 1000);

        inventoryStore.inventory[item.name] = {
            item,
            size: (inventoryStore.inventory[item.name]?.size ?? 0) + nbChopped,
            durability: item.durability,
            perSecond: chopSpeedThisTick,
        };
    };

    return {
        chopClickProgress,
        chopProgress,
        chopByClick,
    };
});
