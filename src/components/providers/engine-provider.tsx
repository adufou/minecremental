import {TreeProvider} from "@/components/providers/engine/Tree/tree-provider.tsx";

type EngineProviderProps = {
    children: React.ReactNode
}

export function EngineProvider({
    children,
}: EngineProviderProps) {
    return (
        <>
            <TreeProvider>
                {children}
            </TreeProvider>
        </>
    )
}