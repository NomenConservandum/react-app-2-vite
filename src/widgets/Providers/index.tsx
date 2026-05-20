'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { StoreContext, rootStore, useStore } from '@/shared/store';
import { lightTheme, darkTheme } from '@/shared/lib/theme';
import { CommonWrapper } from '@/widgets/CommonWrapper';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

// Внутренний компонент для доступа к store
const ThemeWrapper = observer(({ children }: { children: React.ReactNode }) => {
  const { settingsStore } = useStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // На сервере используем светлую тему
  const theme = !mounted ? lightTheme : (settingsStore.isDarkTheme ? darkTheme : lightTheme);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <StoreContext.Provider value={rootStore}>
        <ThemeWrapper>
          <CommonWrapper>
            {children}
          </CommonWrapper>
        </ThemeWrapper>
      </StoreContext.Provider>
    </AppRouterCacheProvider>
  );
};