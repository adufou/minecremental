import Item from '@/types/item.ts';

const Items: { [identifier: string]: Item } = {
    DIAMOND_AXE: {
        displayName: 'Diamond Axe',
        stackSize: 1,
        name: 'diamond_axe',
        multiplier: 16,
    },
    IRON_AXE: {
        displayName: 'Iron Axe',
        stackSize: 1,
        name: 'iron_axe',
        multiplier: 8,
    },
    OAK_LOG: {
        displayName: 'Oak Log',
        stackSize: 64,
        name: 'oak_log',
    },
    OAK_PLANKS: {
        displayName: 'Oak Planks',
        stackSize: 64,
        name: 'oak_planks',
    },
    NETHERITE_AXE: {
        displayName: 'Netherite Axe',
        stackSize: 1,
        name: 'netherite_axe',
        multiplier: 32,
    },
    STICK: {
        displayName: 'Stick',
        stackSize: 64,
        name: 'stick',
    },
    STONE_AXE: {
        displayName: 'Stone Axe',
        stackSize: 1,
        name: 'stone_axe',
        multiplier: 4,
    },
    WOODEN_AXE: {
        displayName: 'Wooden Axe',
        stackSize: 1,
        name: 'wooden_axe',
        multiplier: 2,
    },
} as const;

export { Items };
