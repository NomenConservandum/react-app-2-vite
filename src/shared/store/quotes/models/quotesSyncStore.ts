import { makeAutoObservable } from 'mobx';
import type { QuotesStateStore } from './quotesStateStore';
import type { QuoteResponse } from '@/entities/Quote/model/types';

export class QuotesSyncStore {
  constructor(private state: QuotesStateStore) {
    makeAutoObservable(this);
  }

  setCurrentQuote(quote: QuoteResponse | null) {
    this.state.currentQuote = quote;
  }

  setAllQuotes(quotes: QuoteResponse[]) {
    this.state.allQuotes = quotes;
  }

  addQuotes(quotes: QuoteResponse[]) {
    this.state.allQuotes = [...this.state.allQuotes, ...quotes];
    if (quotes.length === 0) this.state.hasMore = false;
  }

  resetQuotes() {
    this.state.allQuotes = [];
    this.state.currentOffset = 0;
    this.state.hasMore = true;
  }

  setCurrentOffset(offset: number) {
    this.state.currentOffset = offset;
  }

  setHasMore(hasMore: boolean) {
    this.state.hasMore = hasMore;
  }

  setLoading(loading: boolean) {
    this.state.loading = loading;
  }

  setError(error: string | null) {
    this.state.error = error;
  }
}