import { Inventory } from '@/modules/Inventory/models/inventory-types.ts';
import Item from '@/types/item.ts';

export default function inventorySliceMethods() {
    const addItemToPlayerInventory = (payload: {
        item: Item;
        quantity: number;
        stacks: Inventory['stacks'];
    }) => {
        const newInventoryStacks = payload.stacks;
        let remaining = payload.quantity;

        if (payload.item.stackSize === 1) {
            for (remaining; remaining > 0; remaining--) {
                newInventoryStacks.push({
                    item: payload.item,
                    size: 1,
                    durability: payload.item.durability,
                });
            }
        } else {
            for (let i = 0; i < newInventoryStacks.length; i++) {
                if (remaining === 0) {
                    break;
                }

                if (newInventoryStacks[i].item === payload.item) {
                    const availableStackSpace =
                        newInventoryStacks[i].item.stackSize -
                        newInventoryStacks[i].size;

                    if (availableStackSpace > 0) {
                        const remainingChunkToAddToStack = Math.min(
                            remaining,
                            availableStackSpace,
                        );
                        remaining -= remainingChunkToAddToStack;
                        newInventoryStacks[i].size +=
                            remainingChunkToAddToStack;
                    }
                }
            }

            while (remaining > 0) {
                const remainingChunkToAddToStack = Math.min(
                    remaining,
                    payload.item.stackSize,
                );
                newInventoryStacks.push({
                    item: payload.item,
                    size: remainingChunkToAddToStack,
                });

                remaining -= remainingChunkToAddToStack;
            }
        }

        return newInventoryStacks;
    };

    const hasItemInInventory = (
        item: Item,
        stacks: Inventory['stacks'],
        quantity = 1,
    ) => {
        let foundItems = 0;

        for (const stack of stacks) {
            if (foundItems >= quantity) {
                return true;
            }

            if (stack.item === item) {
                foundItems += stack.size;
            }
        }

        return foundItems >= quantity;
    };

    const removeItemFromPlayerInventory = (payload: {
        item: Item;
        quantity: number;
        stacks: Inventory['stacks'];
    }) => {
        let remaining = payload.quantity;
        const newInventoryStacks = payload.stacks;

        while (remaining > 0) {
            for (let i = 0; i < newInventoryStacks.length; i++) {
                if (remaining === 0) {
                    break;
                }

                if (newInventoryStacks[i].item === payload.item) {
                    if (newInventoryStacks[i].size > remaining) {
                        newInventoryStacks[i].size -= remaining;
                        remaining = 0;
                    } else {
                        remaining -= newInventoryStacks[i].size;
                        newInventoryStacks.splice(i, 1);
                    }
                }
            }
        }

        return newInventoryStacks;
    };

    return {
        addItemToPlayerInventory,
        hasItemInInventory,
        removeItemFromPlayerInventory,
    };
}
