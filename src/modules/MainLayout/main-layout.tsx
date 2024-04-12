import Sidebar from "@/modules/MainLayout/components/sidebar.tsx";
import MainCard from "@/modules/MainLayout/components/main-card.tsx";
import StatusBar from "@/modules/MainLayout/components/status-bar.tsx";
import {Separator} from "@/components/ui/separator.tsx";

function MainLayout() {
    return(
        <div className="flex flex-col h-full w-full p-2">
            <StatusBar />

            <Separator />

            <div className="flex flex-row flex-auto">
                <Sidebar />
                <Separator orientation="vertical" />
                <MainCard />
            </div>
        </div>
    )
}

export default MainLayout