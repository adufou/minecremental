import {defineStore} from "pinia";
import type {Item, ItemsType} from "@/shared/constants/items";
import {useInventoryStore} from "@/modules/Inventory/store/inventory.store";
import type {ItemStack} from "@/modules/Inventory/models/inventory";
import ItemTypes from "@/shared/models/itemTypes";
import {ref} from "vue";
import {ChopConstants} from "@/modules/Forest/consts";

export const useForestStore = defineStore('forest', () =>{
    // Getters
    const chopClickProgress = ref<number>(ChopConstants.BASE_CHOP_CLICK_PROGRESS);
    const chopProgress = ref<number>(0);

    // Actions
    const chopByClick = (item: Item) => {
        /* Stores uses first ! See https://pinia.vuejs.org/cookbook/composing-stores.html */
        const inventoryStore = useInventoryStore();

        /* Action */
        let nbChopped = 0;
        let multiplier = 1;
        let hasChopped = false;

        for (const [key, value] of Object.entries(inventoryStore.inventory) as Array<
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
    }

    return {
        chopClickProgress,
        chopProgress,
        chopByClick,
    }
})