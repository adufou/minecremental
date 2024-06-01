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
import { useState } from 'react';

type Accordions = 'inventory' | 'village';

function PlayerInventory() {
    const boundStore = useBoundStore();

    const [activeAccordions, setActiveAccordions] = useState<Accordions[]>([
        'inventory',
        'village',
    ]);

    const toggleAccordion = (accordion: Accordions) => {
        if (activeAccordions.includes(accordion)) {
            setActiveAccordions(
                activeAccordions.filter((a) => a !== accordion),
            );
        } else {
            setActiveAccordions([...activeAccordions, accordion]);
        }
    };

    return (
        <div className='flex flex-shrink-0 w-64 m-2 ml-0'>
            <Card className='h-full w-full'>
                <div className='flex flex-col p-2 gap-1'>
                    <Accordion
                        type='multiple'
                        value={activeAccordions}
                    >
                        <AccordionItem value='inventory'>
                            <AccordionTrigger
                                onClick={() => toggleAccordion('inventory')}
                            >
                                Inventory
                            </AccordionTrigger>
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
                            <AccordionTrigger
                                onClick={() => toggleAccordion('village')}
                            >
                                Village
                            </AccordionTrigger>
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
