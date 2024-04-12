import Sidebar from "@/modules/MainLayout/components/sidebar.tsx";
import MainCard from "@/modules/MainLayout/components/main-card.tsx";
import StatusBar from "@/modules/MainLayout/components/status-bar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import Inventory from "@/modules/inventory/inventory.tsx";

function MainLayout() {
    return(
        <div className="flex flex-col h-full w-full">
            <StatusBar />

            <Separator />

            <div className="flex flex-row flex-auto">
                <Sidebar />
                <Separator orientation="vertical" className="h-full"/>
                <MainCard />
                <Inventory />
            </div>
        </div>
    )
}

export default MainLayout