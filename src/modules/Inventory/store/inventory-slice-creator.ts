import { StateCreator } from 'zustand';
import { Inventory } from '@/modules/Inventory/models/inventory-types.ts';
import { Item } from '@/constants/items.ts';

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

            const itemInInventory = state.inventory.get(payload.item.name);

            if (itemInInventory) {
                itemInInventory.size += payload.quantity;
            } else {
                newInventoryStack.set(payload.item.name, {
                    item: payload.item,
                    size: payload.quantity,
                });
            }

            return {
                inventory: newInventoryStack,
            };
        });
    },
    inventory: new Map(),
    hasEnoughOfItemInInventory: (item, quantity = 1) => {
        const currentSize = get().inventory.get(item.name)?.size ?? 0;

        return currentSize >= quantity;
    },
    removeItemFromPlayerInventory: (payload) => {
        set((state): { inventory: Inventory } => {
            const newInventoryStack = state.inventory;

            const itemInInventory = state.inventory.get(payload.item.name);

            if (itemInInventory) {
                itemInInventory.size -= payload.quantity;
            }

            return {
                inventory: newInventoryStack,
            };
        });
    },
});
