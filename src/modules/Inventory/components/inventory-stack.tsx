import { Card } from '@/components/ui/card';
import { getAssetImageUrl } from '@/lib/image.utils.ts';
import { ItemStack } from '@/modules/Inventory/models/inventory-types.ts';

function inventoryStack(props: { stack: ItemStack }) {
    return (
        <Card className='h-8 w-8 overflow-clip relative'>
            <img
                className='h-full w-full'
                src={getAssetImageUrl(props.stack.item.imageName)}
            />
            <span className='absolute bottom-0 right-0'>
                {props.stack.size}
            </span>
        </Card>
    );
}

export default inventoryStack;
