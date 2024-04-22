import { StateCreator } from 'zustand';

export interface VillageSliceCreator {
    villagers: number;
}

export const createVillageSlice: StateCreator<
    VillageSliceCreator,
    [],
    [],
    VillageSliceCreator
> = () => ({
    villagers: 100,
});
