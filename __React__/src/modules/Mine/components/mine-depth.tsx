import ProgressButton from '@/components/ui/progress-button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { useBoundStore } from '@/store/store.ts';

function MineDepth(props: { depth: number }) {
    const boundStore = useBoundStore();

    const mineAtDepth = () => {
        boundStore.mineByClick(props.depth);
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 h-11'>
                <span>Depth: {props.depth}</span>
                <Separator orientation='vertical' />
                <ProgressButton
                    onClick={mineAtDepth}
                    progress={boundStore.mineProgress}
                >
                    Mine
                </ProgressButton>
                <Separator orientation='vertical' />
                <div className='flex flex-col items-end w-24 '>
                    <p>{boundStore.mineProgress.toFixed(2)}%</p>
                </div>
            </div>
        </div>
    );
}

export default MineDepth;
