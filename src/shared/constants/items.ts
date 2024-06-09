import ItemTypes from '@/shared/models/itemTypes';

export type Item = {
    displayName: string;
    name: keyof ItemsType;
    type: ItemTypes;
    multiplier?: number;
    durability?: number;
    fuel?: number; // 1 fuel = 1 ms of smelting (beginning of the game)
};

export type ItemsType = {
    COAL: Item;
    COBBLESTONE: Item;
    DIAMOND_AXE: Item;
    GLASS: Item;
    IRON_AXE: Item;
    IRON_INGOT: Item;
    IRON_ORE: Item;
    OAK_FENCE: Item;
    OAK_LOG: Item;
    OAK_PLANKS: Item;
    OAK_STAIRS: Item;
    NETHERITE_AXE: Item;
    SAND: Item;
    STICK: Item;
    STONE: Item;
    STONE_AXE: Item;
    STONE_PICKAXE: Item;
    WHITE_BED: Item;
    WHITE_WOOL: Item;
    WOODEN_AXE: Item;
    WOODEN_PICKAXE: Item;
};

const Items: ItemsType = {
    COAL: {
        displayName: 'Coal',
        name: 'COAL',
        type: ItemTypes.INGREDIENT,
        fuel: 8_000,
    },
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
    IRON_INGOT: {
        displayName: 'Iron Ingot',
        name: 'IRON_INGOT',
        type: ItemTypes.INGREDIENT,
    },
    IRON_ORE: {
        displayName: 'Iron Ore',
        name: 'IRON_ORE',
        type: ItemTypes.BLOCK,
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
    SAND: {
        displayName: 'Sand',
        name: 'SAND',
        type: ItemTypes.BLOCK,
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
        durability: 256,
        name: 'STONE_AXE',
        multiplier: 4,
        type: ItemTypes.AXE,
    },
    STONE_PICKAXE: {
        displayName: 'Stone Pickaxe',
        durability: 256,
        name: 'STONE_PICKAXE',
        multiplier: 4,
        type: ItemTypes.PICKAXE,
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
    WOODEN_PICKAXE: {
        displayName: 'Wooden Pickaxe',
        durability: 128,
        name: 'WOODEN_PICKAXE',
        multiplier: 2,
        type: ItemTypes.PICKAXE,
    },
} as const;

export { Items };
