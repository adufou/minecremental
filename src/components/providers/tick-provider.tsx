import {createContext, useContext, useEffect, useState} from "react";

// Set at -1 to not stop
export const STOP_AT_TICK: number = 5000;

const AIMED_FPS = 60;
const AIMED_FRAME_DURATION = 1000 / AIMED_FPS;
const AIMED_FRAME_PER_TICK = 1;
export const AIMED_TICK_DURATION_IN_MS = AIMED_FRAME_DURATION * AIMED_FRAME_PER_TICK;

type TickProviderProps = {
    children: React.ReactNode
}

type TickProviderState = {
    firstTick?: Date
    lastTick: Date
    tick: number
    tickDurationMovingAverage100: number
    // nextTick: () => void
}

const initialState: TickProviderState = {
    firstTick: undefined,
    lastTick: new Date(),
    tick: 0,
    tickDurationMovingAverage100: AIMED_TICK_DURATION_IN_MS
    // nextTick: () => null
}

const TickProviderContext = createContext<TickProviderState>(initialState)

export function TickProvider({
    children,
    ...props
}: TickProviderProps) {
    const [firstTick, setFirstTick] = useState<Date | undefined>(
        () => initialState.firstTick
    )
    const [lastTick, setLastTick] = useState<Date>(
        () => initialState.lastTick
    )
    const [tick, setTick] = useState<number>(
        // TODO: GET IT FROM A SAVE ?
        () => initialState.tick
    )
    const [tickDurationMovingAverage100, setTickDurationMovingAverage100] = useState<number>(
        () => initialState.tickDurationMovingAverage100
    )

    // TODO: handle when not enough time between 2 ticks (took too long) + warning in console
    useEffect(() => {
        // console.log('aimed tick duration', AIMED_TICK_DURATION_IN_MS)

        const setTickOnFrame = () => {
            setTick(tick + 1)

            const now = new Date();
            const elapsed = now.getTime() - lastTick.getTime();

            if (!firstTick) {
                setFirstTick(now)
            }
            setLastTick(now)
            setTickDurationMovingAverage100((tickDurationMovingAverage100 * 99 + elapsed) / 100)
        }

        if (STOP_AT_TICK === -1 || tick < STOP_AT_TICK ) {
            setTimeout(() => {
                requestAnimationFrame(setTickOnFrame)
            }, AIMED_TICK_DURATION_IN_MS / 2)
        }
    }, [tick]);

    const value = {
        firstTick,
        lastTick,
        tick,
        tickDurationMovingAverage100,
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