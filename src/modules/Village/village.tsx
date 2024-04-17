import { useBoundStore } from '@/store/store.ts';
import { Slider } from '@/components/ui/slider.tsx';

function Village() {
    const boundStore = useBoundStore();

    return (
        <div className='p-2'>
            <span>{boundStore.villagers} villager</span>
            <br />
            <span>WIP: this slider is for dev and cheat purpose</span>
            <Slider
                max={100}
                onValueChange={(value: number[]) => {
                    boundStore.villagers = value[0];
                }}
                step={1}
                value={[boundStore.villagers]}
            ></Slider>
        </div>
    );
}

export default Village;
