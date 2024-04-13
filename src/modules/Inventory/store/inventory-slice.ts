import {StateCreator} from "zustand";

export interface InventorySlice {
    inventory: ItemStack[];
    addItemToPlayerInventory: (item: any) => void;
}

export const createInventorySlice: StateCreator<InventorySlice, [], [], InventorySlice> = (set) => ({
    inventory: [],
    addItemToPlayerInventory: (item: Item, number = 1) => {
        set((state) => {
            const newInventory = state.inventory;

            if (item.stackSize === 1) {
                newInventory.push({
                    item,
                    size: 1,
                })
            }

            const availableStack = newInventory.findIndex((stack) => {
                if (stack.item === item) {
                    if (stack.size + number <= item.stackSize) {
                        return true;
                    }
                }

                return false;
            })

            if (availableStack !== -1) {
                newInventory[availableStack].size += number;
            }

            else {
                newInventory.push({
                    item,
                    size: number,
                })
            }

            return {inventory: newInventory}
        })
    },
});