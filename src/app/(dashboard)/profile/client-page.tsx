'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Skeleton,
} from '@mui/material';
import { MenuBook, AutoFixHigh, AddCircle, Logout } from '@mui/icons-material';
import { useStore } from '@/shared/store';
import { CustomButton } from '@/shared/ui';
import { ROUTES } from '@/shared/config/routes';

const ProfilePageClient = observer(() => {
  const router = useRouter();
  const { userStore, settingsStore } = useStore();

  const profile = userStore.state.user;
  const isLoading = !userStore.state.isInitialized || settingsStore.state.isLoading;

  const handleLogout = () => {
    userStore.sync.logout();
    router.push(ROUTES.LANDING);
  };

  const menuItems = [
    {
      title: 'Лента цитат',
      description: 'Читать мысли других пользователей',
      path: ROUTES.QUOTES,
      icon: <MenuBook fontSize="large" color="primary" />,
      color: '#e3f2fd',
    },
    {
      title: 'Случайная мысль',
      description: 'Получить порцию вдохновения',
      path: ROUTES.QUOTES_RANDOM,
      icon: <AutoFixHigh fontSize="large" color="secondary" />,
      color: '#f3e5f5',
    },
    {
      title: 'Добавить свою',
      description: 'Поделиться своей мудростью',
      path: ROUTES.QUOTES_CREATE,
      icon: <AddCircle fontSize="large" sx={{ color: '#2e7d32' }} />,
      color: '#e8f5e9',
    },
  ];

  const fullName = profile
    ? `${profile.firstName || ''} ${profile.secondName || ''}`.trim()
    : 'Пользователь';
  const userEmail = profile?.email || 'email@example.com';
  const userId = profile?.id || '...';

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isLoading && !profile ? (
            <Skeleton variant="circular" width={100} height={100} sx={{ mb: 2 }} />
          ) : (
            <Avatar
              sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main', fontSize: '2.5rem' }}
            >
              {fullName.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          )}

          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {isLoading && !profile ? <Skeleton width={200} /> : fullName}
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            {isLoading && !profile ? <Skeleton width={150} /> : userEmail}
          </Typography>

          <CustomButton
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
            tooltipText="Выйти из аккаунта"
          >
            Выйти из системы
          </CustomButton>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Управление контентом
      </Typography>

      <Grid container spacing={3}>
        {menuItems.map((item, index) => (
          <Grid size={{ xs: 12, sm: 4 }} key={index}>
            <Card
              elevation={2}
              sx={{
                borderRadius: 4,
                transition: '0.3s',
                height: '100%',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
              }}
            >
              <CardActionArea onClick={() => router.push(item.path)} sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: item.color,
                      mb: 2,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Box sx={{ p: 3, bgcolor: 'action.hover', borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ID аккаунта: {userId}
        </Typography>
      </Box>
    </Container>
  );
});

export default ProfilePageClient;