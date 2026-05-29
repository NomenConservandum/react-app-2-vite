import { makeAutoObservable } from 'mobx';
import type { QuoteResponse } from '@/entities/Quote/model/types';

export class QuotesStateStore {
  currentQuote: QuoteResponse | null = null;
  allQuotes: QuoteResponse[] = [];
  currentOffset: number = 0;
  hasMore: boolean = true;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get quotesCount(): number {
    return this.allQuotes.length;
  }

  get hasQuotes(): boolean {
    return this.allQuotes.length > 0;
  }
}