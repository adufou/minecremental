import { useFoundryStore } from '@/modules/Foundry/store/foundry.store';
import { Items } from '@/shared/constants/items';
import SmeltRecipes from '@/shared/constants/smeltRecipes';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

describe('foundry store', () => {
    beforeEach(() => {
        // From https://pinia.vuejs.org/cookbook/testing.html
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia());
    });

    describe('smelt', () => {
        describe('fuel consumption', () => {
            it('should not decrease the current fuel if there is no current fuel', () => {
                // Arrange
                const elapsed = 10;
                const foundryStore = useFoundryStore();

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.currentFuel;
                expect(result).toBeUndefined();
            });
            it('should not decrease the current fuel if there is no fuel', () => {
                // Arrange
                const elapsed = 10;
                const currentFuel = { item: Items.COAL, fuel: 0 };
                const foundryStore = useFoundryStore();

                foundryStore.currentFuel = currentFuel;

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.currentFuel;
                expect(result).toEqual({ item: Items.COAL, fuel: 0 });
            });
            it('should not decrease the current fuel if there is no loaded recipe', () => {
                // Arrange
                const elapsed = 10;
                const currentFuel = { item: Items.COAL, fuel: 1_000 };
                const foundryStore = useFoundryStore();

                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = undefined;

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.currentFuel;
                expect(result).toEqual({ item: Items.COAL, fuel: 1_000 });
            });
            it('should decrease the current fuel by the elapsed time', () => {
                // Arrange
                const elapsed = 10;
                const currentFuel = { item: Items.COAL, fuel: 1_000 };
                const foundryStore = useFoundryStore();

                foundryStore.currentFuel = currentFuel;

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.currentFuel;
                expect(result).toEqual({ item: Items.COAL, fuel: 990 });
            });
            it('should decrease the current fuel to 0 if the elapsed time is greater than the current fuel', () => {
                // Arrange
                const elapsed = 1_001;
                const currentFuel = { item: Items.COAL, fuel: 1_000 };
                const foundryStore = useFoundryStore();

                foundryStore.currentFuel = currentFuel;

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.currentFuel;
                expect(result).toEqual({ item: Items.COAL, fuel: 0 });
            });
        });
        describe('progress', () => {
            it('should not increase the progress if there is no current fuel', () => {
                // Arrange
                const elapsed = 10;
                const foundryStore = useFoundryStore();
                foundryStore.progress = 0;

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.progress;
                expect(result).toBe(0);
            });
            it('should not increase the progress if there is no fuel', () => {
                // Arrange
                const elapsed = 10;
                const currentFuel = { item: Items.COAL, fuel: 0 };
                const foundryStore = useFoundryStore();
                foundryStore.currentFuel = currentFuel;
                foundryStore.progress = 0;

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.progress;
                expect(result).toBe(0);
            });
            it('should not increase the progress if there is no loaded recipe', () => {
                // Arrange
                const elapsed = 10;
                const currentFuel = { item: Items.COAL, fuel: 1_000 };
                const foundryStore = useFoundryStore();
                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = undefined;
                foundryStore.progress = 0;

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.progress;
                expect(result).toBe(0);
            });
            it('should increase the progress by the elapsed time', () => {
                // Arrange
                const elapsed = 10;
                const currentFuel = { item: Items.COAL, fuel: 1_000 };
                const foundryStore = useFoundryStore();
                foundryStore.currentFuel = currentFuel;
                foundryStore.progress = 0;
                foundryStore.loadedRecipe = { recipe: SmeltRecipes.IRON_INGOT };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.progress;
                expect(result).toBe(10);
            });
        });
    });
});
