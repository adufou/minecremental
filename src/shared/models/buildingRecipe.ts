import type { Item } from '@/shared/constants/items';
import type { Building } from '@/shared/models/villageTypes';

export type BuildingRecipe = {
    building: Building;
    ingredients: {
        item: Item;
        quantity: number;
    }[];
    quantity: number;
};
