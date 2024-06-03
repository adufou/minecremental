import { Items, type ItemsType } from '@/shared/constants/items';
import { calculateProbability } from '@/utils/probability';

const coalWeightAtDepth = (depth: number) => {
    return Math.pow(depth, 1.1);
};

const cobblesWeightAtDepth = (depth: number) => {
    return depth + 100;
};

const ironWeightAtDepth = (depth: number) => {
    return Math.pow(depth, 1.15);
};

const getOresDistributionAtDepth = (
    depth: number,
): { item: keyof ItemsType; probability: number }[] => {
    const itemWeightArray: { item: keyof ItemsType; weight: number }[] = [];

    // Base weight of cobblestone
    const cobbleWeight = cobblesWeightAtDepth(depth);
    if (cobbleWeight > 0) {
        itemWeightArray.push({
            item: Items.COBBLESTONE.name,
            weight: cobbleWeight,
        });
    }

    // Weights at depth of ores
    const coalWeight = coalWeightAtDepth(depth);
    if (coalWeight > 0) {
        itemWeightArray.push({ item: Items.COAL.name, weight: coalWeight });
    }

    const ironWeight = ironWeightAtDepth(depth);
    if (ironWeight > 0) {
        itemWeightArray.push({ item: Items.IRON_ORE.name, weight: ironWeight });
    }

    // console.log(itemWeightArray);

    return calculateProbability(itemWeightArray);
};

export default getOresDistributionAtDepth;
