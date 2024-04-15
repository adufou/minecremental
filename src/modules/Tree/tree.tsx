import Chop from "@/modules/Tree/components/chop.tsx";
import {Separator} from "@/components/ui/separator.tsx";

function Tree() {
    return(
        <div className="flex flex-col p-2 gap-1 w-full">
            <Chop />
            <Separator />
        </div>
    )
}

export default Tree