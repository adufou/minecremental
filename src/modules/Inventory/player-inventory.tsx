import { Card } from '@/components/ui/card.tsx';
import { useBoundStore } from '@/store/store.ts';
import InventoryStack from '@/modules/Inventory/components/inventory-stack.tsx';

function PlayerInventory() {
    const boundStore = useBoundStore();

    return (
        <div className='flex flex-0 w-64 m-2 ml-0'>
            <Card className='h-full w-full'>
                <div className='flex flex-col p-2 gap-1'>
                    {[...boundStore.inventory.values()].map((stack, index) => {
                        return (
                            <InventoryStack
                                key={'inv-' + index}
                                stack={stack}
                            />
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}

export default PlayerInventory;
