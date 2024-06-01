import { Items, ItemsType } from '@/constants/items.ts';
import { calculateProbability } from '@/utils/probability.ts';

const ironWeightAtDepth = (depth: number) => {
    // TODO: rework this formula
    return depth / 10;
};

const getOresDistributionAtDepth = (
    depth: number,
): { item: keyof ItemsType; probability: number }[] => {
    const itemWeightArray: { item: keyof ItemsType; weight: number }[] = [];

    // Base weight, is not dependent on depth
    itemWeightArray.push({ item: Items.COBBLESTONE.name, weight: 100 });

    // Weights at depth of ores
    const ironWeight = ironWeightAtDepth(depth);
    if (ironWeight > 0) {
        itemWeightArray.push({ item: Items.IRON_ORE.name, weight: ironWeight });
    }

    console.log(itemWeightArray);

    return calculateProbability(itemWeightArray);
};

export default getOresDistributionAtDepth;
