import Item from '@/types/item.ts';

const Items: { [identifier: string]: Item } = {
    OAK_LOG: {
        id: 1,
        name: 'Oak Log',
        stackSize: 64,
        imageName: 'oak_log',
    },
    OAK_PLANKS: {
        id: 2,
        name: 'Oak Planks',
        stackSize: 64,
        imageName: 'oak_planks',
    },
    WOODEN_AXE: {
        id: 3,
        name: 'Wooden Axe',
        stackSize: 1,
        imageName: 'wooden_axe',
    },
} as const;

export { Items };
