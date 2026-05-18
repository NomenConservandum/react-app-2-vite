'use client';

import Link from 'next/link';
import { Box, Container, Typography, Button } from '@mui/material';
import { ROUTES } from '@/shared/config/routes';

export default function LandingPage() {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'grey.100',
          py: { xs: 8, md: 12 },
          transition: 'background-color 0.3s ease',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.75rem' }, mb: 2 }}
          >
            Банк Цитат
          </Typography>
          
          <Typography
            variant="h5"
            align="center"
            sx={{ color: 'text.secondary', mb: 6 }}
          >
            Платформа для обмена цитатами. Делитесь мыслями и вдохновляйтесь идеями других.
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              component={Link}
              href={ROUTES.REGISTER}
              variant="contained"
              size="large"
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Начать обмен цитатами
            </Button>
            <Button
              component={Link}
              href={ROUTES.LOGIN}
              variant="outlined"
              size="large"
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              У меня есть профиль
            </Button>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          Почему выбирают нас?
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mt: 4,
          }}
        >
          <Box sx={{ textAlign: 'center', p: 3, flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              💡
            </Typography>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              Вдохновение
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Ежедневные цитаты для мотивации и развития
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', p: 3, flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              🤝
            </Typography>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              Сообщество
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Делитесь своими мыслями с единомышленниками
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', p: 3, flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              📚
            </Typography>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              Библиотека
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Тысячи цитат в вашем распоряжении
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}