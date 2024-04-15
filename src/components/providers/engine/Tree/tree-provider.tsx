import {createContext, useContext, useEffect, useMemo} from "react";
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
    const { tick, tickDurationMovingAverage1000 } = useTick()

    const estimatedChopPerTick = useMemo(() => {
        return tickDurationMovingAverage1000 / boundStore.chopDurationInMs;
    }, [tickDurationMovingAverage1000, boundStore.chopDurationInMs])

    useEffect(() => {
        const {nbChopped} = boundStore.chop(estimatedChopPerTick);
        // console.log(estimatedChopPerTick)
        if (nbChopped > 0) {
            // console.timeEnd('chop')
            // console.log('chopped', nbChopped)
            // console.time('chop')
            boundStore.addItemToPlayerInventory({
                item: Items.OAK_LOG,
                number: nbChopped,
            })
        }
    }, [estimatedChopPerTick, tick]);

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