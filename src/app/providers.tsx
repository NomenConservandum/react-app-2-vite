'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { StoreContext, rootStore } from '@/shared/lib/mobxStore';
import { lightTheme } from '@/shared/lib/theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <StoreContext.Provider value={rootStore}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StoreContext.Provider>
    </AppRouterCacheProvider>
  );
}