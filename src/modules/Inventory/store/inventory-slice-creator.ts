import {StateCreator} from "zustand";
import inventorySliceMethods from "@/modules/Inventory/store/inventory-slice-methods.ts";

export interface InventorySliceCreator {
    inventory: ItemStack[];
    addItemToPlayerInventory: (payload: {item: Item, number: number}) => void;
}

export const createInventorySlice: StateCreator<InventorySliceCreator, [], [], InventorySliceCreator> = (set) => ({
    inventory: [],
    addItemToPlayerInventory: (payload) => {
        set((state) => {
            const newInventory = inventorySliceMethods().addItemToPlayerInventory({
                item: payload.item,
                number: payload.number,
                inventory: state.inventory
            });
            return {inventory: newInventory}
        })
    },
});