'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { StoreContext, rootStore } from '@/shared/lib/mobxStore';
import { lightTheme, darkTheme } from '@/shared/lib/theme';
import { CommonWrapper } from '@/widgets/CommonWrapper';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

export const Providers = observer(({ children }: { children: React.ReactNode }) => {
  const { themeStore } = rootStore;
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const theme = themeStore.mode === 'light' ? lightTheme : darkTheme;
  
  // На сервере используем светлую тему для предотвращения hydration ошибки
  if (!mounted) {
    return (
      <AppRouterCacheProvider options={{ key: 'css' }}>
        <StoreContext.Provider value={rootStore}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <CommonWrapper>
              {children}
            </CommonWrapper>
          </ThemeProvider>
        </StoreContext.Provider>
      </AppRouterCacheProvider>
    );
  }

  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <StoreContext.Provider value={rootStore}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CommonWrapper>
            {children}
          </CommonWrapper>
        </ThemeProvider>
      </StoreContext.Provider>
    </AppRouterCacheProvider>
  );
});