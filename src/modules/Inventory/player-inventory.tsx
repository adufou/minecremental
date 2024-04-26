import { Card } from '@/components/ui/card.tsx';
import InventoryStack from '@/modules/Inventory/components/inventory-stack.tsx';
import { useBoundStore } from '@/store/store.ts';

function PlayerInventory() {
    const boundStore = useBoundStore();

    return (
        <div className='flex flex-0 w-64 m-2 ml-0'>
            <Card className='h-full w-full'>
                <div className='flex flex-col p-2 gap-1'>
                    {Object.entries(boundStore.inventory).map(
                        ([key, value]) => {
                            return (
                                <InventoryStack
                                    key={'inv-' + key}
                                    stack={value}
                                />
                            );
                        },
                    )}
                </div>
            </Card>
        </div>
    );
}

export default PlayerInventory;
