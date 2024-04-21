import Item from '@/types/item.ts';

type ItemRecipe = {
    item: Item;
    ingredients: {
        item: Item;
        quantity: number;
    }[];
    quantity: number;
};

export default ItemRecipe;
