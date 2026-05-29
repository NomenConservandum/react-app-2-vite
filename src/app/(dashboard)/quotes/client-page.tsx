'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Typography, Box, Grid, Divider, Button } from '@mui/material';
import { History, Refresh } from '@mui/icons-material';
import { useStore } from '@/shared/store';
import { QuoteCard } from '@/shared/ui/QuoteCard';
import { Loader } from '@/shared/ui/Loader';

const QuotesListClient = observer(() => {
  const { quotesStore, settingsStore } = useStore();
  const { allQuotes, hasMore, currentOffset, loading: isLoading } = quotesStore.state;

  useEffect(() => {
    if (allQuotes.length === 0 && !isLoading) {
      quotesStore.async.fetchQuotesList(0, 10);
    }
  }, [quotesStore, allQuotes.length, isLoading]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      quotesStore.async.fetchQuotesList(currentOffset + 10, 10);
    }
  };

  const handleRefresh = () => {
    quotesStore.async.fetchQuotesList(0, 10);
  };

  if (isLoading && allQuotes.length === 0) {
    return <Loader fullScreen />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Divider sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.disabled' }}>
          <History fontSize="large" />
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            ЛЕНТА ЦИТАТ
          </Typography>
        </Box>
      </Divider>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          startIcon={<Refresh />}
          onClick={handleRefresh}
          disabled={isLoading}
          size="small"
        >
          Обновить
        </Button>
      </Box>

      {allQuotes.length === 0 && !isLoading ? (
        <Typography align="center" sx={{ py: 8, color: 'text.secondary' }}>
          Пока нет ни одной цитаты. Будьте первым!
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {allQuotes.map((quote, index) => (
              <Grid size={12} key={`${quote.creationDate}-${index}`}>
                <QuoteCard quote={quote} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            {hasMore ? (
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                variant="text"
              >
                {isLoading ? 'Загрузка...' : 'Загрузить еще'}
              </Button>
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Вы просмотрели все цитаты
              </Typography>
            )}
          </Box>
        </>
      )}
    </Container>
  );
});

export default QuotesListClient;