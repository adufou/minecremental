type Item = {
    id: number;
    name: string;
    stackSize: number;
    imageName: string;
}

type ItemStack = {
    item: Item;
    size: number;
}

type Inventory = {
    stacks: ItemStack[];
}