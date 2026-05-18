'use client';

import { useStore } from '@/shared/lib/mobxStore';
import { observer } from 'mobx-react-lite';
import { Button, Container, Typography, Box } from '@mui/material';

export default observer(function HomePage() {
  const { authStore, quotesStore, settingsStore } = useStore();

  const handleTestLogin = () => {
    console.log('Store работает:', { authStore, quotesStore, settingsStore });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Шаг 2 завершен!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          MobX store'ы созданы и готовы к использованию.
        </Typography>
        <Button variant="contained" onClick={handleTestLogin}>
          Проверить store
        </Button>
      </Box>
    </Container>
  );
});