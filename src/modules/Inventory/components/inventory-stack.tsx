import { Card } from "@/components/ui/card";
import {getItemImageUrl} from "@/lib/image.utils.ts";

function inventoryStack(props: {stack: ItemStack}) {
    return(
            <Card className="h-8 w-8 overflow-clip relative" >
                <img
                    className="h-full w-full"
                    src={getItemImageUrl(props.stack.item.imageName)}
                />
                <span className="absolute bottom-0 right-0">{props.stack.size}</span>
            </Card>
    )
}

export default inventoryStack