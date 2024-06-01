import { useTick } from '@/components/providers/tick-provider.tsx';
import { useBoundStore } from '@/store/store.ts';
import { createContext, useContext } from 'react';

type MineProviderProps = {
    children: React.ReactNode;
};

// TODO: c'est null parce que je sais pas si je partage ici ou via le store finalemetn
// Est-ce qu'on a meme besoin de ce provider? Un composant ne suffirait ps ? Si on a rien a partager, on a pas besoin de provider
const MineProviderContext = createContext(null);

export function MineProvider({ children, ...props }: MineProviderProps) {
    const boundStore = useBoundStore();

    useTick((elapsedTime) => {
        boundStore.mineByVillager(elapsedTime, 0);
    });

    return (
        <MineProviderContext.Provider
            {...props}
            value={null}
        >
            {children}
        </MineProviderContext.Provider>
    );
}

export const useMine = () => {
    const context = useContext(MineProviderContext);

    if (context === undefined) {
        throw new Error('useTree must be used within a ForestProvider');
    }

    return context;
};
