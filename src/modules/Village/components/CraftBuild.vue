<script setup lang="ts">
import { useInventoryStore } from '@/modules/Inventory/store/inventory.store';
import { useVillageStore } from '@/modules/Village/store/village.store';
import type { Item } from '@/shared/constants/items';
import type { BuildingRecipe } from '@/shared/models/villageTypes';
import { UiButton } from '@/shared/ui/button';
import { UiCard } from '@/shared/ui/card';
import { UiSeparator } from '@/shared/ui/separator';
import { getImageOfItem } from '@/utils/image';

const props = defineProps<{
    buildingRecipe: BuildingRecipe;
}>();

const inventoryStore = useInventoryStore();
const villageStore = useVillageStore();

const craftBuilding = () => {
    for (const recipeItem of props.buildingRecipe.ingredients) {
        if (
            !inventoryStore.hasEnoughOfItemInInventory({
                item: recipeItem.item,
                quantity: recipeItem.quantity,
            })
        ) {
            return false;
        }
    }

    for (const recipeItem of props.buildingRecipe.ingredients) {
        inventoryStore.removeItemFromPlayerInventory({
            item: recipeItem.item,
            quantity: recipeItem.quantity,
        });
    }

    villageStore.addBuildingToVillage({
        building: props.buildingRecipe.building,
        quantity: props.buildingRecipe.quantity,
    });
};

const craftAllItems = () => {
    const ingredients: {
        item: Item;
        recipeQuantity: number;
        inventoryQuantity: number;
    }[] = [];

    for (const recipeItem of props.buildingRecipe.ingredients) {
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

    villageStore.addBuildingToVillage({
        building: props.buildingRecipe.building,
        quantity: props.buildingRecipe.quantity * nbCraftableItems,
    });
};
</script>

<template>
    <UiCard class="flex flex-col items-center gap-2 p-2">
        <div class="align-middle">
            <span class="text-lg">
                {{ props.buildingRecipe.building.displayName }}
            </span>
        </div>
        <UiSeparator orientation="horizontal" />
        <div class="flex flex-row flex-auto flex-wrap gap-2">
            <div
                v-for="recipeItem in props.buildingRecipe.ingredients"
                :key="
                    props.buildingRecipe.building.name +
                    '-' +
                    recipeItem.item.name
                "
                class="flex flex-row items-center gap-1"
            >
                <UiCard class="h-8 w-8 overflow-clip p-1">
                    <img
                        class="h-full w-full"
                        :src="getImageOfItem(recipeItem.item)"
                    />
                </UiCard>
                <span>
                    {{ recipeItem.item.displayName }} x{{ recipeItem.quantity }}
                </span>
            </div>
        </div>
        <UiSeparator orientation="horizontal" />
        <div class="flex flex-row gap-2">
            <UiButton
                class="h-8"
                @click="craftBuilding"
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
    </UiCard>
</template>

<style scoped></style>
