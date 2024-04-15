import { ThemeToggle } from '@/components/theme-toggle.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import Devtools from '@/modules/DevTools/devtools.tsx';

function StatusBar() {
    return (
        <div className='flex flex-row justify-between w-full p-2'>
            <div>
                <ThemeToggle />
            </div>
            <div className='flex flex-row'>
                <Separator orientation='vertical' />
                <Devtools />
            </div>
        </div>
    );
}

export default StatusBar;
