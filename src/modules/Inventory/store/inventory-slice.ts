import {StateCreator} from "zustand";

export interface InventorySlice {
    inventory: ItemStack[];
    addItemToPlayerInventory: (payload: {item: Item, number: number}) => void;
}

export const createInventorySlice: StateCreator<InventorySlice, [], [], InventorySlice> = (set) => ({
    inventory: [],
    addItemToPlayerInventory: (payload) => {
        set((state) => {
            const newInventory = state.inventory;

            if (payload.item.stackSize === 1) {
                newInventory.push({
                    item: payload.item,
                    size: 1,
                })
            }

            const availableStack = newInventory.findIndex((stack) => {
                if (stack.item === payload.item) {
                    if (stack.size + payload.number <= payload.item.stackSize) {
                        return true;
                    }
                }

                return false;
            })

            if (availableStack !== -1) {
                newInventory[availableStack].size += payload.number;
            }

            else {
                newInventory.push({
                    item: payload.item,
                    size: payload.number,
                })
            }

            return {inventory: newInventory}
        })
    },
});