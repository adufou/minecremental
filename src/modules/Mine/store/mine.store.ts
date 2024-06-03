import type { ItemStack } from '@/modules/Inventory/models/inventory';
import { useInventoryStore } from '@/modules/Inventory/store/inventory.store';
import { MineConstants } from '@/modules/Mine/consts';
import getOresDistributionAtDepth from '@/modules/Mine/utils/oreDistribution';
import { useVillageStore } from '@/modules/Village/store/village.store';
import { Items, type ItemsType } from '@/shared/constants/items';
import ItemTypes from '@/shared/models/itemTypes';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useMineStore = defineStore('mine', () => {
    // State
    const clickProgress = ref<number>(MineConstants.BASE_MINE_CLICK_PROGRESS);
    const depth = ref<number>(0);
    const maxDepth = ref<number>(0);
    const progress = ref<number>(0);
    const miningVillagers = ref<number>(1);

    // Getters
    const maxDepthUpgradeCost = computed(() => {
        return Math.pow(1.25, maxDepth.value + 1);
    });

    // Actions
    const mineByClick = (depth: number) => {
        /* Stores uses first ! See https://pinia.vuejs.org/cookbook/composing-stores.html */
        const inventoryStore = useInventoryStore();

        /* Action */
        let nbMined = 0;
        let multiplier = 1;
        let hasMined = false;

        for (const [key, value] of Object.entries(
            inventoryStore.inventory,
        ) as Array<[keyof ItemsType, ItemStack]>) {
            // To chop only with the first axe found
            if (hasMined) {
                break;
            }

            if (
                value.item.type === ItemTypes.PICKAXE &&
                value.size > 0 &&
                value.item.durability &&
                value.item.durability > 0 &&
                value.durability
            ) {
                hasMined = true;
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

        const totalProgress = progress.value + clickProgress.value * multiplier;

        nbMined = Math.floor(totalProgress / 100);
        progress.value = totalProgress % 100;

        const oresDistribution = getOresDistributionAtDepth(depth);
        oresDistribution.forEach((ore) => {
            inventoryStore.inventory[ore.item] = {
                item: Items[ore.item],
                size:
                    (inventoryStore.inventory[ore.item]?.size ?? 0) +
                    nbMined * ore.probability,
            };
        });
    };
    const mineByVillager = (elapsed: number) => {
        /* Stores uses first ! See https://pinia.vuejs.org/cookbook/composing-stores.html */
        const inventoryStore = useInventoryStore();
        const villageStore = useVillageStore();

        /* Action */
        let nbMined = 0;
        let availableVillagers = 0;
        const initialProgress = progress.value;
        let totalProgress = initialProgress;

        // Progress in ratio
        const oneVillagerMineBaseProgress =
            (elapsed / MineConstants.BASE_MINE_DURATION_IN_MS) * 100;

        availableVillagers = villageStore.villagers;

        for (const [key, value] of Object.entries(
            inventoryStore.inventory,
        ) as Array<[keyof ItemsType, ItemStack]>) {
            if (availableVillagers === 0) {
                break;
            }

            if (
                inventoryStore.inventory[key] !== undefined &&
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
                    (value.size - 1) * value.item.durability + value.durability;

                const durabilityUsage =
                    usableVillagers *
                    oneVillagerDurabilityUsageRelativeToBaseClickProgress;

                const newTotalDurability = totalDurability - durabilityUsage;

                // Nb chopped computing
                const progress =
                    usableVillagers *
                    oneVillagerMineBaseProgress *
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
        totalProgress += availableVillagers * oneVillagerMineBaseProgress;

        nbMined = Math.floor(totalProgress / 100);
        progress.value = totalProgress % 100;

        // Can we really use this ? Works only when there is a single item.
        const mineSpeedThisTick =
            (totalProgress - initialProgress) / 100 / (elapsed / 1000);

        const oresDistribution = getOresDistributionAtDepth(depth.value);
        oresDistribution.forEach((ore) => {
            inventoryStore.inventory[ore.item] = {
                item: Items[ore.item],
                size:
                    (inventoryStore.inventory[ore.item]?.size ?? 0) +
                    nbMined * ore.probability,
                perSecond: mineSpeedThisTick * ore.probability,
            };
        });
    };

    return {
        clickProgress,
        depth,
        maxDepth,
        maxDepthUpgradeCost,
        mineByClick,
        mineByVillager,
        miningVillagers,
        progress,
    };
});
