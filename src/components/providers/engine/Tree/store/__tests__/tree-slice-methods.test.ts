import treeSliceMethods from "@/components/providers/engine/Tree/store/tree-slice-methods.ts";

describe('TreeSliceMethods', () => {
    describe('chopProgress', () => {
        it('progresses to 50% and chops 0 with 0.5 chop per tick and 1 tick', () => {
            // Arrange
            const progress = 0;

            // Act
            const {newProgress, nbChopped} = treeSliceMethods().chopProgress({progress, chopPerTick: 0.5, nbTick: 1});

            // Assert
            expect(nbChopped).toBe(0);
            expect(newProgress).toBe(0.5);
        })
        it('progresses to 0% and chops 1 with 0.5 chop per tick and 2 ticks', () => {
            // Arrange
            const progress = 0;

            // Act
            const {newProgress, nbChopped} = treeSliceMethods().chopProgress({progress, chopPerTick: 0.5, nbTick: 2});

            // Assert
            expect(nbChopped).toBe(1);
            expect(newProgress).toBe(0);
        })
        it('progresses to 50% and chops 1 with 0.5 chop per tick and 3 ticks', () => {
            // Arrange
            const progress = 0;

            // Act
            const {newProgress, nbChopped} = treeSliceMethods().chopProgress({progress, chopPerTick: 0.5, nbTick: 3});

            // Assert
            expect(nbChopped).toBe(1);
            expect(newProgress).toBe(0.5);
        })
        it('progresses to 80% and chop 1 with 0.5 chop per tick and 0.3 starting progress over 3 tick', () => {
            // Arrange
            const progress = 0.3;

            // Act
            const {newProgress, nbChopped} = treeSliceMethods().chopProgress({progress, chopPerTick: 0.5, nbTick: 3});

            // Assert
            expect(nbChopped).toBe(1);
            expect(newProgress).toBe(0.8);
        })
        it('progresses to 30% and chop 15 with 1.5 chop per tick and 0.3 starting progress over 10 tick', () => {
            // Arrange
            const progress = 0.3;

            // Act
            const {newProgress, nbChopped} = treeSliceMethods().chopProgress({progress, chopPerTick: 1.5, nbTick: 10});

            // Assert
            expect(nbChopped).toBe(15);
            expect(newProgress).toBe(0.3);
        })
        it('progresses to 25% and chop 1 with 0.5 chop per tick and 0.75 starting progress over 1 tick', () => {
            // Arrange
            const progress = 0.75;

            // Act
            const {newProgress, nbChopped} = treeSliceMethods().chopProgress({progress, chopPerTick: 0.5, nbTick: 1});

            // Assert
            expect(nbChopped).toBe(1);
            expect(newProgress).toBe(0.25);
        })
        it('progresses to 25% and chop 16 with 15.5 chop per tick and 0.75 starting progress over 1 tick', () => {
            // Arrange
            const progress = 0.75;

            // Act
            const {newProgress, nbChopped} = treeSliceMethods().chopProgress({progress, chopPerTick: 15.5, nbTick: 1});

            // Assert
            expect(nbChopped).toBe(16);
            expect(newProgress).toBe(0.25);
        })
    })
})