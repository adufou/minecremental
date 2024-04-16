import { StateCreator } from 'zustand';
import { VillagerConstants } from '@/components/providers/engine/Village/const.ts';

export interface VillageSliceCreator {
    villagerPlayerRatio: number;
    villagers: number;
}

export const createVillageSlice: StateCreator<
    VillageSliceCreator,
    [],
    [],
    VillageSliceCreator
> = (set) => ({
    villagerPlayerRatio: VillagerConstants.BASE_VILLAGER_PLAYER_RATIO,
    villagers: 1,
});
