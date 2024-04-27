import { Building, Village } from '@/types/village-types.ts';
import { StateCreator } from 'zustand';

export interface VillageSliceCreator {
    addBuildingToVillage: (payload: {
        building: Building;
        quantity: number;
    }) => void;
    village: Village;
    villagers: number;
}

export const createVillageSlice: StateCreator<
    VillageSliceCreator,
    [],
    [],
    VillageSliceCreator
> = (set) => ({
    addBuildingToVillage: (payload) => {
        set((state): { village: Village; villagers: number } => {
            const newVillage = state.village;
            const buildingInVillage = state.village[payload.building.name];

            if (buildingInVillage) {
                buildingInVillage.quantity += payload.quantity;
            } else {
                newVillage[payload.building.name] = {
                    building: payload.building,
                    quantity: payload.quantity,
                };
            }

            return {
                village: newVillage,
                villagers: state.villagers + payload.quantity,
            };
        });
    },
    village: {},
    villagers: 1,
});
