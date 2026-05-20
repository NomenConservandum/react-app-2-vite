import { QuotesState } from './models/quotesState';
import { QuotesSync } from './models/quotesSync';
import { QuotesAsync } from './models/quotesAsync';
import type { RootStore } from '../index';

export class QuotesStore {
  state: QuotesState;
  sync: QuotesSync;
  async: QuotesAsync;

  constructor(rootStore: RootStore) {
    this.state = new QuotesState();
    this.sync = new QuotesSync(this.state);
    this.async = new QuotesAsync(this.state, this.sync, rootStore);
    
    this.fetchRandomQuote = this.fetchRandomQuote.bind(this);
    this.fetchQuotesList = this.fetchQuotesList.bind(this);
    this.createQuote = this.createQuote.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.resetQuotes = this.resetQuotes.bind(this);
  }

  // Прокси для удобства использования
  get currentQuote() { return this.state.currentQuote; }
  get allQuotes() { return this.state.allQuotes; }
  get currentOffset() { return this.state.currentOffset; }
  get hasMore() { return this.state.hasMore; }
  get isLoading() { return this.state.isLoading; }
  get error() { return this.state.error; }
  get quotesCount() { return this.state.quotesCount; }
  get hasQuotes() { return this.state.hasQuotes; }

  // Прокси для методов (вызываем через async)
  fetchRandomQuote() {
    return this.async.fetchRandomQuote();
  }

  fetchQuotesList(offset: number = 0, limit: number = 10) {
    return this.async.fetchQuotesList(offset, limit);
  }

  createQuote(text: string) {
    return this.async.createQuote(text);
  }

  loadMore() {
    return this.async.loadMore();
  }

  resetQuotes() {
    return this.sync.resetQuotes();
  }
}