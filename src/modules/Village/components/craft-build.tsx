import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { getImageOfItem } from '@/lib/image.utils.ts';
import { BuildingRecipe } from '@/types/village-types.ts';

function CraftBuilding(props: { buildingRecipe: BuildingRecipe }) {
    return (
        <Card className='flex flex-col items-center gap-2 p-2'>
            <div className='align-middle'>
                <span className='text-lg'>
                    {props.buildingRecipe.building.displayName}
                </span>
            </div>
            <Separator orientation='horizontal' />
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
                            {recipeItem.item.displayName} x{recipeItem.quantity}
                        </span>
                    </div>
                ))}
            </div>
            <Separator orientation='horizontal' />
            <div className='flex flex-row gap-2'>
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
        </Card>
    );
}

export default CraftBuilding;
