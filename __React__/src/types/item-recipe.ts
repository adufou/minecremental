import { Item } from '@/constants/items.ts';

type ItemRecipe = {
    item: Item;
    ingredients: {
        item: Item;
        quantity: number;
    }[];
    quantity: number;
};

export default ItemRecipe;
