import { useTick } from '@/components/providers/tick-provider.tsx';
import { Items } from '@/constants/items.ts';
import { useBoundStore } from '@/store/store.ts';
import { createContext, useContext } from 'react';

type TreeProviderProps = {
    children: React.ReactNode;
};

// TODO: c'est null parce que je sais pas si je partage ici ou via le store finalemetn
// Est-ce qu'on a meme besoin de ce provider? Un composant ne suffirait ps ? Si on a rien a partager, on a pas besoin de provider
const TreeProviderContext = createContext(null);

export function ForestProvider({ children, ...props }: TreeProviderProps) {
    const boundStore = useBoundStore();

    useTick((elapsedTime) => {
        boundStore.chopByVillager(elapsedTime, Items.OAK_LOG);
    });

    return (
        <TreeProviderContext.Provider
            {...props}
            value={null}
        >
            {children}
        </TreeProviderContext.Provider>
    );
}

export const useTree = () => {
    const context = useContext(TreeProviderContext);

    if (context === undefined) {
        throw new Error('useTree must be used within a ForestProvider');
    }

    return context;
};
