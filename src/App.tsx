import './App.css'
import {ThemeProvider} from "@/components/providers/theme-provider.tsx";
import MainLayout from "@/modules/MainLayout/main-layout.tsx";
import {TickProvider} from "@/components/providers/tick-provider.tsx";

function App() {
  return (
    <TickProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <MainLayout />
        </ThemeProvider>
    </TickProvider>
  )
}

export default App
