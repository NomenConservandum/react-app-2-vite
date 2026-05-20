'use client';

import { ThemeProvider } from '@mui/material/styles';
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
  
  const theme = !mounted ? lightTheme : (themeStore.mode === 'light' ? lightTheme : darkTheme);
  
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <StoreContext.Provider value={rootStore}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <CommonWrapper>
            {children}
          </CommonWrapper>
        </ThemeProvider>
      </StoreContext.Provider>
    </AppRouterCacheProvider>
  );
});