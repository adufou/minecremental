import Item from '@/types/item.ts';

export type ItemStack = {
    item: Item;
    size: number;
};

export type Inventory = {
    stacks: ItemStack[];
};
