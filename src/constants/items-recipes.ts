import Item from '@/types/item.ts';
import ItemRecipe from '@/types/recipe.ts';
import { Items } from '@/constants/items.ts';

const ItemsRecipes: { [item: Item['name']]: ItemRecipe } = {
    OAK_PLANKS: {
        item: Items.OAK_PLANKS,
        ingredients: [{ item: Items.OAK_LOG, quantity: 1 }],
        quantity: 4,
    },
} as const;

export default ItemsRecipes;
