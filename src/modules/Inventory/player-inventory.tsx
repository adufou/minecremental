import {Card} from "@/components/ui/card.tsx";
import {useBoundStore} from "@/store/store.ts";

function PlayerInventory() {
    const boundStore = useBoundStore();

    return (
        <div className="flex flex-0 w-96 m-2 ml-0">
            <Card className="flex flex-auto">
                {boundStore.inventory.map((stack) => {
                        console.log(stack)
                        return (<div>{stack.size}x {stack.item.name}</div>)
                    }
                )}
            </Card>
        </div>
    )
}

export default PlayerInventory