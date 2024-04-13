import {createContext, useContext, useEffect} from "react";
import {useBoundStore} from "@/store/store.ts";
import {useTick} from "@/components/providers/tick-provider.tsx";
import {Items} from "@/constants/items.ts";

type TreeProviderProps = {
    children: React.ReactNode
}

// TODO: c'est null parce que je sais pas si je partage ici ou via le store finalemetn
const TreeProviderContext = createContext(null)

export function TreeProvider({
    children,
    ...props
}: TreeProviderProps) {
    const boundStore = useBoundStore();
    const { tick } = useTick()

    useEffect(() => {
        const {nbChopped} = boundStore.chop();
        boundStore.addItemToPlayerInventory({
            item: Items.OAK_LOG,
            number: nbChopped,
        })
    }, [tick]);

    return(
        <TreeProviderContext.Provider {...props} value={null}>
            {children}
        </TreeProviderContext.Provider>
    )
}

export const useTree = () => {
    const context = useContext(TreeProviderContext)

    if (context === undefined)
        throw new Error("useTree must be used within a TreeProvider")

    return context
}