import { ForestProvider } from '@/components/providers/engine/Forest/forest-provider.tsx';

type EngineProviderProps = {
    children: React.ReactNode;
};

export function EngineProvider({ children }: EngineProviderProps) {
    return (
        <>
            <ForestProvider>{children}</ForestProvider>
        </>
    );
}
