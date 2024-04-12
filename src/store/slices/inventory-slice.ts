import {StateCreator} from "zustand";

export interface InventorySlice {
    inventory: any[];
    addItem: (item: any) => void;
}

export const createInventorySlice: StateCreator<InventorySlice, [], [], InventorySlice> = (set) => ({
    inventory: [],
    addItem: (item) => {
        set((state) => {
            const newInventory = state.inventory;
            newInventory.push(item);

            return {inventory: newInventory}
        })
    },
});