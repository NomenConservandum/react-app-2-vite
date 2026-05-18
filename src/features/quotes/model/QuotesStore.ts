import { makeAutoObservable, runInAction } from 'mobx';
import type { RootStore } from '@/shared/lib/mobxStore';
import type { QuoteResponse, CreateQuoteRequest } from '@/entities/Quote/model/types';
import { quotesApi } from '@/entities/Quote/api/quotesApi';

export class QuotesStore {
  currentQuote: QuoteResponse | null = null;
  allQuotes: QuoteResponse[] = [];
  currentOffset: number = 0;
  hasMore: boolean = true;
  
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  // Computed (можно добавить при необходимости)
  get quotesCount() {
    return this.allQuotes.length;
  }

  // Actions
  setCurrentQuote = (quote: QuoteResponse | null) => {
    this.currentQuote = quote;
  };

  addQuotes = (quotes: QuoteResponse[]) => {
    this.allQuotes = [...this.allQuotes, ...quotes];
    if (quotes.length === 0) {
      this.hasMore = false;
    }
  };

  resetQuotes = () => {
    this.allQuotes = [];
    this.currentOffset = 0;
    this.hasMore = true;
  };

  // Async actions
  fetchRandomQuote = async () => {
    try {
      this.rootStore.settingsStore.setLoading(true);
      const quote = await quotesApi.getRandom();
      runInAction(() => {
        this.currentQuote = quote;
      });
    } catch (error: any) {
      this.rootStore.settingsStore.setError(error.message || 'Ошибка загрузки цитаты');
      throw error;
    } finally {
      this.rootStore.settingsStore.setLoading(false);
    }
  };

  fetchQuotesList = async (offset: number = 0, limit: number = 10) => {
    try {
      this.rootStore.settingsStore.setLoading(true);
      const quotes = await quotesApi.getList(offset, limit);
      runInAction(() => {
        if (offset === 0) {
          this.allQuotes = quotes;
        } else {
          this.allQuotes = [...this.allQuotes, ...quotes];
        }
        this.currentOffset = offset;
        this.hasMore = quotes.length === limit;
      });
    } catch (error: any) {
      this.rootStore.settingsStore.setError(error.message || 'Ошибка загрузки списка цитат');
      throw error;
    } finally {
      this.rootStore.settingsStore.setLoading(false);
    }
  };

  createQuote = async (text: string) => {
    try {
      this.rootStore.settingsStore.setLoading(true);
      await quotesApi.create({ quoteText: text });
      // После создания обновляем списки
      await this.fetchRandomQuote();
      await this.fetchQuotesList(0, 10);
    } catch (error: any) {
      const message = error.response?.data?.errors?.quoteText?.[0] || 'Ошибка публикации';
      this.rootStore.settingsStore.setError(message);
      throw error;
    } finally {
      this.rootStore.settingsStore.setLoading(false);
    }
  };

  loadMore = () => {
    if (this.hasMore && !this.rootStore.settingsStore.isLoading) {
      this.fetchQuotesList(this.currentOffset + 10, 10);
    }
  };
}