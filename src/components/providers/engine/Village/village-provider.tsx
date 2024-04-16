import { createContext, useContext } from 'react';

type VillageProviderProps = {
    children: React.ReactNode;
};

// TODO: c'est null parce que je sais pas si je partage ici ou via le store finalemetn
// Est-ce qu'on a meme besoin de ce provider? Un composant ne suffirait ps ? Si on a rien a partager, on a pas besoin de provider
const VillageProviderContext = createContext(null);

export function VillageProvider({ children, ...props }: VillageProviderProps) {
    return (
        <VillageProviderContext.Provider
            {...props}
            value={null}
        >
            {children}
        </VillageProviderContext.Provider>
    );
}

export const useVillage = () => {
    const context = useContext(VillageProviderContext);

    if (context === undefined) {
        throw new Error('useVillage must be used within a VillageProvider');
    }

    return context;
};
