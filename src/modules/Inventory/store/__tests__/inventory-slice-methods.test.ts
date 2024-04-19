import { Items } from '@/constants/items.ts';
import inventorySliceMethods from '@/modules/Inventory/store/inventory-slice-methods.ts';
import { Inventory } from '@/modules/Inventory/models/inventory-types.ts';

describe('inventorySliceMethods', () => {
    describe('addItemToPlayerInventory', () => {
        describe('add 1 item', () => {
            it('should leave 1 item stack with 1 item an empty inventory', () => {
                // Arrange
                const stacks: Inventory['stacks'] = [];

                // Act
                const newInventory =
                    inventorySliceMethods().addItemToPlayerInventory({
                        item: Items.OAK_LOG,
                        quantity: 1,
                        stacks,
                    });

                // Assert
                expect(newInventory.length).toBe(1);
                expect(newInventory[0].size).toBe(1);
            });

            it('should leave 1 item stack with 2 items an inventory with 1 of this item', () => {
                // Arrange
                const stacks: Inventory['stacks'] = [
                    {
                        item: Items.OAK_LOG,
                        size: 1,
                    },
                ];

                // Act
                const newInventory =
                    inventorySliceMethods().addItemToPlayerInventory({
                        item: Items.OAK_LOG,
                        quantity: 1,
                        stacks,
                    });

                // Assert
                expect(newInventory.length).toBe(1);
                expect(newInventory[0].size).toBe(2);
            });

            it('should add another stack if the one present in the inventory is full', () => {
                // Arrange
                const stacks: Inventory['stacks'] = [
                    {
                        item: Items.OAK_LOG,
                        size: 64,
                    },
                ];

                // Act
                const newInventory =
                    inventorySliceMethods().addItemToPlayerInventory({
                        item: Items.OAK_LOG,
                        quantity: 1,
                        stacks,
                    });

                // Assert
                expect(newInventory.length).toBe(2);
                expect(newInventory[0].size).toBe(64);
                expect(newInventory[1].size).toBe(1);
            });
        });
        describe('add several items', () => {
            it('should add 8 stack when adding 8 non stackable items', () => {
                // Arrange
                const stacks: Inventory['stacks'] = [
                    {
                        item: Items.WOODEN_AXE,
                        size: 1,
                    },
                ];

                // Act
                const newInventory =
                    inventorySliceMethods().addItemToPlayerInventory({
                        item: Items.WOODEN_AXE,
                        quantity: 8,
                        stacks,
                    });

                // Assert
                expect(newInventory.length).toBe(9);
                expect(newInventory[0].size).toBe(1);
                expect(newInventory[1].size).toBe(1);
                expect(newInventory[8].size).toBe(1);
            });
            it('should fill the current stack and add another stack if the one present in the inventory is almost full', () => {
                // Arrange
                const stacks: Inventory['stacks'] = [
                    {
                        item: Items.OAK_LOG,
                        size: 32,
                    },
                ];

                // Act
                const newInventory =
                    inventorySliceMethods().addItemToPlayerInventory({
                        item: Items.OAK_LOG,
                        quantity: 64,
                        stacks,
                    });

                // Assert
                expect(newInventory.length).toBe(2);
                expect(newInventory[0].size).toBe(64);
                expect(newInventory[1].size).toBe(32);
            });
            it('should fill the current stack and add other stacks if the one present in the inventory is almost full', () => {
                // Arrange
                const stacks: Inventory['stacks'] = [
                    {
                        item: Items.OAK_LOG,
                        size: 32,
                    },
                ];

                // Act
                const newInventory =
                    inventorySliceMethods().addItemToPlayerInventory({
                        item: Items.OAK_LOG,
                        quantity: 128,
                        stacks,
                    });

                // Assert
                expect(newInventory.length).toBe(3);
                expect(newInventory[0].size).toBe(64);
                expect(newInventory[1].size).toBe(64);
                expect(newInventory[2].size).toBe(32);
            });
            it('should fill only stack with the correct item and add other stacks if the one present in the inventory is almost full', () => {
                // Arrange
                const stacks: Inventory['stacks'] = [
                    {
                        item: Items.OAK_LOG,
                        size: 32,
                    },
                    {
                        item: Items.WOODEN_AXE,
                        size: 1,
                    },
                ];

                // Act
                const newInventory =
                    inventorySliceMethods().addItemToPlayerInventory({
                        item: Items.OAK_LOG,
                        quantity: 128,
                        stacks,
                    });

                // Assert
                expect(newInventory.length).toBe(4);
                expect(newInventory[0].size).toBe(64);
                expect(newInventory[2].size).toBe(64);
                expect(newInventory[3].size).toBe(32);
            });
        });
    });
    describe('hasItemInInventory', () => {
        it('should return false if the item is not in the inventory', () => {
            // Arrange
            const stacks: Inventory['stacks'] = [
                {
                    item: Items.WOODEN_AXE,
                    size: 1,
                },
            ];

            // Act
            const hasItem = inventorySliceMethods().hasItemInInventory(
                Items.OAK_LOG,
                stacks,
            );

            // Assert
            expect(hasItem).toBe(false);
        });
        it('should return false if the item is in the inventory but not enough', () => {
            // Arrange
            const stacks: Inventory['stacks'] = [
                {
                    item: Items.OAK_LOG,
                    size: 1,
                },
            ];

            // Act
            const hasItem = inventorySliceMethods().hasItemInInventory(
                Items.OAK_LOG,
                stacks,
                2,
            );

            // Assert
            expect(hasItem).toBe(false);
        });
        it('should return true if the item is in the inventory and enough', () => {
            // Arrange
            const stacks: Inventory['stacks'] = [
                {
                    item: Items.OAK_LOG,
                    size: 2,
                },
            ];

            // Act
            const hasItem = inventorySliceMethods().hasItemInInventory(
                Items.OAK_LOG,
                stacks,
                2,
            );

            // Assert
            expect(hasItem).toBe(true);
        });
        it('should return true if the item is in the inventory and enough over several stacks', () => {
            // Arrange
            const stacks: Inventory['stacks'] = [
                {
                    item: Items.OAK_LOG,
                    size: 2,
                },
                {
                    item: Items.OAK_LOG,
                    size: 2,
                },
            ];

            // Act
            const hasItem = inventorySliceMethods().hasItemInInventory(
                Items.OAK_LOG,
                stacks,
                3,
            );

            // Assert
            expect(hasItem).toBe(true);
        });
        it('should return false if the item is in the inventory and not enough over several stacks', () => {
            // Arrange
            const stacks: Inventory['stacks'] = [
                {
                    item: Items.OAK_LOG,
                    size: 2,
                },
                {
                    item: Items.OAK_LOG,
                    size: 2,
                },
            ];

            // Act
            const hasItem = inventorySliceMethods().hasItemInInventory(
                Items.OAK_LOG,
                stacks,
                5,
            );

            // Assert
            expect(hasItem).toBe(false);
        });
    });
    describe('removeItemFromPlayerInventory', () => {
        it('should remove 1 item from a stack of 1 item', () => {
            // Arrange
            const stacks: Inventory['stacks'] = [
                {
                    item: Items.OAK_LOG,
                    size: 1,
                },
            ];

            // Act
            const newInventory =
                inventorySliceMethods().removeItemFromPlayerInventory({
                    item: Items.OAK_LOG,
                    quantity: 1,
                    stacks,
                });

            // Assert
            expect(newInventory.length).toBe(0);
        });
        it('should remove 1 item from a stack of 2 items', () => {
            // Arrange
            const stacks: Inventory['stacks'] = [
                {
                    item: Items.OAK_LOG,
                    size: 2,
                },
            ];

            // Act
            const newInventory =
                inventorySliceMethods().removeItemFromPlayerInventory({
                    item: Items.OAK_LOG,
                    quantity: 1,
                    stacks,
                });

            // Assert
            expect(newInventory.length).toBe(1);
            expect(newInventory[0].size).toBe(1);
        });
        it('should remove 1 item from a stack of 64 items', () => {
            // Arrange
            const stacks: Inventory['stacks'] = [
                {
                    item: Items.OAK_LOG,
                    size: 64,
                },
            ];

            // Act
            const newInventory =
                inventorySliceMethods().removeItemFromPlayerInventory({
                    item: Items.OAK_LOG,
                    quantity: 1,
                    stacks,
                });

            // Assert
            expect(newInventory.length).toBe(1);
            expect(newInventory[0].size).toBe(63);
        });
        it('should remove 64 items from a stack of 64 items', () => {
            // Arrange
            const stacks: Inventory['stacks'] = [
                {
                    item: Items.OAK_LOG,
                    size: 64,
                },
            ];

            // Act
            const newInventory =
                inventorySliceMethods().removeItemFromPlayerInventory({
                    item: Items.OAK_LOG,
                    quantity: 64,
                    stacks,
                });

            // Assert
            expect(newInventory.length).toBe(0);
        });
        it('should remove 64 items from 2 stacks of 48 items', () => {
            // Arrange
            const stacks: Inventory['stacks'] = [
                {
                    item: Items.OAK_LOG,
                    size: 48,
                },
                {
                    item: Items.OAK_LOG,
                    size: 48,
                },
            ];

            // Act
            const newInventory =
                inventorySliceMethods().removeItemFromPlayerInventory({
                    item: Items.OAK_LOG,
                    quantity: 64,
                    stacks,
                });

            // Assert
            expect(newInventory.length).toBe(1);
            expect(newInventory[0].size).toBe(32);
        });
    });
});
