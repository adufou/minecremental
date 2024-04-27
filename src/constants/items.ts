import ItemTypes from '@/types/item-types.ts';

export type Item = {
    displayName: string;
    name: keyof ItemsType;
    type: ItemTypes;
    multiplier?: number;
    durability?: number;
};

export type ItemsType = {
    COBBLESTONE: Item;
    DIAMOND_AXE: Item;
    GLASS: Item;
    IRON_AXE: Item;
    OAK_FENCE: Item;
    OAK_LOG: Item;
    OAK_PLANKS: Item;
    OAK_STAIRS: Item;
    NETHERITE_AXE: Item;
    STICK: Item;
    STONE: Item;
    STONE_AXE: Item;
    WHITE_BED: Item;
    WHITE_WOOL: Item;
    WOODEN_AXE: Item;
};

const Items: ItemsType = {
    COBBLESTONE: {
        displayName: 'Cobblestone',
        name: 'COBBLESTONE',
        type: ItemTypes.BLOCK,
    },
    DIAMOND_AXE: {
        displayName: 'Diamond Axe',
        name: 'DIAMOND_AXE',
        multiplier: 16,
        type: ItemTypes.AXE,
    },
    GLASS: {
        displayName: 'Glass',
        name: 'GLASS',
        type: ItemTypes.BLOCK,
    },
    IRON_AXE: {
        displayName: 'Iron Axe',
        name: 'IRON_AXE',
        multiplier: 8,
        type: ItemTypes.AXE,
    },
    OAK_FENCE: {
        displayName: 'Oak Fence',
        name: 'OAK_FENCE',
        type: ItemTypes.BLOCK,
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
    OAK_STAIRS: {
        displayName: 'Oak Stairs',
        name: 'OAK_STAIRS',
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
    STONE: {
        displayName: 'Stone',
        name: 'STONE',
        type: ItemTypes.BLOCK,
    },
    STONE_AXE: {
        displayName: 'Stone Axe',
        name: 'STONE_AXE',
        multiplier: 4,
        type: ItemTypes.AXE,
    },
    WHITE_BED: {
        displayName: 'White Bed',
        name: 'WHITE_BED',
        type: ItemTypes.BLOCK,
    },
    WHITE_WOOL: {
        displayName: 'White Wool',
        name: 'WHITE_WOOL',
        type: ItemTypes.BLOCK,
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
