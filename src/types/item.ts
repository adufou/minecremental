import ItemTypes from '@/types/item-types.ts';

type Item = {
    displayName: string;
    stackSize: number;
    name: string;
    type: ItemTypes;
    multiplier?: number;
};

export default Item;
