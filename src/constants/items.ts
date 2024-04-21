import Item from '@/types/item.ts';
import ItemTypes from '@/types/item-types.ts';

const Items: { [identifier: string]: Item } = {
    DIAMOND_AXE: {
        displayName: 'Diamond Axe',
        stackSize: 1,
        name: 'diamond_axe',
        multiplier: 16,
        type: ItemTypes.AXE,
    },
    IRON_AXE: {
        displayName: 'Iron Axe',
        stackSize: 1,
        name: 'iron_axe',
        multiplier: 8,
        type: ItemTypes.AXE,
    },
    OAK_LOG: {
        displayName: 'Oak Log',
        stackSize: 64,
        name: 'oak_log',
        type: ItemTypes.BLOCK,
    },
    OAK_PLANKS: {
        displayName: 'Oak Planks',
        stackSize: 64,
        name: 'oak_planks',
        type: ItemTypes.BLOCK,
    },
    NETHERITE_AXE: {
        displayName: 'Netherite Axe',
        stackSize: 1,
        name: 'netherite_axe',
        multiplier: 32,
        type: ItemTypes.AXE,
    },
    STICK: {
        displayName: 'Stick',
        stackSize: 64,
        name: 'stick',
        type: ItemTypes.INGREDIENT,
    },
    STONE_AXE: {
        displayName: 'Stone Axe',
        stackSize: 1,
        name: 'stone_axe',
        multiplier: 4,
        type: ItemTypes.AXE,
    },
    WOODEN_AXE: {
        displayName: 'Wooden Axe',
        durability: 128,
        stackSize: 1,
        name: 'wooden_axe',
        multiplier: 2,
        type: ItemTypes.AXE,
    },
} as const;

export { Items };
