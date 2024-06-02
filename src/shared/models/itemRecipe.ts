import type {Item} from "@/shared/constants/items";

type ItemRecipe = {
    item: Item;
    ingredients: {
        item: Item;
        quantity: number;
    }[];
    quantity: number;
};

export default ItemRecipe;
