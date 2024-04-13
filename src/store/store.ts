import {create} from 'zustand'
import {createInventorySlice, InventorySlice} from "@/modules/Inventory/store/inventory-slice.ts";
import {devtools} from "zustand/middleware";

type State = InventorySlice

export const useBoundStore = create<State>()(devtools((...a) => ({
    ...createInventorySlice(...a)
})))