import type { QuotesStateStore } from './quotesStateStore';
import type { QuotesSyncStore } from './quotesSyncStore';
import { quotesApi } from '@/entities/Quote/api/quotesApi';

export class QuotesAsyncStore {
  constructor(
    private state: QuotesStateStore,
    private sync: QuotesSyncStore
  ) {}

  async fetchRandomQuote() {
    this.sync.setLoading(true);
    try {
      const quote = await quotesApi.getRandom();
      this.sync.setCurrentQuote(quote);
    } catch (error: any) {
      this.sync.setError(error.message || 'Ошибка загрузки цитаты');
    } finally {
      this.sync.setLoading(false);
    }
  }

  async fetchQuotesList(offset: number = 0, limit: number = 10) {
    this.sync.setLoading(true);
    try {
      const quotes = await quotesApi.getList(offset, limit);
      if (offset === 0) {
        this.sync.setAllQuotes(quotes);
      } else {
        this.sync.addQuotes(quotes);
      }
      this.sync.setCurrentOffset(offset);
      this.sync.setHasMore(quotes.length === limit);
    } catch (error: any) {
      this.sync.setError(error.message || 'Ошибка загрузки списка цитат');
    } finally {
      this.sync.setLoading(false);
    }
  }

  async createQuote(text: string) {
    this.sync.setLoading(true);
    try {
      await quotesApi.create({ quoteText: text });
      await this.fetchRandomQuote();
      await this.fetchQuotesList(0, 10);
    } catch (error: any) {
      const message = error.response?.data?.errors?.quoteText?.[0] || 'Ошибка публикации';
      this.sync.setError(message);
    } finally {
      this.sync.setLoading(false);
    }
  }

  loadMore() {
    if (this.state.hasMore && !this.state.loading) {
      this.fetchQuotesList(this.state.currentOffset + 10, 10);
    }
  }
}