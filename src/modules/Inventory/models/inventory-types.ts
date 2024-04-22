import { Item, Items } from '@/constants/items.ts';

export type ItemStack = {
    item: Item;
    size: number;
    durability?: number;
};

export type Inventory = Map<keyof typeof Items, ItemStack>;
