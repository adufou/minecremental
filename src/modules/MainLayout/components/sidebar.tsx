import { Button } from '@/components/ui/button.tsx';
import Sections from '@/modules/MainLayout/constants/sections.ts';

type SidebarProps = {
    setSection: (section: Sections) => void;
};

function Sidebar({ ...props }: SidebarProps) {
    return (
        <div className='flex flex-col w-64 flex-none m-2 gap-2'>
            <Button
                className='w-full'
                onClick={() => props.setSection(Sections.FOREST)}
            >
                Forest
            </Button>
            <Button
                className='w-full'
                onClick={() => props.setSection(Sections.VILLAGE)}
            >
                Village
            </Button>
        </div>
    );
}

export default Sidebar;
