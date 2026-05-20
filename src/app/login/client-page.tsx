'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Box,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useStore } from '@/shared/store';
import { CustomButton } from '@/shared/ui';
import { ROUTES } from '@/shared/config/routes';

const LoginForm = observer(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userStore, settingsStore } = useStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  
  const from = searchParams.get('from') || ROUTES.PROFILE;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    
    if (!email || !password) {
      setLocalError('Пожалуйста, заполните все поля');
      return;
    }
    
    try {
      await userStore.login({ email, password });
      router.push(from);
    } catch (err: any) {
      setLocalError(err.response?.data?.message || 'Неверный email или пароль');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <LoginIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Вход
          </Typography>
        </Box>
        
        {localError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {localError}
          </Alert>
        )}
        
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Электронная почта"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={settingsStore.isLoading}
            required
          />
          
          <TextField
            fullWidth
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={settingsStore.isLoading}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          
          <CustomButton
            type="submit"
            fullWidth
            size="large"
            disabled={settingsStore.isLoading}
            tooltipText="Войти в аккаунт"
            sx={{ mt: 3, mb: 2 }}
          >
            {settingsStore.isLoading ? 'Входим...' : 'Войти'}
          </CustomButton>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Нет аккаунта?{' '}
              <Link href={ROUTES.REGISTER} style={{ textDecoration: 'none', color: '#1976d2' }}>
                Зарегистрироваться
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
});

export default function LoginPage() {
  return (
    <Suspense fallback={
      <Container maxWidth="xs" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography>Загрузка...</Typography>
        </Paper>
      </Container>
    }>
      <LoginForm />
    </Suspense>
  );
}