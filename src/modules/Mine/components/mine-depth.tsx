import ProgressButton from '@/components/ui/progress-button.tsx';
import { Separator } from '@/components/ui/separator.tsx';

function MineDepth(props: { depth: number }) {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 h-11'>
                <span>Depth: {props.depth}</span>
                <Separator orientation='vertical' />
                <ProgressButton
                    onClick={undefined}
                    progress={50}
                >
                    Mine
                </ProgressButton>
                <Separator orientation='vertical' />
                <div className='flex flex-col items-end w-24 '>
                    <p>{(50).toFixed(2)}%</p>
                </div>
            </div>
        </div>
    );
}

export default MineDepth;
