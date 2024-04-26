import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion.tsx';
import { Card } from '@/components/ui/card.tsx';
import BuildingCell from '@/modules/Inventory/components/building-cell.tsx';
import InventoryStack from '@/modules/Inventory/components/inventory-stack.tsx';
import { useBoundStore } from '@/store/store.ts';

function PlayerInventory() {
    const boundStore = useBoundStore();

    return (
        <div className='flex flex-0 w-64 m-2 ml-0'>
            <Card className='h-full w-full'>
                <div className='flex flex-col p-2 gap-1'>
                    <Accordion type='multiple'>
                        <AccordionItem value='inventory'>
                            <AccordionTrigger>Inventory</AccordionTrigger>
                            {Object.entries(boundStore.inventory).map(
                                ([key, value]) => {
                                    return (
                                        <AccordionContent key={'inv-' + key}>
                                            <InventoryStack stack={value} />
                                        </AccordionContent>
                                    );
                                },
                            )}
                        </AccordionItem>

                        <AccordionItem value='village'>
                            <AccordionTrigger>Village</AccordionTrigger>
                            {Object.entries(boundStore.village).map(
                                ([key, value]) => {
                                    return (
                                        <AccordionContent key={'inv-' + key}>
                                            <BuildingCell building={value} />
                                        </AccordionContent>
                                    );
                                },
                            )}
                        </AccordionItem>
                    </Accordion>
                </div>
            </Card>
        </div>
    );
}

export default PlayerInventory;
