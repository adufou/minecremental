import { BuildingRecipe } from '@/types/village-types.ts';
import { Card } from '@/components/ui/card.tsx';
import { getImageOfItem } from '@/lib/image.utils.ts';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';

function CraftBuilding(props: { buildingRecipe: BuildingRecipe }) {
    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row items-center gap-2'>
                <div className='w-32'>
                    <span>{props.buildingRecipe.building.displayName}</span>
                </div>
                <Separator orientation='vertical' />
                <div className='flex flex-row flex-auto flex-wrap gap-2'>
                    {props.buildingRecipe.ingredients.map((recipeItem) => (
                        <div
                            key={
                                props.buildingRecipe.building.name +
                                '-' +
                                recipeItem.item.name
                            }
                            className='flex flex-row items-center gap-1'
                        >
                            <Card className='h-8 w-8 overflow-clip p-1'>
                                <img
                                    className='h-full w-full'
                                    src={getImageOfItem(recipeItem.item)}
                                />
                            </Card>
                            <span>
                                {recipeItem.item.displayName} x
                                {recipeItem.quantity}
                            </span>
                        </div>
                    ))}
                </div>
                <Separator orientation='vertical' />
                <Button
                    className='h-8'
                    onClick={undefined}
                >
                    Craft
                </Button>
                <Button
                    className='h-8'
                    onClick={undefined}
                >
                    Craft All
                </Button>
            </div>
        </div>
    );
}

export default CraftBuilding;
