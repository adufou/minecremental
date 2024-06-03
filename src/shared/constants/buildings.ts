import {
    type BuildingsType,
    BuildingTypes,
} from '@/shared/models/villageTypes';

const Buildings: BuildingsType = {
    OAK_HOUSE: {
        displayName: 'Oak House',
        name: 'OAK_HOUSE',
        type: BuildingTypes.HOUSE,
    },
} as const;

export default Buildings;
