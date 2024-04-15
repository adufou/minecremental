export type Item = {
    id: number;
    name: string;
    stackSize: number;
    imageName: string;
};

export type ItemStack = {
    item: Item;
    size: number;
};

export type Inventory = {
    stacks: ItemStack[];
};
