'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Snackbar, Alert, Backdrop, CircularProgress, Box } from '@mui/material';
import { useStore } from '@/shared/lib/mobxStore';

interface CommonWrapperProps {
  children: React.ReactNode;
}

export const CommonWrapper = observer(({ children }: CommonWrapperProps) => {
  const { settingsStore } = useStore();
  const { isLoading, error } = settingsStore;

  const handleCloseError = () => {
    settingsStore.setError(null);
  };

  return (
    <>
      {children}
      
      {/* Глобальный лоадер */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
      
      {/* Глобальный снекбар для ошибок */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
});