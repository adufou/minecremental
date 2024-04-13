import {Card} from "@/components/ui/card.tsx";
import Tree from "@/modules/Tree/tree";

function MainCard() {
    return(
        <div className="flex flex-auto m-2">
            <Card className="flex flex-auto">
                <Tree />
            </Card>
        </div>
    )
}

export default MainCard