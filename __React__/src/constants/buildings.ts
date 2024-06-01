import { BuildingsType, BuildingTypes } from '@/types/village-types.ts';

const Buildings: BuildingsType = {
    OAK_HOUSE: {
        displayName: 'Oak House',
        name: 'OAK_HOUSE',
        type: BuildingTypes.HOUSE,
    },
} as const;

export default Buildings;
