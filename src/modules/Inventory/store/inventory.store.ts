import type { Inventory } from '@/modules/Inventory/models/inventory';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInventoryStore = defineStore('inventory', () => {
    const inventory = ref<Inventory>({});

    return {
        inventory,
    };
});
