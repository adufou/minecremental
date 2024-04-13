import {Button} from "@/components/ui/button.tsx";
import {useBoundStore} from "@/store/store.ts";
import {Items} from "@/constants/items.ts";

function Tree() {
    const boundStore = useBoundStore();

    const chopTree = () => {
        boundStore.addItemToPlayerInventory(Items.LOG)
    }

    return(
        <>
            <Button onClick={chopTree}>Chop</Button>
        </>
    )
}

export default Tree