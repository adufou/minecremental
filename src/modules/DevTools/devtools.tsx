import { useTick } from '@/components/providers/tick-provider.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { useMemo, useState } from 'react';

function Devtools() {
    const [lastTickDuration, setLastTickDuration] = useState<number>(0);

    const fps = useMemo(() => {
        return Math.floor(1000 / lastTickDuration);
    }, [lastTickDuration]);

    useTick((elapsedTime: number) => {
        setLastTickDuration(elapsedTime);
    });

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
                    <p>FPS: {fps}</p>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default Devtools;
