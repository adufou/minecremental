import { Separator } from '@/components/ui/separator.tsx';
import BuildingsRecipes from '@/constants/buildings-recipes.ts';
import CraftBuild from '@/modules/Village/components/craft-build.tsx';
import { useBoundStore } from '@/store/store.ts';
import { display } from '@/utils/numbers.ts';

function Village() {
    const boundStore = useBoundStore();

    return (
        <div className='flex flex-col w-full h-full gap-2 p-2'>
            <div>
                <span className='text-xl'>
                    {display(boundStore.villagers)} villager
                </span>
            </div>
            <Separator />
            <div className='grid grid-cols-2 gap-2 w-full'>
                <CraftBuild buildingRecipe={BuildingsRecipes.OAK_HOUSE} />
            </div>
        </div>
    );
}

export default Village;
