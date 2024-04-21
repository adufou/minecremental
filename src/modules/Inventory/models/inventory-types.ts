import Item from '@/types/item.ts';

export type ItemStack = {
    item: Item;
    size: number;
    durability?: number;
};

export type Inventory = {
    stacks: ItemStack[];
};
