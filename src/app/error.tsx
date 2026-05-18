'use client';

import { useEffect } from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log('Application error:', error);
  }, [error]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
        <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Ошибка приложения
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Что-то пошло не так. Пожалуйста, попробуйте позже.
        </Typography>
        <Button variant="contained" onClick={reset}>
          Перезагрузить
        </Button>
      </Paper>
    </Container>
  );
}