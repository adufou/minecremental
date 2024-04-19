import { StateCreator } from 'zustand';
import inventorySliceMethods from '@/modules/Inventory/store/inventory-slice-methods.ts';
import { ItemStack } from '@/modules/Inventory/models/inventory-types.ts';
import Item from '@/types/item.ts';

export interface InventorySliceCreator {
    addItemToPlayerInventory: (payload: {
        item: Item;
        quantity: number;
    }) => void;
    inventory: ItemStack[];
    hasItemInInventory: (item: Item, quantity?: number) => boolean;
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
        set((state) => {
            const newInventoryStack =
                inventorySliceMethods().addItemToPlayerInventory({
                    item: payload.item,
                    quantity: payload.quantity,
                    stacks: state.inventory,
                });

            return {
                inventory: newInventoryStack,
            };
        });
    },
    inventory: [],
    hasItemInInventory: (item, quantity = 1) => {
        return inventorySliceMethods().hasItemInInventory(
            item,
            get().inventory,
            quantity,
        );
    },
    removeItemFromPlayerInventory: (payload) => {
        set((state) => {
            const newInventoryStack =
                inventorySliceMethods().removeItemFromPlayerInventory({
                    item: payload.item,
                    quantity: payload.quantity,
                    stacks: state.inventory,
                });

            return {
                inventory: newInventoryStack,
            };
        });
    },
});
