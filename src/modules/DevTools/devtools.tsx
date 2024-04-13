import {useTick} from "@/components/providers/tick-provider.tsx";

function Devtools() {
    const { tick } = useTick();

    return (
        <div className="pl-2">
            <span className='text-red-500 h-4'>
                Tick : {tick}
            </span>
        </div>
    )
}

export default Devtools