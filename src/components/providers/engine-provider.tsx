import { ForestProvider } from '@/components/providers/engine/Forest/forest-provider.tsx';
import { VillageProvider } from '@/components/providers/engine/Village/village-provider.tsx';

type EngineProviderProps = {
    children: React.ReactNode;
};

export function EngineProvider({ children }: EngineProviderProps) {
    return (
        <>
            <VillageProvider>
                <ForestProvider>{children}</ForestProvider>
            </VillageProvider>
        </>
    );
}
