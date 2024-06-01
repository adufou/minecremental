import { Separator } from '@/components/ui/separator.tsx';
import MineDepth from '@/modules/Mine/components/mine-depth.tsx';

function Mine() {
    return (
        <div className='flex flex-col p-2 gap-2 w-full h-full'>
            <MineDepth depth={0} />
            <Separator />
        </div>
    );
}

export default Mine;
