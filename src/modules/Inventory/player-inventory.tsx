import {Card} from "@/components/ui/card.tsx";
import {useBoundStore} from "@/store/store.ts";
import {getItemImageUrl} from "@/lib/image.utils.ts";

function PlayerInventory() {
    const boundStore = useBoundStore();

    return (
        <div className="flex flex-0 w-96 m-2 ml-0">
            <Card className="flex flex-auto">
                {boundStore.inventory.map((stack, index) => {
                        console.log(stack)
                        return (
                            <div key={'inv-' + index}>
                                <img src={getItemImageUrl(stack.item.imageName)}/>
                                {stack.size}x {stack.item.name}
                            </div>
                        )
                    }
                )}
            </Card>
        </div>
    )
}

export default PlayerInventory