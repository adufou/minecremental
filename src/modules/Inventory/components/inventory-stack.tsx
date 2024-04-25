import { Card } from '@/components/ui/card';
import { getImageOfItem } from '@/lib/image.utils.ts';
import { ItemStack } from '@/modules/Inventory/models/inventory-types.ts';
import { useMemo } from 'react';
import { display } from '@/lib/numbers.ts';

function InventoryStack(props: { stack: ItemStack }) {
    // Memos
    const durabilityBarStyle = useMemo(() => {
        const style: {
            backgroundColor?: string;
            width?: string;
        } = {
            backgroundColor: undefined,
            width: 'bg-lime-700',
        };

        if (
            props.stack.item.durability &&
            props.stack.durability &&
            props.stack.durability !== props.stack.item.durability
        ) {
            const durabilityRatio =
                props.stack.durability / props.stack.item.durability;

            style.backgroundColor = `rgb(${255 - durabilityRatio * 255}, ${
                durabilityRatio * 255
            }, 0)`;

            style.width = `${durabilityRatio * 100}%`;
        }

        return style;
    }, [props.stack.durability]);

    // Methods
    const durabilityDisplayedValue = (stack: ItemStack): string => {
        if (
            stack.item.durability !== undefined &&
            stack.durability !== undefined &&
            stack.durability !== stack.item.durability
        ) {
            return display(stack.durability);
        }

        return '';
    };

    return (
        <Card className='flex justify-between h-16 w-full overflow-clip relative gap-1 p-2'>
            <div className='relative w-12 h-12'>
                <img
                    className='h-full w-full'
                    src={getImageOfItem(props.stack.item)}
                />
                <div className='flex absolute bottom-0 right-0 h-1 w-full justify-center'>
                    <div className='h-1/2 w-1/2 rounded-sm'>
                        <div
                            className='h-full rounded-sm'
                            style={durabilityBarStyle}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-auto flex-row justify-between'>
                <div className='flex flex-col justify-between h-full'>
                    <span className='text-sm text-stone-50'>Durability</span>
                    <span className='text-sm text-stone-500'>
                        {durabilityDisplayedValue(props.stack)}
                    </span>
                </div>

                <div className='flex flex-col justify-between items-end h-full'>
                    <span className='text-sm text-stone-50'>
                        {props.stack.item.displayName}
                    </span>
                    <span className='text-sm text-stone-500'>
                        {display(props.stack.size)}
                    </span>
                    <span className='text-xs text-stone-500'>todo /s</span>
                </div>
            </div>
        </Card>
    );
}

export default InventoryStack;
