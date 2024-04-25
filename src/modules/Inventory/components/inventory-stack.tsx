import { Card } from '@/components/ui/card';
import { getImageOfItem } from '@/lib/image.utils.ts';
import { ItemStack } from '@/modules/Inventory/models/inventory-types.ts';
import { useMemo, useState } from 'react';
import { display } from '@/lib/numbers.ts';
import { useTick } from '@/components/providers/tick-provider.tsx';

function InventoryStack(props: { stack: ItemStack }) {
    const [lastTickDuration, setLastTickDuration] = useState<number>(0);
    const [gain, setGain] = useState<number>(0);
    const [gainSmoothed, setGainSmoothed] = useState<number>(0);
    const [lastSize, setLastSize] = useState<number>(0);

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

    // Auto get gains when the stack size changes
    useMemo(() => {
        if (lastTickDuration !== 0) {
            const tickGain =
                (props.stack.size - lastSize) / (lastTickDuration / 1000);

            if (
                tickGain !== gain ||
                (tickGain === 0 && props.stack.size === 0)
            ) {
                // Try to smooth this out a bit
                setGain(tickGain);
                setGainSmoothed((tickGain + gain * 99) / 100);
            }

            setLastSize(props.stack.size);
        }

        return gain;
    }, [lastSize, props.stack.size]);

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

    useTick((elapsedTime: number) => {
        setLastTickDuration(elapsedTime);
    });

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
                    <span className='text-xs text-stone-500'>
                        {display(gainSmoothed)} /s
                    </span>
                </div>
            </div>
        </Card>
    );
}

export default InventoryStack;
