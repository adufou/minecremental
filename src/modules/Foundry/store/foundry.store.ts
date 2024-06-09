import type { Item } from '@/shared/constants/items';
import SmeltRecipes from '@/shared/constants/smeltRecipes';
import type { SmeltRecipe } from '@/shared/models/smeltRecipe';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useFoundryStore = defineStore('foundry', () => {
    // State
    const currentFuel = ref<{ item: Item; fuel: number }>();
    const progress = ref<number>(0);
    const loadedRecipe = ref<SmeltRecipe>(SmeltRecipes.IRON_INGOT);

    // Getters
    const remainingFuel = computed<number>(() => {
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
        // const inventoryStore = useInventoryStore();

        /* Action */
        if (!currentFuel.value || !currentFuel.value.fuel) {
            // TODO: Reuse fuel here ?
            return;
        }

        currentFuel.value.fuel -= elapsed;
    };

    return {
        currentFuel,
        progress,
        loadedRecipe,
        remainingFuel,
        smelt,
    };
});
