'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { Container, Paper, Typography, TextField, Box, Alert } from '@mui/material';
import { AddComment } from '@mui/icons-material';
import { useStore } from '@/shared/store';
import { CustomButton } from '@/shared/ui';
import { ROUTES } from '@/shared/config/routes';

const CreateQuoteClient = observer(() => {
  const router = useRouter();
  const { quotesStore } = useStore();
  const [newQuoteText, setNewQuoteText] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const { loading: isLoading } = quotesStore.state;

  const handlePublish = async () => {
    if (!newQuoteText.trim()) {
      setLocalError('Введите текст цитаты');
      return;
    }
    
    if (newQuoteText.length > 500) {
      setLocalError('Цитата не должна превышать 500 символов');
      return;
    }
    
    setLocalError(null);
    
    try {
      await quotesStore.async.createQuote(newQuoteText);
      router.push(ROUTES.QUOTES);
    } catch (err: any) {
      setLocalError(err.message || 'Ошибка публикации');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 4, bgcolor: 'action.hover' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
          <AddComment color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Поделиться своей цитатой
          </Typography>
        </Box>
        
        {localError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {localError}
          </Alert>
        )}
        
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Что у вас на уме? Поделитесь мудрой мыслью..."
          value={newQuoteText}
          onChange={(e) => setNewQuoteText(e.target.value)}
          disabled={isLoading}
          sx={{ mb: 3 }}
          helperText={`${newQuoteText.length}/500 символов`}
          error={newQuoteText.length > 500}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <CustomButton
            variant="outlined"
            onClick={() => router.back()}
            disabled={isLoading}
            tooltipText="Отменить публикацию"
          >
            Отмена
          </CustomButton>
          <CustomButton
            onClick={handlePublish}
            disabled={isLoading || !newQuoteText.trim() || newQuoteText.length > 500}
            tooltipText="Опубликовать цитату"
          >
            {isLoading ? 'Публикация...' : 'Опубликовать'}
          </CustomButton>
        </Box>
      </Paper>
    </Container>
  );
});

export default CreateQuoteClient;