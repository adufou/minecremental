import {create} from 'zustand'
import {createInventorySlice, InventorySliceCreator} from "@/modules/Inventory/store/inventory-slice-creator.ts";
import {devtools} from "zustand/middleware";
import {createTreeSlice, TreeSliceCreator} from "@/components/providers/engine/Tree/store/tree-slice-creator.ts";

export type State =
    TreeSliceCreator &
    InventorySliceCreator

export const useBoundStore = create<State>()(devtools((...a) => ({
    // Engine
    ...createTreeSlice(...a),

    // Inventory
    ...createInventorySlice(...a)
})))