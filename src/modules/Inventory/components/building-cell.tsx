import { Card } from '@/components/ui/card.tsx';
import { display } from '@/lib/numbers.ts';
import { VillageBuilding } from '@/types/village-types.ts';
import { useMemo } from 'react';

function BuildingCell(props: { building: VillageBuilding }) {
    const perSecond = useMemo(() => {
        return props.building.perSecond
            ? `${display(props.building.perSecond)} /s`
            : '';
    }, [props.building.perSecond]);

    return (
        <Card className='flex justify-between h-16 w-full overflow-clip relative gap-1 p-2'>
            <div className='flex flex-auto flex-row justify-between'>
                <div className='flex flex-col justify-between items-end h-full'>
                    <span className='text-sm text-stone-50'>
                        {props.building.building.displayName}
                    </span>
                    <span className='text-sm text-stone-500'>
                        {display(props.building.quantity)}
                    </span>
                    <span className='text-xs text-stone-500'>{perSecond}</span>
                </div>
            </div>
        </Card>
    );
}

export default BuildingCell;
