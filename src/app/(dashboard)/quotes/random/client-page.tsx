'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Paper, Typography, Fade, Box, Button } from '@mui/material';
import { FormatQuote, Casino } from '@mui/icons-material';
import { useStore } from '@/shared/store';
import { Loader } from '@/shared/ui/Loader';

const RandomQuoteClient = observer(() => {
  const { quotesStore } = useStore();
  const { currentQuote, loading: isLoading } = quotesStore.state;

  useEffect(() => {
    if (!currentQuote && !isLoading) {
      quotesStore.async.fetchRandomQuote();
    }
  }, [quotesStore, currentQuote, isLoading]);

  const handleNewQuote = () => {
    quotesStore.async.fetchRandomQuote();
  };

  if (isLoading && !currentQuote) {
    return <Loader fullScreen />;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Fade in timeout={800}>
        <Paper elevation={6} sx={{ p: 6, borderRadius: 5, textAlign: 'center', position: 'relative' }}>
          <FormatQuote sx={{ position: 'absolute', top: 20, left: 20, fontSize: '5rem', opacity: 0.05 }} />
          
          <Typography variant="h4" sx={{ fontStyle: 'italic', mb: 4, minHeight: 120 }}>
            {currentQuote ? `«${currentQuote.quoteText}»` : 'Загрузка...'}
          </Typography>
          
          <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 4 }}>
            — {currentQuote?.username || 'Аноним'}
          </Typography>
          
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mb: 4 }}>
            {currentQuote?.creationDate || ''}
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<Casino />}
            onClick={handleNewQuote}
            disabled={isLoading}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            {isLoading ? 'Загрузка...' : 'Другая цитата'}
          </Button>
        </Paper>
      </Fade>
    </Container>
  );
});

export default RandomQuoteClient;