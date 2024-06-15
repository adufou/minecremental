import { useInventoryStore } from '@/modules/Inventory/store/inventory.store';
import { type Item, Items } from '@/shared/constants/items';
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
    const selectedFuel = ref<Item>(Items.COAL);

    // Getters
    const recipeProgressPercent = computed<number>(() => {
        if (!loadedRecipe.value) {
            return 0;
        }

        return Math.min(
            Math.max(
                ((loadedRecipe.value.fuelProgress ?? 0) /
                    loadedRecipe.value.recipe.fuel) *
                    100,
                0,
            ),
            100,
        );
    });

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
        if (!loadedRecipe.value) {
            return;
        }

        if (
            !inventoryStore.hasEnoughOfItemInInventory({
                item: loadedRecipe.value.recipe.ingredients.item,
                quantity: loadedRecipe.value.recipe.ingredients.quantity,
            }) &&
            !currentFuel.value?.fuel
        ) {
            return;
        }

        if (!currentFuel.value || !currentFuel.value.fuel) {
            if (
                selectedFuel.value.fuel &&
                inventoryStore.hasEnoughOfItemInInventory({
                    item: selectedFuel.value,
                    quantity:
                        loadedRecipe.value?.recipe.ingredients.quantity ?? 1,
                })
            ) {
                currentFuel.value = {
                    item: selectedFuel.value,
                    fuel: selectedFuel.value.fuel,
                };

                inventoryStore.removeItemFromPlayerInventory({
                    item: selectedFuel.value,
                    quantity:
                        loadedRecipe.value?.recipe.ingredients.quantity ?? 1,
                });
            } else {
                return;
            }
        }

        currentFuel.value.fuel = Math.max(0, currentFuel.value.fuel - elapsed);

        if (
            !inventoryStore.hasEnoughOfItemInInventory({
                item: loadedRecipe.value.recipe.ingredients.item,
                quantity: loadedRecipe.value.recipe.ingredients.quantity,
            })
        ) {
            loadedRecipe.value.fuelProgress = 0;
            return;
        }

        loadedRecipe.value.fuelProgress =
            (loadedRecipe.value.fuelProgress ?? 0) + elapsed;

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
        recipeProgressPercent,
        remainingFuelPercent,
        selectedFuel,
        smelt,
    };
});
