import { useFoundryStore } from '@/modules/Foundry/store/foundry.store';
import { useInventoryStore } from '@/modules/Inventory/store/inventory.store';
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
            it('should not decrease the current fuel if there is no fuel and no item to smelt', () => {
                // Arrange
                const elapsed = 10;
                const currentFuel = { item: Items.COAL, fuel: 0 };
                const foundryStore = useFoundryStore();
                const inventoryStore = useInventoryStore();

                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.COAL.name] = {
                    item: Items.COAL,
                    size: 1,
                };

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
                const inventoryStore = useInventoryStore();

                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = undefined;

                inventoryStore.inventory[Items.COAL.name] = {
                    item: Items.COAL,
                    size: 1,
                };

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
                const inventoryStore = useInventoryStore();

                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.COAL.name] = {
                    item: Items.COAL,
                    size: 1,
                };
                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 1,
                };

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
                const inventoryStore = useInventoryStore();

                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.COAL.name] = {
                    item: Items.COAL,
                    size: 1,
                };
                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 1,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.currentFuel;
                expect(result).toEqual({ item: Items.COAL, fuel: 0 });
            });
            it('should refill the current fuel if selected fuel is available', () => {
                // Arrange
                const elapsed = 10;
                const foundryStore = useFoundryStore();
                const inventoryStore = useInventoryStore();

                foundryStore.currentFuel = undefined;
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.COAL.name] = {
                    item: Items.COAL,
                    size: 1,
                };
                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 1,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const currentFuel = foundryStore.currentFuel;
                expect(currentFuel).toEqual({ item: Items.COAL, fuel: 7_990 });
            });
            // it('should refill then use the current fuel if the elapsed time is greater than the current fuel', () => {
            //     // Arrange
            //     const elapsed = 1_000;
            //     const foundryStore = useFoundryStore();
            //     const inventoryStore = useInventoryStore();
            //
            //     foundryStore.currentFuel = { item: Items.COAL, fuel: 500 };
            //     inventoryStore.inventory[Items.COAL.name] = {
            //         item: Items.COAL,
            //         size: 1,
            //     };
            //
            //     // Act
            //     foundryStore.smelt(elapsed);
            //
            //     // Assert
            //     const currentFuel = foundryStore.currentFuel;
            //     expect(currentFuel).toEqual({ item: Items.COAL, fuel: 7_500 });
            //     expect(inventoryStore.inventory[Items.COAL.name]?.size).toBe(0);
            // });
            it('should not use fuel if there is not enough ore in the inventory and fuel is empty', () => {
                // Arrange
                const elapsed = 10;
                const foundryStore = useFoundryStore();
                const inventoryStore = useInventoryStore();

                foundryStore.currentFuel = { item: Items.COAL, fuel: 0 };
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.COAL.name] = {
                    item: Items.COAL,
                    size: 1,
                };
                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 0,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const currentFuel = foundryStore.currentFuel;
                expect(currentFuel).toEqual({ item: Items.COAL, fuel: 0 });
                expect(inventoryStore.inventory[Items.COAL.name]?.size).toEqual(
                    1,
                );
            });
            it('should use fuel if it began to burn even if there is nothing in the furnace', () => {
                // Arrange
                const elapsed = 10;
                const foundryStore = useFoundryStore();
                const inventoryStore = useInventoryStore();

                foundryStore.currentFuel = { item: Items.COAL, fuel: 1_000 };
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 0,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const currentFuel = foundryStore.currentFuel;
                expect(currentFuel).toEqual({ item: Items.COAL, fuel: 990 });
            });
        });
        describe('progress', () => {
            it('should not increase the progress if there is no current fuel', () => {
                // Arrange
                const elapsed = 10;
                const foundryStore = useFoundryStore();
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.loadedRecipe.fuelProgress;
                expect(result).toBe(0);
            });
            it('should not increase the progress if there is no fuel', () => {
                // Arrange
                const elapsed = 10;
                const currentFuel = { item: Items.COAL, fuel: 0 };
                const foundryStore = useFoundryStore();
                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.loadedRecipe.fuelProgress;
                expect(result).toBe(0);
            });
            it('should increase the progress by the elapsed time', () => {
                // Arrange
                const elapsed = 10;
                const currentFuel = { item: Items.COAL, fuel: 1_000 };
                const foundryStore = useFoundryStore();
                const inventoryStore = useInventoryStore();

                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 1,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.loadedRecipe.fuelProgress;
                expect(result).toBe(10);
            });
            it('should not progress if there is no ore in the inventory', () => {
                // Arrange
                const elapsed = 10;
                const foundryStore = useFoundryStore();
                const inventoryStore = useInventoryStore();

                foundryStore.currentFuel = { item: Items.COAL, fuel: 1_000 };
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 0,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.loadedRecipe.fuelProgress;
                expect(result).toBe(0);
            });
            it('should reset progress to 0 if there is no other ingredient after smelting', () => {
                // Arrange
                const elapsed = 1_000;
                const currentFuel = { item: Items.COAL, fuel: 4_000 };
                const inventoryStore = useInventoryStore();
                const foundryStore = useFoundryStore();

                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 500,
                };

                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 0,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = foundryStore.loadedRecipe.fuelProgress;
                expect(result).toBe(0);
            });
        });
        describe('recipe', () => {
            it('should not remove item from inventory if progress did not reach 100', () => {
                // Arrange
                const elapsed = 10;
                const currentFuel = { item: Items.COAL, fuel: 1_000 };
                const inventoryStore = useInventoryStore();
                const foundryStore = useFoundryStore();

                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 1,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result = inventoryStore.inventory[Items.IRON_ORE.name];
                expect(result).toEqual({ item: Items.IRON_ORE, size: 1 });
            });
            it('should remove the smelted base item from inventory if progress reached 100', () => {
                // Arrange
                const elapsed = 1_000;
                const currentFuel = { item: Items.COAL, fuel: 1_000 };
                const inventoryStore = useInventoryStore();
                const foundryStore = useFoundryStore();

                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 1,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result =
                    inventoryStore.inventory[Items.IRON_ORE.name]?.size;
                expect(result).toBe(0);
            });
            it('should add the smelted item to the inventory', () => {
                // Arrange
                const elapsed = 1_000;
                const currentFuel = { item: Items.COAL, fuel: 1_000 };
                const inventoryStore = useInventoryStore();
                const foundryStore = useFoundryStore();

                foundryStore.currentFuel = currentFuel;
                foundryStore.loadedRecipe = {
                    recipe: SmeltRecipes.IRON_INGOT,
                    fuelProgress: 0,
                };

                inventoryStore.inventory[Items.IRON_ORE.name] = {
                    item: Items.IRON_ORE,
                    size: 1,
                };
                inventoryStore.inventory[Items.IRON_INGOT.name] = {
                    item: Items.IRON_ORE,
                    size: 0,
                };

                // Act
                foundryStore.smelt(elapsed);

                // Assert
                const result =
                    inventoryStore.inventory[Items.IRON_INGOT.name]?.size;
                expect(result).toBe(1);
            });
        });
    });

    describe('remaining fuel', () => {
        it('should return 0 if there is no current fuel', () => {
            // Arrange
            const foundryStore = useFoundryStore();

            // Act
            const result = foundryStore.remainingFuelPercent;

            // Assert
            expect(result).toBe(0);
        });
        it('should return 0 if there is no fuel', () => {
            // Arrange
            const currentFuel = { item: Items.COAL, fuel: 0 };
            const foundryStore = useFoundryStore();
            foundryStore.currentFuel = currentFuel;

            // Act
            const result = foundryStore.remainingFuelPercent;

            // Assert
            expect(result).toBe(0);
        });
        it('should return 50 if the current fuel is half empty', () => {
            // Arrange
            const currentFuel = { item: Items.COAL, fuel: 4_000 };
            const foundryStore = useFoundryStore();
            foundryStore.currentFuel = currentFuel;

            // Act
            const result = foundryStore.remainingFuelPercent;

            // Assert
            expect(result).toBe(50);
        });
        it('should return 100 if the current fuel is full', () => {
            // Arrange
            const currentFuel = { item: Items.COAL, fuel: 8_000 };
            const foundryStore = useFoundryStore();
            foundryStore.currentFuel = currentFuel;

            // Act
            const result = foundryStore.remainingFuelPercent;

            // Assert
            expect(result).toBe(100);
        });
        it('should return 100 if the current fuel is more than full', () => {
            // Arrange
            const currentFuel = { item: Items.COAL, fuel: 16_000 };
            const foundryStore = useFoundryStore();
            foundryStore.currentFuel = currentFuel;

            // Act
            const result = foundryStore.remainingFuelPercent;

            // Assert
            expect(result).toBe(100);
        });
        it('should return 0 if the current fuel is less than empty', () => {
            // Arrange
            const currentFuel = { item: Items.COAL, fuel: -8_000 };
            const foundryStore = useFoundryStore();
            foundryStore.currentFuel = currentFuel;

            // Act
            const result = foundryStore.remainingFuelPercent;

            // Assert
            expect(result).toBe(0);
        });
    });
    describe('recipe progress percent', () => {
        it('should return 0 if there is no loaded recipe', () => {
            // Arrange
            const foundryStore = useFoundryStore();

            // Act
            const result = foundryStore.recipeProgressPercent;

            // Assert
            expect(result).toBe(0);
        });
        it('should return 0 if there is no progress', () => {
            // Arrange
            const foundryStore = useFoundryStore();
            foundryStore.loadedRecipe = {
                recipe: SmeltRecipes.IRON_INGOT,
                fuelProgress: 0,
            };

            // Act
            const result = foundryStore.recipeProgressPercent;

            // Assert
            expect(result).toBe(0);
        });
        it('should return 50 if the progress is half way', () => {
            // Arrange
            const foundryStore = useFoundryStore();
            foundryStore.loadedRecipe = {
                recipe: SmeltRecipes.IRON_INGOT,
                fuelProgress: 500,
            };

            // Act
            const result = foundryStore.recipeProgressPercent;

            // Assert
            expect(result).toBe(50);
        });
        it('should return 100 if the progress is full', () => {
            // Arrange
            const foundryStore = useFoundryStore();
            foundryStore.loadedRecipe = {
                recipe: SmeltRecipes.IRON_INGOT,
                fuelProgress: 1_000,
            };

            // Act
            const result = foundryStore.recipeProgressPercent;

            // Assert
            expect(result).toBe(100);
        });
        it('should return 100 if the progress is more than full', () => {
            // Arrange
            const foundryStore = useFoundryStore();
            foundryStore.loadedRecipe = {
                recipe: SmeltRecipes.IRON_INGOT,
                fuelProgress: 2_000,
            };

            // Act
            const result = foundryStore.recipeProgressPercent;

            // Assert
            expect(result).toBe(100);
        });
        it('should return 0 if the progress is less than empty', () => {
            // Arrange
            const foundryStore = useFoundryStore();
            foundryStore.loadedRecipe = {
                recipe: SmeltRecipes.IRON_INGOT,
                fuelProgress: -500,
            };

            // Act
            const result = foundryStore.recipeProgressPercent;

            // Assert
            expect(result).toBe(0);
        });
    });
});
