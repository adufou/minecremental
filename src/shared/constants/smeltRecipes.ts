import { Items } from '@/shared/constants/items';
import type { SmeltRecipe } from '@/shared/models/smeltRecipe';

const SmeltRecipes: { [recipe: string]: SmeltRecipe } = {
    GLASS: {
        item: Items.GLASS,
        ingredients: {
            item: Items.SAND,
            quantity: 1,
        },
        fuel: 1_000,
        quantity: 1,
    },
    IRON_INGOT: {
        item: Items.IRON_INGOT,
        ingredients: {
            item: Items.IRON_ORE,
            quantity: 1,
        },
        fuel: 1_000,
        quantity: 1,
    },
    STONE: {
        item: Items.STONE,
        ingredients: {
            item: Items.COBBLESTONE,
            quantity: 1,
        },
        fuel: 1_000,
        quantity: 1,
    },
} as const;

export default SmeltRecipes;
