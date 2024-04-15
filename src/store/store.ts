import {create} from 'zustand'
import {createInventorySlice, InventorySliceCreator} from "@/modules/Inventory/store/inventory-slice-creator.ts";
import {devtools} from "zustand/middleware";
import {createTreeSlice, ForestSliceCreator} from "@/components/providers/engine/Forest/store/forest-slice-creator.ts";

export type State =
    ForestSliceCreator &
    InventorySliceCreator

export const useBoundStore = create<State>()(devtools((...a) => ({
    // Engine
    ...createTreeSlice(...a),

    // Inventory
    ...createInventorySlice(...a)
})))