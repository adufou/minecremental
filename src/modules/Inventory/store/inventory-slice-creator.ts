import { Item } from '@/constants/items.ts';
import { Inventory } from '@/modules/Inventory/models/inventory-types.ts';
import { StateCreator } from 'zustand';

export interface InventorySliceCreator {
    addItemToPlayerInventory: (payload: {
        item: Item;
        quantity: number;
    }) => void;
    inventory: Inventory;
    hasEnoughOfItemInInventory: (item: Item, quantity?: number) => boolean;
    removeItemFromPlayerInventory: (payload: {
        item: Item;
        quantity: number;
    }) => void;
}

export const createInventorySlice: StateCreator<
    InventorySliceCreator,
    [],
    [],
    InventorySliceCreator
> = (set, get) => ({
    addItemToPlayerInventory: (payload) => {
        set((state): { inventory: Inventory } => {
            const newInventoryStack = state.inventory;

            const itemInInventory = state.inventory[payload.item.name];

            if (itemInInventory) {
                itemInInventory.size += payload.quantity;
            } else {
                newInventoryStack[payload.item.name] = {
                    item: payload.item,
                    size: payload.quantity,
                    durability: payload.item.durability,
                };
            }

            return {
                inventory: newInventoryStack,
            };
        });
    },
    inventory: {},
    hasEnoughOfItemInInventory: (item, quantity = 1) => {
        const currentSize = get().inventory[item.name]?.size ?? 0;

        return currentSize >= quantity;
    },
    removeItemFromPlayerInventory: (payload) => {
        set((state): { inventory: Inventory } => {
            const newInventoryStack = state.inventory;
            const itemInInventory = state.inventory[payload.item.name];

            if (itemInInventory) {
                itemInInventory.size -= payload.quantity;
            }

            return {
                inventory: newInventoryStack,
            };
        });
    },
});
