import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Item } from '@/constants/items.ts';
import { getImageOfItem } from '@/lib/image.utils.ts';
import { useBoundStore } from '@/store/store.ts';
import ItemRecipe from '@/types/item-recipe.ts';

function CraftItem(props: { itemRecipe: ItemRecipe }) {
    const boundStore = useBoundStore();

    const craftItem = () => {
        for (const recipeItem of props.itemRecipe.ingredients) {
            if (
                !boundStore.hasEnoughOfItemInInventory(
                    recipeItem.item,
                    recipeItem.quantity,
                )
            ) {
                return false;
            }
        }

        for (const recipeItem of props.itemRecipe.ingredients) {
            boundStore.removeItemFromPlayerInventory({
                item: recipeItem.item,
                quantity: recipeItem.quantity,
            });
        }

        boundStore.addItemToPlayerInventory({
            item: props.itemRecipe.item,
            quantity: props.itemRecipe.quantity,
        });
    };

    const craftAllItems = () => {
        const ingredients: {
            item: Item;
            recipeQuantity: number;
            inventoryQuantity: number;
        }[] = [];

        for (const recipeItem of props.itemRecipe.ingredients) {
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

        boundStore.addItemToPlayerInventory({
            item: props.itemRecipe.item,
            quantity: props.itemRecipe.quantity * nbCraftableItems,
        });
    };

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between items-center gap-2'>
                <div className='relative'>
                    <Card className='h-16 w-16 overflow-hidden p-1'>
                        <img
                            className='h-full w-full'
                            src={getImageOfItem(props.itemRecipe.item)}
                        />
                    </Card>
                    <span className='absolute bottom-1 right-1'>
                        x{props.itemRecipe.quantity}
                    </span>
                </div>
                <Separator orientation='vertical' />
                <div className='flex flex-row w-full flex-wrap gap-2'>
                    {props.itemRecipe.ingredients.map((recipeItem) => (
                        <div
                            key={
                                props.itemRecipe.item.name +
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
                    onClick={craftItem}
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
        </div>
    );
}

export default CraftItem;
