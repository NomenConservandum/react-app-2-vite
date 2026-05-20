'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/shared/lib/mobxStore';
import { ROUTES } from '@/shared/config/routes';
import { observer } from 'mobx-react-lite';

const HomePage = observer(() => {
  const router = useRouter();
  const { authStore } = useStore();
  
  useEffect(() => {
    if (!authStore.isInitialized) return;
    
    if (authStore.isAuth) {
      router.replace(ROUTES.PROFILE);
    } else {
      router.replace(ROUTES.LANDING);
    }
  }, [authStore.isAuth, authStore.isInitialized, router]);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div>Загрузка...</div>
    </div>
  );
});

export default HomePage;