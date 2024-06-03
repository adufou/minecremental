import type { Item } from '@/shared/constants/items';

export type SmeltRecipe = {
    item: Item;
    ingredients: {
        item: Item;
        quantity: number;
    };
    fuel: number;
    quantity: number;
};
