import Item from '@/types/item.ts';

const Items: { [identifier: string]: Item } = {
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
    STICK: {
        displayName: 'Stick',
        stackSize: 64,
        name: 'stick',
    },
    WOODEN_AXE: {
        displayName: 'Wooden Axe',
        stackSize: 1,
        name: 'wooden_axe',
    },
} as const;

export { Items };
