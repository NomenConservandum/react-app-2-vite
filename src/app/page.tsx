'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { Box, CircularProgress } from '@mui/material';
import { useStore } from '@/shared/lib/mobxStore';
import { ROUTES } from '@/shared/config/routes';

const HomePage = observer(() => {
  const router = useRouter();
  const { authStore } = useStore();
  
  useEffect(() => {
    // Ждем инициализации authStore
    if (!authStore.isInitialized) return;
    
    // Определяем локаль (по умолчанию 'ru')
    const locale = 'ru';
    
    // Проверяем авторизацию
    if (authStore.isAuth) {
      // Если авторизован - на профиль
      router.replace(ROUTES.PROFILE);
    } else {
      // Если не авторизован - на лендинг
      router.replace(ROUTES.LANDING);
    }
  }, [authStore.isAuth, authStore.isInitialized, router]);
  
  // Показываем индикатор загрузки пока идет проверка
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      bgcolor: 'background.default'
    }}>
      <CircularProgress />
    </Box>
  );
});

export default HomePage;