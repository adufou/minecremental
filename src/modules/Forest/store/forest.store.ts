import {defineStore} from "pinia";
import type {Item} from "@/shared/constants/items";

export const useForestStore = defineStore('forest', () =>{
    const chopByClick = (item: Item) => {
        let newProgress = 0;
        let nbChopped = 0;
        let multiplier = 1;
        let hasChopped = false;

        const newInventory = useBoundStore.getState().inventory;

        for (const [key, value] of Object.entries(newInventory) as Array<
            [keyof ItemsType, ItemStack]
        >) {
        // To chop only with the first axe found
        if (hasChopped) {
            break;
        }

        if (
            value.item.type === ItemTypes.AXE &&
            value.size > 0 &&
            value.item.durability &&
            value.item.durability > 0 &&
            value.durability
        ) {
            hasChopped = true;
            multiplier = value.item.multiplier ?? 1;

            const durability = value.durability - 1;

            // Update the stack
            if (durability <= 0) {
                newInventory[key] = {
                    ...value,
                    durability: value.item.durability,
                    size: Math.min(value.size - 1, 0),
                };
            } else {
                newInventory[key] = {
                    ...value,
                    durability,
                    size: value.size,
                };
            }
        }
    }

    set((state) => {
        const totalProgress =
            state.chopProgress + state.chopClickProgress * multiplier;

        nbChopped = Math.floor(totalProgress / 100);
        newProgress = totalProgress % 100;

        const newInventory = useBoundStore.getState().inventory;

        newInventory[item.name] = {
            item,
            size: (newInventory[item.name]?.size ?? 0) + nbChopped,
        };

        return { chopProgress: newProgress, inventory: newInventory };
    });
},
})