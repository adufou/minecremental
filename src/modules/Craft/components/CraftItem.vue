<script setup lang="ts">
import { useInventoryStore } from '@/modules/Inventory/store/inventory.store';
import type { Item } from '@/shared/constants/items';
import type { ItemRecipe } from '@/shared/models/itemRecipe';
import { UiButton } from '@/shared/ui/button';
import { UiCard } from '@/shared/ui/card';
import { UiSeparator } from '@/shared/ui/separator';
import { getImageOfItem } from '@/utils/image';

const props = defineProps<{
    itemRecipe: ItemRecipe;
}>();

const inventoryStore = useInventoryStore();

const craftItem = () => {
    for (const recipeItem of props.itemRecipe.ingredients) {
        if (
            !inventoryStore.hasEnoughOfItemInInventory({
                item: recipeItem.item,
                quantity: recipeItem.quantity,
            })
        ) {
            return false;
        }
    }

    for (const recipeItem of props.itemRecipe.ingredients) {
        inventoryStore.removeItemFromPlayerInventory({
            item: recipeItem.item,
            quantity: recipeItem.quantity,
        });
    }

    inventoryStore.addItemToPlayerInventory({
        item: props.itemRecipe.item,
        quantity: props.itemRecipe.quantity,
    });
};

const craftAllItems = () => {
    const ingredients: {
        item: Item;
        recipeQuantity: number;
        inventoryQuantity: number;
    }[] = [];

    for (const recipeItem of props.itemRecipe.ingredients) {
        const itemInInventory = inventoryStore.inventory[recipeItem.item.name];

        // If we don't have enough of the item in the inventory, we can't craft
        if (itemInInventory === undefined || itemInInventory.size === 0) {
            return;
        }

        ingredients.push({
            item: itemInInventory.item,
            recipeQuantity: recipeItem.quantity,
            inventoryQuantity: itemInInventory.size,
        });
    }

    const nbCraftableItems = Math.min(
        ...ingredients.map((i) => {
            return Math.floor(i.inventoryQuantity / i.recipeQuantity);
        }),
    );

    if (nbCraftableItems === 0) {
        return;
    }

    for (const ingredient of ingredients) {
        inventoryStore.removeItemFromPlayerInventory({
            item: ingredient.item,
            quantity: ingredient.recipeQuantity * nbCraftableItems,
        });
    }

    inventoryStore.addItemToPlayerInventory({
        item: props.itemRecipe.item,
        quantity: props.itemRecipe.quantity * nbCraftableItems,
    });
};
</script>

<template>
    <div class="flex flex-col w-full">
        <div class="flex flex-row justify-between items-center gap-2">
            <div class="relative">
                <UiCard class="h-16 w-16 overflow-hidden p-1">
                    <img
                        class="h-full w-full"
                        :src="getImageOfItem(props.itemRecipe.item)"
                    />
                </UiCard>
                <span class="absolute bottom-1 right-1">
                    x{{ props.itemRecipe.quantity }}
                </span>
            </div>
            <UiSeparator orientation="vertical" />
            <div class="flex flex-row w-full flex-wrap gap-2">
                <div
                    v-for="recipeItem in props.itemRecipe.ingredients"
                    :key="recipeItem.item.name"
                    class="flex flex-row items-center gap-1"
                >
                    <UiCard class="h-8 w-8 overflow-clip p-1">
                        <img
                            class="h-full w-full"
                            :src="getImageOfItem(recipeItem.item)"
                        />
                    </UiCard>
                    <span>
                        {{ recipeItem.item.displayName }} x{{
                            recipeItem.quantity
                        }}
                    </span>
                </div>
            </div>
            <UiSeparator orientation="vertical" />
            <UiButton
                class="h-8"
                @click="craftItem"
            >
                Craft
            </UiButton>
            <UiButton
                class="h-8"
                @click="craftAllItems"
            >
                Craft All
            </UiButton>
        </div>
    </div>
</template>

<style scoped></style>
