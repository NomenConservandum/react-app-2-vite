'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import { useStore } from '@/shared/store';
import { CustomButton } from '@/shared/ui';
import { ROUTES } from '@/shared/config/routes';

const RegisterForm = observer(() => {
  const router = useRouter();
  const { userStore, settingsStore } = useStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    
    if (!formData.firstName || !formData.secondName || !formData.email || !formData.password) {
      setLocalError('Пожалуйста, заполните все поля');
      return;
    }
    
    if (formData.password.length < 6) {
      setLocalError('Пароль должен содержать минимум 6 символов');
      return;
    }
    
    try {
      await userStore.register(formData);
      router.push(`${ROUTES.LOGIN}?registered=true`);
    } catch (err: any) {
      setLocalError(err.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <PersonAdd color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Регистрация
          </Typography>
        </Box>
        
        {localError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {localError}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Имя"
            name="firstName"
            variant="outlined"
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
            disabled={settingsStore.isLoading}
            required
          />
          
          <TextField
            fullWidth
            label="Фамилия"
            name="secondName"
            variant="outlined"
            margin="normal"
            value={formData.secondName}
            onChange={handleChange}
            disabled={settingsStore.isLoading}
            required
          />
          
          <TextField
            fullWidth
            label="Электронная почта"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            disabled={settingsStore.isLoading}
            required
          />
          
          <TextField
            fullWidth
            label="Пароль"
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            disabled={settingsStore.isLoading}
            required
            helperText="Минимум 6 символов"
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
            tooltipText="Создать новый аккаунт"
            sx={{ mt: 3, mb: 2 }}
          >
            {settingsStore.isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </CustomButton>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Уже есть аккаунт?{' '}
              <Link href={ROUTES.LOGIN} style={{ textDecoration: 'none', color: '#1976d2' }}>
                Войти
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
});

export default function RegisterPage() {
  return <RegisterForm />;
}