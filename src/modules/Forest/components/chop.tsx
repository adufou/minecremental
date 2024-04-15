import { useBoundStore } from '@/store/store.ts';
import { Separator } from '@/components/ui/separator.tsx';
import { Items } from '@/constants/items.ts';
import ProgressButton from '@/components/ui/progress-button.tsx';

function Chop() {
    const boundStore = useBoundStore();

    const chopTree = () => {
        const nbChopped = boundStore.chopClick();

        if (nbChopped) {
            boundStore.addItemToPlayerInventory({
                item: Items.OAK_LOG,
                number: nbChopped,
            });
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 h-11'>
                <ProgressButton
                    onClick={chopTree}
                    progress={boundStore.chopProgress}
                >
                    Chop
                </ProgressButton>
                <Separator orientation='vertical' />
                <div className='flex flex-col items-end w-24 '>
                    <p>{boundStore.chopProgress.toFixed(2)}%</p>
                </div>
            </div>
        </div>
    );
}

export default Chop;
