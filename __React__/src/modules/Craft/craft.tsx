import { Separator } from '@/components/ui/separator.tsx';
import ItemsRecipes from '@/constants/items-recipes.ts';
import CraftItem from '@/modules/Craft/components/craft-item.tsx';

function Craft() {
    return (
        <div className='flex flex-col w-full h-full p-2 gap-2'>
            {Object.entries(ItemsRecipes).map(([key, value]) => (
                <div
                    className='flex flex-col gap-2'
                    key={key}
                >
                    <CraftItem itemRecipe={value} />
                    <Separator />
                </div>
            ))}
        </div>
    );
}

export default Craft;
