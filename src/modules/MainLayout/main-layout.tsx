import { Separator } from '@/components/ui/separator.tsx';
import PlayerInventory from '@/modules/Inventory/player-inventory.tsx';
import MainCard from '@/modules/MainLayout/components/main-card.tsx';
import Sidebar from '@/modules/MainLayout/components/sidebar.tsx';
import StatusBar from '@/modules/MainLayout/components/status-bar.tsx';
import Sections from '@/modules/MainLayout/constants/sections.ts';
import { useState } from 'react';

function MainLayout() {
    const [section, setSection] = useState<Sections>(Sections.FOREST);

    return (
        <div className='flex flex-col h-full w-full'>
            <StatusBar />

            <Separator />

            <div className='flex flex-row flex-auto'>
                <Sidebar setSection={setSection} />
                <Separator
                    orientation='vertical'
                    className='h-full'
                />
                <MainCard section={section} />
                <PlayerInventory />
            </div>
        </div>
    );
}

export default MainLayout;
