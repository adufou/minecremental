import { type Item, Items } from '@/shared/constants/items';

export type ItemStack = {
    item: Item;
    size: number;
    durability?: number;
    perSecond?: number;
};

export type Inventory = Partial<Record<keyof typeof Items, ItemStack>>;
