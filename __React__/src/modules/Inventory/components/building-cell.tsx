import { Card } from '@/components/ui/card.tsx';
import { VillageBuilding } from '@/types/village-types.ts';
import { display } from '@/utils/numbers.ts';
import { useMemo } from 'react';

function BuildingCell(props: { building: VillageBuilding }) {
    const perSecond = useMemo(() => {
        return props.building.perSecond
            ? `${display(props.building.perSecond)} /s`
            : '';
    }, [props.building.perSecond]);

    return (
        <Card className='flex justify-between h-16 w-full overflow-clip relative gap-1 p-2'>
            <div className='flex flex-row justify-between items-center w-full h-full'>
                <span className='text-lg text-stone-50'>
                    {props.building.building.displayName}
                </span>
                <span className='text-sm text-stone-500'>
                    {display(props.building.quantity)}
                </span>
                <span className='text-xs text-stone-500'>{perSecond}</span>
            </div>
        </Card>
    );
}

export default BuildingCell;
