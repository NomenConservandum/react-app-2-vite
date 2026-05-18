'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';
import type { QuoteResponse } from '@/entities/Quote/model/types';

interface QuoteCardProps {
  quote: QuoteResponse;
  showAuthor?: boolean;
  variant?: 'default' | 'compact';
}

export const QuoteCard = ({ quote, showAuthor = true, variant = 'default' }: QuoteCardProps) => {
  const isCompact = variant === 'compact';
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        borderRadius: 3,
        ...(isCompact && { boxShadow: 'none' })
      }}
    >
      <CardContent>
        <Typography 
          variant={isCompact ? 'body2' : 'body1'} 
          sx={{ mb: 1 }}
        >
          «{quote.quoteText}»
        </Typography>
        
        {showAuthor && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="primary">
              @{quote.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {quote.creationDate}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};