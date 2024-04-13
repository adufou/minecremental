type Item = {
    id: number;
    name: string;
    stackSize: number;
}

type ItemStack = {
    item: Item;
    size: number;
}

type Inventory = {
    stacks: ItemStack[];
}