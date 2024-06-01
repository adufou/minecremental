type ItemDistribution<T> = {
    item: T;
    weight: number;
};

type ItemProbability<T> = {
    item: T;
    probability: number;
};

const calculateProbability = <T>(
    items: ItemDistribution<T>[],
): ItemProbability<T>[] => {
    // Calculate total weight
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

    // Calculate probability for each item
    return items.map((item) => ({
        item: item.item,
        probability: item.weight / totalWeight,
    }));
};

export { calculateProbability };
