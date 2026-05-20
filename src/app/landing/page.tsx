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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }} suppressHydrationWarning>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          borderBottom: 1,
          borderColor: 'divider',
        }}
        suppressHydrationWarning
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }} suppressHydrationWarning>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.75rem' } }}
            suppressHydrationWarning
          >
            Банк Цитат
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }} suppressHydrationWarning>
            Платформа для обмена цитатами. Делитесь мыслями и вдохновляйтесь идеями других.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }} suppressHydrationWarning>
            <Link href={ROUTES.REGISTER} style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
                suppressHydrationWarning
              >
                Начать обмен цитатами
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN} style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' } }}
                suppressHydrationWarning
              >
                У меня есть профиль
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }} suppressHydrationWarning>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }} suppressHydrationWarning>
          Почему выбирают нас?
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }} suppressHydrationWarning>
          {[
            { emoji: '💡', title: 'Вдохновение', desc: 'Ежедневные цитаты для мотивации и развития' },
            { emoji: '🤝', title: 'Сообщество', desc: 'Делитесь своими мыслями с единомышленниками' },
            { emoji: '📚', title: 'Библиотека', desc: 'Тысячи цитат в вашем распоряжении' },
          ].map((item) => (
            <Box key={item.title} sx={{ textAlign: 'center', p: 3, maxWidth: 280 }} suppressHydrationWarning>
              <Typography variant="h5" sx={{ mb: 2 }} suppressHydrationWarning>{item.emoji}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }} suppressHydrationWarning>{item.title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} suppressHydrationWarning>
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}