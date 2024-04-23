import ItemTypes from '@/types/item-types.ts';

export type Item = {
    displayName: string;
    // Still needed ?
    name: keyof ItemsType;
    type: ItemTypes;
    multiplier?: number;
    durability?: number;
};

export type ItemsType = {
    DIAMOND_AXE: Item;
    IRON_AXE: Item;
    OAK_LOG: Item;
    OAK_PLANKS: Item;
    NETHERITE_AXE: Item;
    STICK: Item;
    STONE_AXE: Item;
    WOODEN_AXE: Item;
};

const Items: ItemsType = {
    DIAMOND_AXE: {
        displayName: 'Diamond Axe',
        name: 'DIAMOND_AXE',
        multiplier: 16,
        type: ItemTypes.AXE,
    },
    IRON_AXE: {
        displayName: 'Iron Axe',
        name: 'IRON_AXE',
        multiplier: 8,
        type: ItemTypes.AXE,
    },
    OAK_LOG: {
        displayName: 'Oak Log',
        name: 'OAK_LOG',
        type: ItemTypes.BLOCK,
    },
    OAK_PLANKS: {
        displayName: 'Oak Planks',
        name: 'OAK_PLANKS',
        type: ItemTypes.BLOCK,
    },
    NETHERITE_AXE: {
        displayName: 'Netherite Axe',
        name: 'NETHERITE_AXE',
        multiplier: 32,
        type: ItemTypes.AXE,
    },
    STICK: {
        displayName: 'Stick',
        name: 'STICK',
        type: ItemTypes.INGREDIENT,
    },
    STONE_AXE: {
        displayName: 'Stone Axe',
        name: 'STONE_AXE',
        multiplier: 4,
        type: ItemTypes.AXE,
    },
    WOODEN_AXE: {
        displayName: 'Wooden Axe',
        durability: 128,
        name: 'WOODEN_AXE',
        multiplier: 2,
        type: ItemTypes.AXE,
    },
} as const;

export { Items };
