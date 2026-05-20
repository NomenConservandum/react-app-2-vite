import { QuotesState } from './quotesState';
import type { QuoteResponse } from '@/entities/Quote/model/types';

export class QuotesSync {
  constructor(private state: QuotesState) {}

  setCurrentQuote = (quote: QuoteResponse | null) => {
    this.state.currentQuote = quote;
  };

  setAllQuotes = (quotes: QuoteResponse[]) => {
    this.state.allQuotes = quotes;
  };

  addQuotes = (quotes: QuoteResponse[]) => {
    this.state.allQuotes = [...this.state.allQuotes, ...quotes];
    if (quotes.length === 0) {
      this.state.hasMore = false;
    }
  };

  resetQuotes = () => {
    this.state.allQuotes = [];
    this.state.currentOffset = 0;
    this.state.hasMore = true;
  };

  setCurrentOffset = (offset: number) => {
    this.state.currentOffset = offset;
  };

  setHasMore = (hasMore: boolean) => {
    this.state.hasMore = hasMore;
  };

  setLoading = (isLoading: boolean) => {
    this.state.isLoading = isLoading;
  };

  setError = (error: string | null) => {
    this.state.error = error;
  };
}