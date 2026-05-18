'use client';

import { useStore } from '@/shared/lib/mobxStore';
import { observer } from 'mobx-react-lite';
import { Container, Typography, Box, Button } from '@mui/material';

export default observer(function ProfilePage() {
  const { authStore } = useStore();

  const handleLogout = () => {
    authStore.logout();
    window.location.href = '/landing';
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Личный кабинет
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Добро пожаловать, {authStore.user?.firstName || 'Пользователь'}!
        </Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Выйти
        </Button>
      </Box>
    </Container>
  );
});