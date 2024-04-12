import {ThemeToggle} from "@/components/theme-toggle.tsx";

function StatusBar() {
    return(
        <div className="flex flex-row w-full p-2">
            <ThemeToggle/>
        </div>
    )
}

export default StatusBar