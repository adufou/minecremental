import { Card } from '@/components/ui/card.tsx';
import Craft from '@/modules/Craft/craft.tsx';
import Forest from '@/modules/Forest/forest.tsx';
import Sections from '@/modules/MainLayout/constants/sections.ts';
import Mine from '@/modules/Mine/mine.tsx';
import Village from '@/modules/Village/village.tsx';

type MainCardProps = {
    section: Sections;
};

function MainCard({ ...props }: MainCardProps) {
    const sectionToDisplay = () => {
        switch (props.section) {
            case Sections.FOREST:
                return <Forest />;
            case Sections.VILLAGE:
                return <Village />;
            case Sections.CRAFT:
                return <Craft />;
            case Sections.MINE:
                return <Mine />;
            default:
                return <></>;
        }
    };

    return (
        <div className='flex flex-auto m-2'>
            <Card className='flex flex-auto'>{sectionToDisplay()}</Card>
        </div>
    );
}

export default MainCard;
