import { Item, Items } from '@/constants/items.ts';

export type ItemStack = {
    item: Item;
    size: number;
    durability?: number;
};

export type Inventory = Partial<Record<keyof typeof Items, ItemStack>>;
