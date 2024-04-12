import {create} from 'zustand'
import {createInventorySlice, InventorySlice} from "@/store/slices/inventory-slice.ts";

type State = InventorySlice

export const useBoundStore = create<State>((...a) => ({
    ...createInventorySlice(...a)
}))