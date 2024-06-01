import { ForestProvider } from '@/components/providers/engine/Forest/forest-provider.tsx';
import { MineProvider } from '@/components/providers/engine/Mine/mine-provider.tsx';
import { VillageProvider } from '@/components/providers/engine/Village/village-provider.tsx';

type EngineProviderProps = {
    children: React.ReactNode;
};

export function EngineProvider({ children }: EngineProviderProps) {
    return (
        <>
            <VillageProvider>
                <MineProvider>
                    <ForestProvider>{children}</ForestProvider>
                </MineProvider>
            </VillageProvider>
        </>
    );
}
