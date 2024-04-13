
export default function inventorySliceMethods() {
    const addItemToPlayerInventory = (payload: { item: Item, number: number, inventory: ItemStack[] }) => {
        const newInventory = payload.inventory;
        let remaining = payload.number;

        if (payload.item.stackSize === 1) {
            for (remaining; remaining > 0; remaining--) {
                newInventory.push({
                    item: payload.item,
                    size: 1,
                })
            }
        }

        else {
            for (let i = 0; i < newInventory.length; i++) {
                if (remaining === 0) {
                    break;
                }

                if (newInventory[i].item === payload.item) {
                    const availableStackSpace = newInventory[i].item.stackSize - newInventory[i].size;

                    if (availableStackSpace > 0) {
                        const remainingChunkToAddToStack = Math.min(remaining, availableStackSpace);
                        remaining -= remainingChunkToAddToStack;
                        newInventory[i].size += remainingChunkToAddToStack;
                    }
                }
            }

            while (remaining > 0) {
                const remainingChunkToAddToStack = Math.min(remaining, payload.item.stackSize);
                newInventory.push({
                    item: payload.item,
                    size: remainingChunkToAddToStack,
                })

                remaining -= remainingChunkToAddToStack;
            }
        }

        return newInventory
    }

    return {
        addItemToPlayerInventory
    }
}
