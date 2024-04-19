import Chop from '@/modules/Forest/components/chop.tsx';
import { Separator } from '@/components/ui/separator.tsx';

function Forest() {
    return (
        <div className='flex flex-col p-2 gap-2 w-full h-full'>
            <Chop />
            <Separator />
        </div>
    );
}

export default Forest;
