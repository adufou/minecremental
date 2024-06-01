import { calculateProbability } from '@/utils/probability.ts';

describe('calculateProbability', () => {
    describe('weight is 1', () => {
        it('returns a probability of 1 for a single item of weight 1', () => {
            // Arrange
            const items = [{ item: 'stone', weight: 1 }];

            // Act
            const result = calculateProbability(items);

            // Assert
            expect(result).toEqual([{ item: 'stone', probability: 1 }]);
        });
        it('returns a probability of 0.5 for two items of weight 1', () => {
            // Arrange
            const items = [
                { item: 'stone', weight: 1 },
                { item: 'iron', weight: 1 },
            ];

            // Act
            const result = calculateProbability(items);

            // Assert
            expect(result).toEqual([
                { item: 'stone', probability: 0.5 },
                { item: 'iron', probability: 0.5 },
            ]);
        });
        it('returns a probability of 0.33 for three items of weight 1', () => {
            // Arrange
            const items = [
                { item: 'stone', weight: 1 },
                { item: 'iron', weight: 1 },
                { item: 'gold', weight: 1 },
            ];

            // Act
            const result = calculateProbability(items);

            // Assert
            expect(result).toEqual([
                { item: 'stone', probability: 1 / 3 },
                { item: 'iron', probability: 1 / 3 },
                { item: 'gold', probability: 1 / 3 },
            ]);
        });
    });
    describe('weight is 1 and 2', () => {
        it('returns a probability of 1 for a single item of weight 2', () => {
            // Arrange
            const items = [{ item: 'stone', weight: 2 }];

            // Act
            const result = calculateProbability(items);

            // Assert
            expect(result).toEqual([{ item: 'stone', probability: 1 }]);
        });
        it('returns a probability of 0.5 for two items of weight 2', () => {
            // Arrange
            const items = [
                { item: 'stone', weight: 2 },
                { item: 'iron', weight: 2 },
            ];

            // Act
            const result = calculateProbability(items);

            // Assert
            expect(result).toEqual([
                { item: 'stone', probability: 0.5 },
                { item: 'iron', probability: 0.5 },
            ]);
        });
        it('returns a probability of 0.33 for three items of weight 2', () => {
            // Arrange
            const items = [
                { item: 'stone', weight: 2 },
                { item: 'iron', weight: 2 },
                { item: 'gold', weight: 2 },
            ];

            // Act
            const result = calculateProbability(items);

            // Assert
            expect(result).toEqual([
                { item: 'stone', probability: 1 / 3 },
                { item: 'iron', probability: 1 / 3 },
                { item: 'gold', probability: 1 / 3 },
            ]);
        });
        it('returns the correct probabilities for three items of weight 1 and 2', () => {
            // Arrange
            const items = [
                { item: 'stone', weight: 1 },
                { item: 'iron', weight: 2 },
                { item: 'gold', weight: 1 },
            ];

            // Act
            const result = calculateProbability(items);

            // Assert
            expect(result).toEqual([
                { item: 'stone', probability: 1 / 4 },
                { item: 'iron', probability: 1 / 2 },
                { item: 'gold', probability: 1 / 4 },
            ]);
        });
    });
});
