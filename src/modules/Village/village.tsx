import { useBoundStore } from '@/store/store.ts';
import { Slider } from '@/components/ui/slider.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import CraftBuild from '@/modules/Village/components/craft-build.tsx';
import BuildingsRecipes from '@/constants/buildings-recipes.ts';

function Village() {
    const boundStore = useBoundStore();

    return (
        <div className='flex flex-col w-full h-full gap-2 p-2'>
            <div>
                <span>{boundStore.villagers} villager</span>
                <br />
                <Slider
                    max={1000}
                    onValueChange={(value: number[]) => {
                        boundStore.villagers = value[0];
                    }}
                    step={1}
                    value={[boundStore.villagers]}
                />
                <span>WIP: this slider is for dev and cheat purpose</span>
            </div>
            <Separator />
            <CraftBuild buildingRecipe={BuildingsRecipes.OAK_HOUSE} />
        </div>
    );
}

export default Village;
