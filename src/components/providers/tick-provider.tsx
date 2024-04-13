import {createContext, useContext, useEffect, useState} from "react";

// Set at -1 to not stop
const STOP_AT_TICK: number = 5000;

const AIMED_FPS = 60;
const AIMED_FRAME_DURATION = Math.floor(1000 / AIMED_FPS);
const AIMED_FRAME_PER_TICK = 4;
export const AIMED_TICK_DURATION_IN_MS = AIMED_FRAME_DURATION * AIMED_FRAME_PER_TICK;

type TickProviderProps = {
    children: React.ReactNode
}

type TickProviderState = {
    tick: number
    // nextTick: () => void
}

const initialState: TickProviderState = {
    tick: 0,
    // nextTick: () => null
}

const TickProviderContext = createContext<TickProviderState>(initialState)

export function TickProvider({
    children,
    ...props
}: TickProviderProps) {
    const [tick, setTick] = useState<number>(
        // TODO: GET IT FROM A SAVE ?
        () => initialState.tick
    )

    // TODO: handle when not enough time between 2 ticks (took too long) + warning in console
    useEffect(() => {
        if (STOP_AT_TICK === -1 || tick < STOP_AT_TICK ) {
            setTimeout(() => {
                setTick(tick + 1)
            }, AIMED_TICK_DURATION_IN_MS)
        }
    }, [tick]);

    const value = {
        tick,
        // nextTick: () => {
        //     setTick(tick + 1)
        // }
    }

    return (
        <TickProviderContext.Provider {...props} value={value}>
            {children}
        </TickProviderContext.Provider>
    )
}

export const useTick = () => {
    const context = useContext(TickProviderContext)

    if (context === undefined)
        throw new Error("useTick must be used within a TickProvider")

    return context
}