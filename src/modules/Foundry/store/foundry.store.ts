import {defineStore} from "pinia";
import type {Item} from "@/shared/constants/items";
import {ref} from "vue";
import type {SmeltRecipe} from "@/shared/models/smeltRecipe";

export const useFoundryStore = defineStore('foundry', () => {
    // State
    const fuel = ref<Item>();
    const progress = ref<number>(0);
    const loadedRecipe = ref<SmeltRecipe>();
});
