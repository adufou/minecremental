import { Items } from '@/shared/constants/items';
import { type ItemRecipe } from '@/shared/models/itemRecipe';

const ItemsRecipes: { [item: string]: ItemRecipe } = {
    OAK_FENCE: {
        item: Items.OAK_FENCE,
        ingredients: [
            { item: Items.OAK_PLANKS, quantity: 4 },
            { item: Items.STICK, quantity: 2 },
        ],
        quantity: 3,
    },
    OAK_PLANKS: {
        item: Items.OAK_PLANKS,
        ingredients: [{ item: Items.OAK_LOG, quantity: 1 }],
        quantity: 4,
    },
    OAK_STAIRS: {
        item: Items.OAK_STAIRS,
        ingredients: [{ item: Items.OAK_PLANKS, quantity: 6 }],
        quantity: 4,
    },
    STICK: {
        item: Items.STICK,
        ingredients: [{ item: Items.OAK_PLANKS, quantity: 2 }],
        quantity: 4,
    },
    STONE_AXE: {
        item: Items.STONE_AXE,
        ingredients: [
            { item: Items.STICK, quantity: 2 },
            { item: Items.COBBLESTONE, quantity: 3 },
        ],
        quantity: 1,
    },
    STONE_PICKAXE: {
        item: Items.STONE_PICKAXE,
        ingredients: [
            { item: Items.STICK, quantity: 2 },
            { item: Items.COBBLESTONE, quantity: 3 },
        ],
        quantity: 1,
    },
    WHITE_BED: {
        item: Items.WHITE_BED,
        ingredients: [
            { item: Items.WHITE_WOOL, quantity: 3 },
            { item: Items.OAK_PLANKS, quantity: 3 },
        ],
        quantity: 1,
    },
    WOODEN_AXE: {
        item: Items.WOODEN_AXE,
        ingredients: [
            { item: Items.OAK_PLANKS, quantity: 3 },
            { item: Items.STICK, quantity: 2 },
        ],
        quantity: 1,
    },
    WOODEN_PICKAXE: {
        item: Items.WOODEN_PICKAXE,
        ingredients: [
            { item: Items.OAK_PLANKS, quantity: 3 },
            { item: Items.STICK, quantity: 2 },
        ],
        quantity: 1,
    },
} as const;

export default ItemsRecipes;
