import { TickFunction } from '@/types/tick-function.ts';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

// Create a context to hold the game state and the pool of tick functions
type TickProviderProps = {
    children: React.ReactNode;
};

type TickProviderState = {
    addTickFunction: (callback: TickFunction) => void;
    removeTickFunction: (callback: TickFunction) => void;
};

const initialState: TickProviderState = {
    addTickFunction: () => {},
    removeTickFunction: () => {},
};

const TickProviderContext = createContext<TickProviderState>(initialState);

// Provide the context to components
export function TickProvider({ children, ...props }: TickProviderProps) {
    const [tickFunctions, setTickFunctions] = useState<TickFunction[]>([]);

    const addTickFunction = useCallback((callback: TickFunction) => {
        setTickFunctions((prev) => [...prev, callback]);
    }, []);

    const removeTickFunction = useCallback((callback: TickFunction) => {
        setTickFunctions((prev) => prev.filter((f) => f !== callback));
    }, []);

    // Set up the game loop
    useEffect(() => {
        const gameLoop = (lastTick?: Date) => {
            const now = new Date();

            if (lastTick) {
                const elapsedTime = now.getTime() - lastTick.getTime();

                tickFunctions.forEach((callback) => callback(elapsedTime));
            }
            requestAnimationFrame(() => gameLoop(now));
        };

        gameLoop();
    }, [tickFunctions]);

    return (
        <TickProviderContext.Provider
            {...props}
            value={{ addTickFunction, removeTickFunction }}
        >
            {children}
        </TickProviderContext.Provider>
    );
}

// Custom hook to allow components to register their own tick functions
export function useTick(callback: TickFunction) {
    const context = useContext(TickProviderContext);

    if (context === undefined) {
        throw new Error('useTick must be used within a TickProvider');
    }

    const { addTickFunction, removeTickFunction } = context;

    useEffect(() => {
        addTickFunction(callback);
        return () => removeTickFunction(callback);
    }, []);
}
