import {Button} from "@/components/ui/button.tsx";
import {useBoundStore} from "@/store/store.ts";

function Tree() {
    const boundStore = useBoundStore();

    const chopTree = () => {
        boundStore.addItem('Log')
    }

    return(
        <>
            <Button onClick={chopTree}>Chop</Button>
        </>
    )
}

export default Tree