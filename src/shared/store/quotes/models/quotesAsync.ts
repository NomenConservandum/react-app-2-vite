import { runInAction } from 'mobx';
import { QuotesState } from './quotesState';
import { QuotesSync } from './quotesSync';
import { quotesApi } from '@/entities/Quote/api/quotesApi';
import type { RootStore } from '../../index';

export class QuotesAsync {
  constructor(
    private state: QuotesState,
    private sync: QuotesSync,
    private rootStore: RootStore
  ) {}

  fetchRandomQuote = async () => {
    try {
      this.sync.setLoading(true);
      const quote = await quotesApi.getRandom();
      runInAction(() => {
        this.state.currentQuote = quote;
      });
    } catch (error: any) {
      this.sync.setError(error.message || 'Ошибка загрузки цитаты');
      throw error;
    } finally {
      this.sync.setLoading(false);
    }
  };

  fetchQuotesList = async (offset: number = 0, limit: number = 10) => {
    try {
      this.sync.setLoading(true);
      const quotes = await quotesApi.getList(offset, limit);
      
      runInAction(() => {
        if (offset === 0) {
          this.state.allQuotes = quotes;
        } else {
          this.state.allQuotes = [...this.state.allQuotes, ...quotes];
        }
        this.state.currentOffset = offset;
        this.state.hasMore = quotes.length === limit;
      });
    } catch (error: any) {
      this.sync.setError(error.message || 'Ошибка загрузки списка цитат');
      throw error;
    } finally {
      this.sync.setLoading(false);
    }
  };

  createQuote = async (text: string) => {
    try {
      this.sync.setLoading(true);
      await quotesApi.create({ quoteText: text });
      // После создания обновляем списки
      await this.fetchRandomQuote();
      await this.fetchQuotesList(0, 10);
    } catch (error: any) {
      const message = error.response?.data?.errors?.quoteText?.[0] || 'Ошибка публикации';
      this.sync.setError(message);
      throw error;
    } finally {
      this.sync.setLoading(false);
    }
  };

  loadMore = () => {
    if (this.state.hasMore && !this.state.isLoading) {
      this.fetchQuotesList(this.state.currentOffset + 10, 10);
    }
  };
}