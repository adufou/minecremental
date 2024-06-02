import type { Village } from '@/shared/models/villageTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVillageStore = defineStore('village', () => {
    const village = ref<Village>({});
    const villagers = ref<number>(1);

    return {
        village,
        villagers,
    };
});
