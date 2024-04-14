import {Items} from "@/constants/items.ts";
import inventorySliceMethods from "@/modules/Inventory/store/inventory-slice-methods.ts";
import {Inventory} from "@/modules/Inventory/models/inventory-types.ts";

describe('inventorySliceMethods', () => {
    describe('addItemToPlayerInventory', () => {
        describe('add 1 item', () => {
            it('should leave 1 item stack with 1 item an empty inventory', () => {
                // Arrange
                const inventory: Inventory['stacks'] = [];

                // Act
                const newInventory = inventorySliceMethods().addItemToPlayerInventory({
                    item: Items.OAK_LOG,
                    number: 1,
                    inventory
                })

                // Assert
                expect(newInventory.length).toBe(1);
                expect(newInventory[0].size).toBe(1);
            })

            it('should leave 1 item stack with 2 items an inventory with 1 of this item', () => {
                // Arrange
                const inventory: Inventory['stacks'] = [
                    {
                        item: Items.OAK_LOG,
                        size: 1,
                    }
                ];

                // Act
                const newInventory = inventorySliceMethods().addItemToPlayerInventory({
                    item: Items.OAK_LOG,
                    number: 1,
                    inventory
                })

                // Assert
                expect(newInventory.length).toBe(1);
                expect(newInventory[0].size).toBe(2);
            })

            it('should add another stack if the one present in the inventory is full', () => {
                // Arrange
                const inventory: Inventory['stacks'] = [
                    {
                        item: Items.OAK_LOG,
                        size: 64,
                    }
                ];

                // Act
                const newInventory = inventorySliceMethods().addItemToPlayerInventory({
                    item: Items.OAK_LOG,
                    number: 1,
                    inventory
                })

                // Assert
                expect(newInventory.length).toBe(2);
                expect(newInventory[0].size).toBe(64);
                expect(newInventory[1].size).toBe(1);
            })
        });
        describe('add several items', () => {
            it('should add 8 stack when adding 8 non stackable items', () => {
                // Arrange
                const inventory: Inventory['stacks'] = [
                    {
                        item: Items.WOODEN_AXE,
                        size: 1,
                    }
                ];

                // Act
                const newInventory = inventorySliceMethods().addItemToPlayerInventory({
                    item: Items.WOODEN_AXE,
                    number: 8,
                    inventory
                })

                // Assert
                expect(newInventory.length).toBe(9);
                expect(newInventory[0].size).toBe(1);
                expect(newInventory[1].size).toBe(1);
                expect(newInventory[8].size).toBe(1);
            })
            it('should fill the current stack and add another stack if the one present in the inventory is almost full', () => {
                // Arrange
                const inventory: Inventory['stacks'] = [
                    {
                        item: Items.OAK_LOG,
                        size: 32,
                    }
                ];

                // Act
                const newInventory = inventorySliceMethods().addItemToPlayerInventory({
                    item: Items.OAK_LOG,
                    number: 64,
                    inventory
                })

                // Assert
                expect(newInventory.length).toBe(2);
                expect(newInventory[0].size).toBe(64);
                expect(newInventory[1].size).toBe(32);
            })
            it('should fill the current stack and add other stacks if the one present in the inventory is almost full', () => {
                // Arrange
                const inventory: Inventory['stacks'] = [
                    {
                        item: Items.OAK_LOG,
                        size: 32,
                    }
                ];

                // Act
                const newInventory = inventorySliceMethods().addItemToPlayerInventory({
                    item: Items.OAK_LOG,
                    number: 128,
                    inventory
                })

                // Assert
                expect(newInventory.length).toBe(3);
                expect(newInventory[0].size).toBe(64);
                expect(newInventory[1].size).toBe(64);
                expect(newInventory[2].size).toBe(32);
            })
            it('should fill only stack with the correct item and add other stacks if the one present in the inventory is almost full', () => {
                // Arrange
                const inventory: Inventory['stacks'] = [
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
                const newInventory = inventorySliceMethods().addItemToPlayerInventory({
                    item: Items.OAK_LOG,
                    number: 128,
                    inventory
                })

                // Assert
                expect(newInventory.length).toBe(4);
                expect(newInventory[0].size).toBe(64);
                expect(newInventory[2].size).toBe(64);
                expect(newInventory[3].size).toBe(32);
            })
        })
    });
});