import { Card } from '@/components/ui/card';
import { ItemStack } from '@/modules/Inventory/models/inventory-types.ts';
import { getImageOfItem } from '@/utils/image.utils.ts';
import { display } from '@/utils/numbers.ts';
import { useMemo } from 'react';

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

    const perSecond = useMemo(() => {
        return props.stack.perSecond
            ? `(${display(props.stack.perSecond)} /s)`
            : '';
    }, [props.stack.perSecond]);

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
            <div className='relative w-12 h-12 flex-shrink-0'>
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

            <div className='flex flex-col justify-between w-full h-full'>
                <div className='flex flex-row justify-between'>
                    <span className='text-sm text-stone-50'>
                        {props.stack.item.displayName}
                    </span>
                    <div className='flex gap-1 items-baseline'>
                        <span className='text-sm text-stone-500'>
                            {display(props.stack.size)}
                        </span>
                        <span className='text-xs text-stone-500'>
                            {perSecond}
                        </span>
                    </div>
                </div>

                <div className='flex flex-row justify-between'>
                    <span className='text-sm text-stone-50'>
                        {props.stack.durability !== undefined
                            ? 'Durability'
                            : ''}
                    </span>
                    <span className='text-sm text-stone-500'>
                        {durabilityDisplayedValue(props.stack)}
                    </span>
                </div>
            </div>
        </Card>
    );
}

export default InventoryStack;
