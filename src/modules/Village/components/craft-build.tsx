import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Item } from '@/constants/items.ts';
import { getImageOfItem } from '@/lib/image.utils.ts';
import { useBoundStore } from '@/store/store.ts';
import { BuildingRecipe } from '@/types/village-types.ts';

function CraftBuild(props: { buildingRecipe: BuildingRecipe }) {
    const boundStore = useBoundStore();

    const craftBuilding = () => {
        for (const recipeItem of props.buildingRecipe.ingredients) {
            if (
                !boundStore.hasEnoughOfItemInInventory(
                    recipeItem.item,
                    recipeItem.quantity,
                )
            ) {
                return false;
            }
        }

        for (const recipeItem of props.buildingRecipe.ingredients) {
            boundStore.removeItemFromPlayerInventory({
                item: recipeItem.item,
                quantity: recipeItem.quantity,
            });
        }

        boundStore.addBuildingToVillage({
            building: props.buildingRecipe.building,
            quantity: props.buildingRecipe.quantity,
        });
    };

    const craftAllItems = () => {
        const ingredients: {
            item: Item;
            recipeQuantity: number;
            inventoryQuantity: number;
        }[] = [];

        for (const recipeItem of props.buildingRecipe.ingredients) {
            const itemInInventory = boundStore.inventory[recipeItem.item.name];

            // If we don't have enough of the item in the inventory, we can't craft
            if (itemInInventory === undefined || itemInInventory.size === 0) {
                return;
            }

            ingredients.push({
                item: itemInInventory.item,
                recipeQuantity: recipeItem.quantity,
                inventoryQuantity: itemInInventory.size,
            });
        }

        const nbCraftableItems = Math.min(
            ...ingredients.map((i) => {
                return Math.floor(i.inventoryQuantity / i.recipeQuantity);
            }),
        );

        if (nbCraftableItems === 0) {
            return;
        }

        for (const ingredient of ingredients) {
            boundStore.removeItemFromPlayerInventory({
                item: ingredient.item,
                quantity: ingredient.recipeQuantity * nbCraftableItems,
            });
        }

        boundStore.addBuildingToVillage({
            building: props.buildingRecipe.building,
            quantity: props.buildingRecipe.quantity * nbCraftableItems,
        });
    };

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
                    onClick={craftBuilding}
                >
                    Craft
                </Button>
                <Button
                    className='h-8'
                    onClick={craftAllItems}
                >
                    Craft All
                </Button>
            </div>
        </Card>
    );
}

export default CraftBuild;
