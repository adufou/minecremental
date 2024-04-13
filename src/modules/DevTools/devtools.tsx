import {AIMED_TICK_DURATION_IN_MS, useTick} from "@/components/providers/tick-provider.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {BASE_CHOP_DURATION_IN_MS} from "@/components/providers/engine/Tree/const.ts";
import {useBoundStore} from "@/store/store.ts";
import {useMemo} from "react";
import {Separator} from "@/components/ui/separator.tsx";

function Devtools() {
    const { firstTick, lastTick, tick } = useTick();

    const boundStore = useBoundStore();

    const nbBlocksInInventory = useMemo(() => {
        let nbBlocks = 0;
        boundStore.inventory.forEach(stack => {
            nbBlocks += stack.size
        })

        return nbBlocks;
    }, [tick])

    const expectedNbBlocksInInventory = useMemo(() => {
        return (AIMED_TICK_DURATION_IN_MS * tick) / BASE_CHOP_DURATION_IN_MS
    }, [tick])

    const diffNbBlocks = useMemo(() => {
        return Math.abs(nbBlocksInInventory - expectedNbBlocksInInventory)
    }, [nbBlocksInInventory, expectedNbBlocksInInventory])

    const diffNbBlocksPercent = useMemo(() => {
        return (diffNbBlocks / expectedNbBlocksInInventory) * 100
    }, [diffNbBlocks, expectedNbBlocksInInventory])

    const elapsedTime = useMemo((): number => {
        // console.log(firstTick?.getTime())
        return lastTick.getTime() - (firstTick?.getTime() ?? 0)
    }, [firstTick, lastTick])

    const expectedElapsedTime = useMemo((): number => {
        return AIMED_TICK_DURATION_IN_MS * tick
    }, [tick])

    const diffElapsedTime = useMemo(() => {
        return Math.abs(elapsedTime - expectedElapsedTime)
    }, [elapsedTime, expectedElapsedTime])

    const diffElapsedTimePercent = useMemo(() => {
        return (diffElapsedTime / expectedElapsedTime) * 100
    }, [diffElapsedTime, expectedElapsedTime])

    return (
        <div className="pl-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant='outline' className='text-red-500'>DEV</Button>
                </PopoverTrigger>
                <PopoverContent className="w-96">
                    <p>Tick : {tick}</p>

                    <Separator/>

                    <p>nbBlocks : {nbBlocksInInventory}</p>
                    <p>expected nbNblocks : {expectedNbBlocksInInventory}</p>
                    <p>diff: {diffNbBlocks}</p>
                    <p>diff (%): {diffNbBlocksPercent}</p>

                    <Separator/>

                    <p>elpased time : {elapsedTime}</p>
                    <p>expected elpased time : {expectedElapsedTime}</p>
                    <p>diff: {diffElapsedTime}</p>
                    <p>diff (%): {diffElapsedTimePercent}</p>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Devtools