import {
    createTreeSlice,
    ForestSliceCreator,
} from '@/modules/Forest/store/forest-slice-creator.ts';
import {
    createInventorySlice,
    InventorySliceCreator,
} from '@/modules/Inventory/store/inventory-slice-creator.ts';
import {
    createVillageSlice,
    VillageSliceCreator,
} from '@/modules/Village/store/village-slice-creator.ts';
import { create } from 'zustand';

export type State = ForestSliceCreator &
    InventorySliceCreator &
    VillageSliceCreator;

export const useBoundStore = create<State>()((...a) => ({
    // --- Engine ---
    ...createTreeSlice(...a),

    // Inventory
    ...createInventorySlice(...a),
    // Village
    ...createVillageSlice(...a),
}));
