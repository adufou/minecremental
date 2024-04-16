import { StateCreator } from 'zustand';
import inventorySliceMethods from '@/modules/Inventory/store/inventory-slice-methods.ts';
import { Item, ItemStack } from '@/modules/Inventory/models/inventory-types.ts';

export interface InventorySliceCreator {
    inventory: ItemStack[];
    addItemToPlayerInventory: (payload: {
        item: Item;
        quantity: number;
    }) => void;
}

export const createInventorySlice: StateCreator<
    InventorySliceCreator,
    [],
    [],
    InventorySliceCreator
> = (set) => ({
    inventory: [],
    addItemToPlayerInventory: (payload) => {
        set((state) => {
            const newInventory =
                inventorySliceMethods().addItemToPlayerInventory({
                    item: payload.item,
                    quantity: payload.quantity,
                    inventory: state.inventory,
                });

            return {
                inventory: newInventory,
            };
        });
    },
});
