import type { Inventory } from '@/modules/Inventory/models/inventory';
import type { Item } from '@/shared/constants/items';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInventoryStore = defineStore('inventory', () => {
    const inventory = ref<Inventory>({});

    const addItemToPlayerInventory = (payload: {
        item: Item;
        quantity: number;
    }) => {
        if (inventory.value[payload.item.name] === undefined) {
            inventory.value[payload.item.name] = {
                item: payload.item,
                size: payload.quantity,
                durability: payload.item.durability,
            };
        } else {
            inventory.value[payload.item.name] = {
                item: payload.item,
                size:
                    (inventory.value[payload.item.name]?.size ?? 0) +
                    payload.quantity,
                durability: payload.item.durability,
            };
        }
    };

    const hasEnoughOfItemInInventory = (payload: {
        item: Item;
        quantity?: number;
    }) => {
        const currentSize = inventory.value[payload.item.name]?.size ?? 0;

        return currentSize >= (payload.quantity ?? 1);
    };

    const removeItemFromPlayerInventory = (payload: {
        item: Item;
        quantity: number;
    }) => {
        if (inventory.value[payload.item.name] !== undefined) {
            inventory.value[payload.item.name] = {
                ...inventory.value[payload.item.name],
                item: payload.item,
                size: Math.max(
                    (inventory.value[payload.item.name]?.size ?? 0) -
                        payload.quantity,
                    0,
                ),
            };
        }
    };

    return {
        addItemToPlayerInventory,
        inventory,
        hasEnoughOfItemInInventory,
        removeItemFromPlayerInventory,
    };
});
