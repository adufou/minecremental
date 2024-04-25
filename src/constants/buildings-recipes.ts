import { BuildingRecipe } from '@/types/village-types.ts';
import { Items } from '@/constants/items.ts';
import Buildings from '@/constants/buildings.ts';

const BuildingsRecipes: { [building: string]: BuildingRecipe } = {
    OAK_HOUSE: {
        building: Buildings.OAK_HOUSE,
        ingredients: [{ item: Items.OAK_PLANKS, quantity: 64 }],
        quantity: 1,
    },
} as const;

export default BuildingsRecipes;
