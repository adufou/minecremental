import './App.css'
import {ThemeProvider} from "@/components/providers/theme-provider.tsx";
import MainLayout from "@/modules/MainLayout/main-layout.tsx";

function App() {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <MainLayout />
      </ThemeProvider>
  )
}

export default App
