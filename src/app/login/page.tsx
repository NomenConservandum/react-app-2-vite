'use client';

import { useStore } from '@/shared/lib/mobxStore';
import { observer } from 'mobx-react-lite';
import { Button, Container, Typography, Box } from '@mui/material';

export default observer(function LoginPage() {
  const { authStore } = useStore();

  const handleTestLogin = async () => {
    // Временный тестовый логин (замените на реальные данные позже)
    console.log('Login clicked');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Вход
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Страница входа (будет реализована позже)
        </Typography>
        <Button variant="contained" onClick={handleTestLogin}>
          Войти (тест)
        </Button>
      </Box>
    </Container>
  );
});