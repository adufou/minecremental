import {Button} from "@/components/ui/button.tsx";
import {useBoundStore} from "@/store/store.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {useMemo} from "react";
import {displayTime} from "@/lib/time.ts";

function Chop() {
    const boundStore = useBoundStore();

    const chopRemainingDuration = useMemo(() => {
        if (boundStore.chopActivationEnd !== undefined) {
            return displayTime(boundStore.chopActivationEnd.getTime() - Date.now())
        }

        return 0;
    }, [() => boundStore.chopActivationEnd])

    const chopTree = () => {
        boundStore.chopActivate()
    }

    return (
        <div className="flex flex-row gap-2">
            <Button onClick={chopTree} className="w-48">Chop</Button>
            <Separator orientation="vertical" />
            <div>
                <p>Progress: {(boundStore.chopProgress * 100).toFixed(2)}%</p>
                <p>Duration: {chopRemainingDuration}</p>
            </div>
        </div>
    )
}

export default Chop