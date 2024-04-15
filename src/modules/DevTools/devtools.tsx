import { useTick } from '@/components/providers/tick-provider.tsx';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useBoundStore } from '@/store/store.ts';
import { useMemo } from 'react';
import { Separator } from '@/components/ui/separator.tsx';

function Devtools() {
    const { firstTick, lastTick, tick, tickDurationMovingAverage1000 } =
        useTick();

    const boundStore = useBoundStore();

    // --- Global ---
    const tickNumber = useMemo((): number => {
        return tick;
    }, [tick]);

    const elapsedTime = useMemo((): number => {
        // console.log(firstTick?.getTime())
        return (lastTick?.getTime() ?? 0) - (firstTick?.getTime() ?? 0);
    }, [firstTick, lastTick]);

    const tickMA1000 = useMemo((): number => {
        return tickDurationMovingAverage1000;
    }, [tickDurationMovingAverage1000]);

    // --- Specific ---
    const nbBlocksInInventory = useMemo(() => {
        let nbBlocks = 0;
        boundStore.inventory.forEach((stack) => {
            nbBlocks += stack.size;
        });

        return nbBlocks;
    }, [tick]);

    return (
        <div className='pl-2'>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        className='text-red-500'
                    >
                        DEV
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-96'>
                    <p>Tick : {tickNumber}</p>

                    <Separator />

                    <p>elpased time : {elapsedTime}</p>
                    <p>tickMA1000 : {tickMA1000}</p>

                    <Separator />

                    <p>nbBlocks : {nbBlocksInInventory}</p>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default Devtools;
