import type { Building, Village } from '@/shared/models/villageTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVillageStore = defineStore('village', () => {
    /* Getters */
    const village = ref<Village>({});
    const villagers = ref<number>(1);

    /* Actions */
    const addBuildingToVillage = (payload: {
        building: Building;
        quantity: number;
    }) => {
        if (village.value[payload.building.name] === undefined) {
            village.value[payload.building.name] = {
                building: payload.building,
                quantity: payload.quantity,
            };
        } else {
            village.value[payload.building.name] = {
                building: payload.building,
                quantity:
                    (village.value[payload.building.name]?.quantity ?? 0) +
                    payload.quantity,
            };
        }

        villagers.value += payload.quantity;
    };

    return {
        addBuildingToVillage,
        village,
        villagers,
    };
});
