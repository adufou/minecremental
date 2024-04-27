import { StateCreator } from 'zustand';

export interface MineSliceCreator {
    mineByVillager: (elapsedTime: number, depth: number) => void;
    mineByClick: (depth: number) => void;
    mineClickProgress: number;
    // TODO: handle mine progress on multiple depths
    mineProgress: number;
    // TODO: handle mining villagers by depths
    miningVillagers: number;
}

export const createMineSlice: StateCreator<
    MineSliceCreator,
    [],
    [],
    MineSliceCreator
> = () => ({
    mineByVillager: (elapsedTime: number, depth: number) => {
        console.log(elapsedTime, depth);
    },
    mineByClick: (depth: number) => {
        console.log(depth);
    },
    mineClickProgress: 0,
    mineProgress: 0,
    miningVillagers: 0,
});
