import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';
import { ROUTES } from '@/shared/config/routes';

export const metadata: Metadata = {
  title: 'Банк Цитат - делитесь вдохновением',
  description: 'Платформа для обмена цитатами. Делитесь мыслями и вдохновляйтесь идеями других людей.',
  openGraph: {
    title: 'Банк Цитат',
    description: 'Присоединяйтесь к сообществу Quote App',
    images: ['/og-image.png'],
  },
};

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.75rem' } }}
          >
            Банк Цитат
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Платформа для обмена цитатами. Делитесь мыслями и вдохновляйтесь идеями других.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href={ROUTES.REGISTER}
              variant="contained"
              size="large"
              sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
            >
              Начать обмен цитатами
            </Button>
            <Button
              component={Link}
              href={ROUTES.LOGIN}
              variant="outlined"
              size="large"
              sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              У меня есть профиль
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          Почему выбирают нас?
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', p: 3, maxWidth: 280 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>💡</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Вдохновение</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Ежедневные цитаты для мотивации и развития
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', p: 3, maxWidth: 280 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>🤝</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Сообщество</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Делитесь своими мыслями с единомышленниками
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', p: 3, maxWidth: 280 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>📚</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Библиотека</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Тысячи цитат в вашем распоряжении
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}