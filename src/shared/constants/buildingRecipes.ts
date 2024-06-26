import Buildings from '@/shared/constants/buildings';
import { Items } from '@/shared/constants/items';

import type { BuildingRecipe } from '@/shared/models/buildingRecipe';

const BuildingRecipes: { [building: string]: BuildingRecipe } = {
    OAK_HOUSE: {
        building: Buildings.OAK_HOUSE,
        ingredients: [
            {
                item: Items.GLASS,
                quantity: 16,
            },
            {
                item: Items.WHITE_BED,
                quantity: 1,
            },
            {
                item: Items.OAK_FENCE,
                quantity: 24,
            },
            {
                item: Items.OAK_PLANKS,
                quantity: 64,
            },
            {
                item: Items.OAK_STAIRS,
                quantity: 48,
            },
            {
                item: Items.STONE,
                quantity: 16,
            },
        ],
        quantity: 1,
    },
} as const;

export default BuildingRecipes;
