import CraftItem from '@/modules/Craft/components/craft-item.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import ItemsRecipes from '@/constants/items-recipes.ts';

function Craft() {
    return (
        <div className='flex flex-col w-full h-full p-2 gap-2'>
            <CraftItem itemRecipe={ItemsRecipes.OAK_PLANKS} />
            <Separator />
            <CraftItem itemRecipe={ItemsRecipes.STICK} />
            <Separator />
            <CraftItem itemRecipe={ItemsRecipes.WOODEN_AXE} />
            <Separator />
        </div>
    );
}

export default Craft;
