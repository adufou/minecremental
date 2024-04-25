import { BuildingRecipe } from '@/types/village-types.ts';
import { Card } from '@/components/ui/card.tsx';
import { getImageOfItem } from '@/lib/image.utils.ts';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';

function CraftBuilding(props: { buildingRecipe: BuildingRecipe }) {
    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between items-center gap-2'>
                <div className='relative'>
                    <Card className='h-16 w-16 overflow-hidden p-1'>
                        {/*<img*/}
                        {/*    className='h-full w-full'*/}
                        {/*    src={getImageOfItem(props.buildingRecipe.building)}*/}
                        {/*/>*/}
                    </Card>
                    <span className='absolute bottom-1 right-1'>
                        x{props.buildingRecipe.quantity}
                    </span>
                </div>
                <Separator orientation='vertical' />
                <div className='flex flex-row w-full flex-wrap'>
                    {props.buildingRecipe.ingredients.map((recipeItem) => (
                        <div
                            key={
                                props.buildingRecipe.building.name +
                                '-' +
                                recipeItem.item.name
                            }
                            className='flex flex-row gap-2'
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
