import {Button} from "@/components/ui/button.tsx";

interface ProgressButtonProps {
    children: React.ReactNode
    progress: number
    onClick: () => void
}

function ProgressButton ({
    children,
    ...props
}: ProgressButtonProps) {
    return (
        <div className='w-full rounded-md p-1 bg-lime-900'>
            <Button className="w-full" variant='ghost' onClick={props.onClick}>
                {children}
            </Button>
        </div>)
}

export default ProgressButton