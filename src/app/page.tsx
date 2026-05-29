'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/shared/store';
import { ROUTES } from '@/shared/config/routes';
import { observer } from 'mobx-react-lite';

const HomePage = observer(() => {
  const router = useRouter();
  const { userStore } = useStore();
  
  useEffect(() => {
    if (!userStore.state.isInitialized) return;
    
    if (userStore.state.isAuth) {
      router.replace(ROUTES.PROFILE);
    } else {
      router.replace(ROUTES.LANDING);
    }
  }, [userStore.state.isAuth, userStore.state.isInitialized, router]);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div>Загрузка...</div>
    </div>
  );
});

export default HomePage;