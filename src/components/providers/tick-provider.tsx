import { createContext, useContext, useEffect, useState } from 'react';
import mainLoop from '@/lib/loop.ts';

type TickProviderProps = {
    children: React.ReactNode;
};

type TickProviderState = {
    firstTick?: Date;
    lastTick?: Date;
    tick: number;
    tickDurationMovingAverage1000: number;
};

const initialState: TickProviderState = {
    firstTick: undefined,
    lastTick: undefined,
    tick: 0,
    tickDurationMovingAverage1000: 0,
};

const TickProviderContext = createContext<TickProviderState>(initialState);

export function TickProvider({ children, ...props }: TickProviderProps) {
    const [firstTick, setFirstTick] = useState<Date | undefined>(
        () => initialState.firstTick,
    );
    const [lastTick, setLastTick] = useState<Date | undefined>(
        () => initialState.lastTick,
    );
    const [tick, setTick] = useState<number>(
        // TODO: GET IT FROM A SAVE ?
        () => initialState.tick,
    );
    const [tickDurationMovingAverage1000, setTickDurationMovingAverage1000] =
        useState<number>(() => initialState.tickDurationMovingAverage1000);

    // TODO: handle when not enough time between 2 ticks (took too long) + warning in console
    useEffect(() => {
        mainLoop(
            setFirstTick,
            setLastTick,
            setTick,
            setTickDurationMovingAverage1000,
        );
    }, []);

    const value = {
        firstTick,
        lastTick,
        tick,
        tickDurationMovingAverage1000,
    };

    return (
        <TickProviderContext.Provider
            {...props}
            value={value}
        >
            {children}
        </TickProviderContext.Provider>
    );
}

export const useTick = () => {
    const context = useContext(TickProviderContext);

    if (context === undefined)
        throw new Error('useTick must be used within a TickProvider');

    return context;
};
