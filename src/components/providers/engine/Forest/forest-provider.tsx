import { createContext, useContext } from 'react';

type TreeProviderProps = {
    children: React.ReactNode;
};

// TODO: c'est null parce que je sais pas si je partage ici ou via le store finalemetn
const TreeProviderContext = createContext(null);

export function ForestProvider({ children, ...props }: TreeProviderProps) {
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
