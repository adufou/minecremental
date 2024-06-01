import { Button } from '@/components/ui/button.tsx';
import { useMemo } from 'react';

interface ProgressButtonProps {
    children: React.ReactNode;
    progress: number;
    onClick?: () => void;
}

function ProgressButton({ children, ...props }: ProgressButtonProps) {
    const backgroundStyle = useMemo(() => {
        return {
            width: `${props.progress}%`,
        };
    }, [props.progress]);

    return (
        <div className='w-full relative'>
            <div
                className='h-full rounded-md bg-lime-700 absolute'
                style={backgroundStyle}
            />
            <div className='w-full rounded-md p-1 relative'>
                <Button
                    className='w-full'
                    variant='ghost'
                    onClick={props.onClick}
                >
                    {children}
                </Button>
            </div>
        </div>
    );
}

export default ProgressButton;
