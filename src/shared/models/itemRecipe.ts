import type { Item } from '@/shared/constants/items';

export type ItemRecipe = {
    item: Item;
    ingredients: {
        item: Item;
        quantity: number;
    }[];
    quantity: number;
};
