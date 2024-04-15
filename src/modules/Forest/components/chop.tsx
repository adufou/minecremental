import {Button} from "@/components/ui/button.tsx";
import {useBoundStore} from "@/store/store.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Items} from "@/constants/items.ts";

function Chop() {
    const boundStore = useBoundStore();

    const chopTree = () => {
        const nbChopped = boundStore.chopClick();

        if (nbChopped) {
            boundStore.addItemToPlayerInventory({
                item: Items.OAK_LOG,
                number: nbChopped
            })
        }
    }

    return (
        <div className="flex flex-row gap-2">
            <Button onClick={chopTree} className="w-48">Chop</Button>
            <Separator orientation="vertical" />
            <div>
                <p>Progress: {boundStore.chopProgress.toFixed(2)}%</p>
            </div>
        </div>
    )
}

export default Chop