import {Button} from "@/components/ui/button.tsx";
import {useBoundStore} from "@/store/store.ts";
import {Items} from "@/constants/items.ts";
import {Separator} from "@/components/ui/separator.tsx";

function Chop() {
    const boundStore = useBoundStore();

    const chopTree = () => {
        boundStore.addItemToPlayerInventory({item :Items.OAK_LOG, number: 64})
    }

    return (
        <div className="flex flex-row gap-2">
            <Button onClick={chopTree} className="w-48">Chop</Button>
            <Separator orientation="vertical" />
            <div>
                <span>Progress: {(boundStore.chopProgress * 100).toFixed(2)}%</span>
            </div>
        </div>
    )
}

export default Chop