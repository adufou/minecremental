import getOresDistributionAtDepth from '@/modules/Mine/utils/oreDistribution';
import { Items } from '@/shared/constants/items';
import { describe, expect, it } from 'vitest';

describe('Ores distribution', () => {
    it('should return only stone at depth 0', () => {
        // Arrange
        // Act
        const oresDistribution = getOresDistributionAtDepth(0);

        // Assert
        expect(oresDistribution).toEqual([
            { item: Items.COBBLESTONE.name, probability: 1 },
        ]);
    });
    it('should return stone and iron at depth 100', () => {
        // Arrange
        // Act
        const oresDistribution = getOresDistributionAtDepth(100);

        // Assert
        expect(oresDistribution).toEqual([
            { item: Items.COBBLESTONE.name, probability: 0.9090909090909091 },
            { item: Items.IRON_ORE.name, probability: 0.09090909090909091 },
        ]);
    });
});
