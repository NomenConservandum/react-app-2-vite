'use client';

import { useRouter } from 'next/navigation';
import { Button, Container, Typography, Paper } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

export default function GlobalNotFound() {
  const router = useRouter();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
        <Typography variant="h1" sx={{ fontSize: 80, fontWeight: 'bold', color: 'text.secondary' }}>
          404
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
          Страница не найдена
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Запрашиваемая страница не существует
        </Typography>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => router.push('/')}
        >
          Вернуться на главную
        </Button>
      </Paper>
    </Container>
  );
}