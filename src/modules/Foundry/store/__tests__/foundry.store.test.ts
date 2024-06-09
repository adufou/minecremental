import { useFoundryStore } from '@/modules/Foundry/store/foundry.store';
import { Items } from '@/shared/constants/items';
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
    });
});
