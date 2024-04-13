import {create} from 'zustand'
import {createInventorySlice, InventorySliceCreator} from "@/modules/Inventory/store/inventory-slice-creator.ts";
import {devtools} from "zustand/middleware";

export type State = InventorySliceCreator

export const useBoundStore = create<State>()(devtools((...a) => ({
    ...createInventorySlice(...a)
})))