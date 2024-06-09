import { useInventoryStore } from '@/modules/Inventory/store/inventory.store';
import type { Item } from '@/shared/constants/items';
import SmeltRecipes from '@/shared/constants/smeltRecipes';
import type { SmeltRecipe } from '@/shared/models/smeltRecipe';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useFoundryStore = defineStore('foundry', () => {
    // State
    const currentFuel = ref<{ item: Item; fuel: number }>();
    const loadedRecipe = ref<
        { recipe: SmeltRecipe; fuelProgress?: number } | undefined
    >({
        recipe: SmeltRecipes.IRON_INGOT,
    });

    // Getters
    const remainingFuelPercent = computed<number>(() => {
        if (!currentFuel.value?.fuel || !currentFuel.value?.item?.fuel) {
            return 0;
        }

        return Math.min(
            Math.max(
                (currentFuel.value.fuel / currentFuel.value.item.fuel) * 100,
                0,
            ),
            100,
        );
    });

    // Actions
    const smelt = (elapsed: number) => {
        /* Stores uses first ! See https://pinia.vuejs.org/cookbook/composing-stores.html */
        const inventoryStore = useInventoryStore();

        /* Action */
        if (
            !currentFuel.value ||
            !currentFuel.value.fuel ||
            !loadedRecipe.value
        ) {
            // TODO: Reuse fuel here ?
            return;
        }

        currentFuel.value.fuel = Math.max(0, currentFuel.value.fuel - elapsed);
        loadedRecipe.value.fuelProgress =
            (loadedRecipe.value.fuelProgress ?? 0) + elapsed;

        console.log(
            loadedRecipe.value.fuelProgress,
            loadedRecipe.value.recipe.fuel,
        );

        if (loadedRecipe.value.fuelProgress >= loadedRecipe.value.recipe.fuel) {
            inventoryStore.addItemToPlayerInventory({
                item: loadedRecipe.value.recipe.item,
                quantity: 1,
            });
            inventoryStore.removeItemFromPlayerInventory({
                item: loadedRecipe.value.recipe.ingredients.item,
                quantity: loadedRecipe.value.recipe.ingredients.quantity,
            });

            loadedRecipe.value.fuelProgress = Math.max(
                0,
                loadedRecipe.value.fuelProgress -
                    loadedRecipe.value.recipe.fuel,
            );
        }
    };

    return {
        currentFuel,
        loadedRecipe,
        remainingFuelPercent,
        smelt,
    };
});
