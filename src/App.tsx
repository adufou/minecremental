import './App.css';
import { EngineProvider } from '@/components/providers/engine-provider.tsx';
import { ThemeProvider } from '@/components/providers/theme-provider.tsx';
import { TickProvider } from '@/components/providers/tick-provider.tsx';
import MainLayout from '@/modules/MainLayout/main-layout.tsx';

function App() {
    return (
        <ThemeProvider
            defaultTheme='dark'
            storageKey='vite-ui-theme'
        >
            <TickProvider>
                <EngineProvider>
                    <MainLayout />
                </EngineProvider>
            </TickProvider>
        </ThemeProvider>
    );
}

export default App;
