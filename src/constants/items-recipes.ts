import Item from '@/types/item.ts';
import ItemRecipe from '@/types/recipe.ts';
import { Items } from '@/constants/items.ts';

const ItemsRecipes: { [item: Item['name']]: ItemRecipe } = {
    OAK_PLANKS: {
        item: Items.OAK_PLANKS,
        ingredients: [{ item: Items.OAK_LOG, quantity: 1 }],
        quantity: 4,
    },
    STICK: {
        item: Items.STICK,
        ingredients: [{ item: Items.OAK_PLANKS, quantity: 2 }],
        quantity: 4,
    },
    WOODEN_AXE: {
        item: Items.WOODEN_AXE,
        ingredients: [
            { item: Items.OAK_PLANKS, quantity: 3 },
            { item: Items.STICK, quantity: 2 },
        ],
        quantity: 1,
    },
} as const;

export default ItemsRecipes;
